<template>
    <div id="app">
        <p>{{ $t('hello') }}</p>
        <CrewForm></CrewForm>
        <CrewList v-model="this.crews"></CrewList>
    </div>
</template>

<script>
  import CrewForm from '@/components/CrewForm.vue'
  import CrewList from '@/components/CrewList.vue'

  var initURL = 'http://localhost:3000/drops/rest/crew/query';
  var initMethod = 'POST';

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

        created: function () {
            this.init()
        },
        beforeDestroy: function () {
            this.crews = null
        },


        methods: {
          // axios: function () {
          //   axios.post('http://localhost:3000/drops/rest/crew/query')
          //       .then(function (response) {
          //       console.log(response);
          //   })  .catch(function (error) {
          //       console.log(error);
          //   })
          // },


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
      }
    }
</script>
<style scoped>
    @import '/src/router/index.css';
/*@import url('https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.1/theme-chalk/index.css');*/
/*@import './src/assets/index.css';*/
</style>
