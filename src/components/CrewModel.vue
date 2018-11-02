<template>
  <div id="CrewModel" class="crew-model">
    <div class="crew-model-name">
      {{crew.name}}
     </div>
     <div class="crew-model-location">
       {{crew.city}} , {{crew.county}}
     </div>
  </div>
</template>    

<script>
  export default {
    name: "CrewModel",
    data () {
      return {
        crew: {
          name: "",
          city: "",
          country: ""
        }
      }
    }
  }
</script>
