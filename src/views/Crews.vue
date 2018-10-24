<template>
  <div id="app">
    <CrewForm/>
    <CrewList v-model="crews"/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueNativeSock from 'vue-native-websocket'
  import CrewForm from '@/components/CrewForm.vue'
  import CrewList from '@/components/CrewList.vue'
  
  Vue.use(VueNativeSock, 'ws://localhost/drops/webapp/crew/ws', { format: 'json'})

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

        methods: {

          init: function () {
              var xhr = new XMLHttpRequest()
              var self = this
              xhr.open(initMethod, initURL)
              xhr.setRequestHeader('Accept', 'application/json; charset=utf-8')
              xhr.onload = function () {
                  self.crews = JSON.parse(xhr.responseText)
              }
              xhr.send()
          },
      },
    mounted() {
      this.$options.sockets.onmessage = (data) => console.log(data);
    }
    }
</script>
<style scoped>
    @import '/src/router/index.css';
/*@import url('https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.1/theme-chalk/index.css');*/
/*@import './src/assets/index.css';*/
</style>
