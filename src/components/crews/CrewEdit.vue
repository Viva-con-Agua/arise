<template>
  <div id="crew-selected">
     <p v-html="$t('crews.crewform.label.crewname')">
      </p>
    <div v-if="crewEditName === false" class="crew-name">
      {{crew.name}}
    </div>
    <div v-else class="crew-name-edit">
      <label class="control-label" for="crewForm.CrewName"></label>
      <input 
        v-model="crewForm.CrewName" 
        placeholder=""
        name="name"
        v-validate="{ required: true }"
        data-rules="required"
        prop="CrewName">
    </div>
    <button v-on:click="handleCrewEditName"></button>
    <input v-if="crew-name-edit === true"
      {{crew.name}}
    <p v-html="$t('crews.crewform.label.cities')">
    </p>
    <VcABox>
      <span v-for="city, index in crew.cities">
        {{city.name}}, {{city.country}}
      </span>  
    </VcABox>
 </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: "CrewSelected",
    props: ['crew'],
    data (){
      return {
        crewEditName: false,
      }
    },
    methods: {
      handleCrewEditName: function() {
        if(this.crewEditName === false) {
          this.crewEditName = true
        }else{
          this.crewEditName = false
        }
      }
    }
  }
</script>
