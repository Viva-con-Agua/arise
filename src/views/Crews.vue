<template>
  <div id ="crews" class="crews">
    <div><CrewList/></div>
    <div><CrewForm/></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueNativeSock from 'vue-native-websocket'
  import CrewForm from '@/components/crews/CrewForm.vue'
  import CrewList from '@/components/crews/CrewList.vue'
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
    },
    data() {
      return {
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
