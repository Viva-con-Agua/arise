<template>
    <VcAFrame :title="$t('crews.title.view')">
      <VcAColumn size="60%">
        <VcABox :first="true" :title="$t('crews.title.list')">
            <CrewListWorkaround v-on:select-crew="selectedCrew" />
        </VcaBox>
      </VcAColumn> 
      <VcAColumn>
        <VcABox :first="true" v-if="selectedView" :title="$t('crews.title.selected')">
            <CrewSelected :crew="selected" v-on:delete-crew="deleteCrew"/>
        </VcaBox>
        <VcABox :first="isInit" :title="$t('crews.title.form')">
            <CrewForm/>
          </VcaBox>  
      </VcAColumn>
    </VcAFrame>
</template>

<script>
  import Vue from 'vue'
  import VueNativeSock from 'vue-native-websocket'
  import CrewForm from '@/components/crews/CrewForm.vue'
  import CrewListWorkaround from '@/components/crews/CrewListWorkaround.vue'
  import CrewSelected from'@/components/crews/CrewEdit.vue'
  import { VcAFrame, VcAColumn, VcABox, VcAInfoBox } from 'vca-widget-base'
  import 'vca-widget-base/dist/vca-widget-base.css'
  var host = window.location.hostname
  Vue.use(VueNativeSock, 'wss://' + host +'/drops/webapp/crew/ws', { 
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
    format: 'json',
  })


  const STATE_INIT = 0, STATE_EDIT = 1
    //todo: 1. add crewfilter
  export default {
    name: "Crews",
    components: {
      VcAFrame, 
      VcAColumn, 
      VcABox, 
      VcAInfoBox,
      CrewForm,
      CrewListWorkaround,
      CrewSelected,
    },
    data() {
      return {
        state: STATE_INIT,
        selectedView: false,
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
      computed: {
        isInit() {
            return this.state === STATE_INIT
        },
        isEdit() {
            return this.state === STATE_EDIT
        }
      },

    //created: function () {
    //   this.init()
    //},
    beforeDestroy: function () {
      this.crews = null
    },
    mounted() {
      // this.$options.sockets.onclose = (data) => console.log(data);
      // this.$options.sockets.onmessage = (data) => console.log(JSON.stringify(data));
    },
    methods: {
      selectedCrew: function (event) {
        this.selectedView = true
        this.selected = event
          this.state = STATE_EDIT
      },
      deleteCrew: function () {
        this.selectedView = false
        this.selected = ''
          this.state = STATE_INIT
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
  #genContent {
    float: left;
    clear: both;
  }
</style>
