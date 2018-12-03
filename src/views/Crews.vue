<template>
  <div id ="crews" class="crews">
    <VcAFrame>
      <VcAColumn>
        <VcABox :first="true" :title="$t('crews.list.title')">
          <div>
            <CrewList
              v-on:select-crew="selectedCrew"
            >
            </CrewList>
          </div>
        </VcaBox>
      </VcAColumn> 
      <VcAColumn>
        <VcABox :title="$t('crews.form.title')">
            <div><CrewForm :crewForm="selected"/></div>
          </VcaBox>  
      </VcAColumn>
      <VcAColumn>
        <VcABox :title="$t('crews.form.selected')">
        <div><CrewSelected/></div>
          </VcaBox>  
      </VcAColumn>

    </VcAFrame>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueNativeSock from 'vue-native-websocket'
  import CrewForm from '@/components/crews/CrewForm.vue'
  import CrewList from '@/components/crews/CrewList.vue'
  import CrewSelected from'@/components/crews/CrewEdit.vue'
  var host = window.location.hostname
  Vue.use(VueNativeSock, 'ws://' + host +'/drops/webapp/crew/ws', { 
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
    format: 'json',
  })

    //todo: 1. add crewfilter
  export default {
    name: "Crews",
    components: {
      CrewForm,
      CrewList,
      CrewSelected,
    },
    data() {
      return {
        selected: {
          name: '',
          Cities: [ 
            {
              name: '',
              country: ''
            }
          ]
        },
        crews: []
      }
    },

    //created: function () {
    //   this.init()
    //},
    beforeDestroy: function () {
      this.crews = null
    },
    mounted() {
      this.$options.sockets.onclose = (data) => console.log(data);
      this.$options.sockets.onmessage = (data) => console.log(JSON.stringify(data));
    },
    methods: {
      selectedCrew: function (event) {
        this.selected.CrewName = event.name
        this.selected.Cities = event.cities
      }
    }
    }
</script>
<style scoped>
    .crews {
      margin:30px;
      display: flex;
      flex-direction: row;
      padding:5px;
    }
</style>
