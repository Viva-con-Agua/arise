<template>
  <div id="crew-selected">
    <div class="crew-name">
      <p>{{ $t('crews.crewform.label.crewname') }} {{ crew.name }}</p>
      <button v-on:click="handleEditName"></button>
      <input
        v-if="editName"
        v-model="crew.name" 
        placeholder=""
        v-validate="{ required: true }"
        data-rules="required">
    </div>
    <div class="crew-cities">
      <span v-for="city, index in crew.cities">
        {{city.name}}, {{city.country}}
      </span> 
      <button v-on:click="handleAddCity"></button>
      <input
          v-if="addCity"
          ref="autocomplete"
          v-model="Location"
          class="input-new-city"
          onfocus="value = ''"
          type="text"
        >
    </div>
 </div>
</template>

<script>
  import Vue from 'vue'
   import VcABox from '@/components/page/VcABox.vue'

  export default {
    name: "CrewSelected",
    props: ['crew'],
    components: { VcABox },
    data (){
      return {
        Location: "",
        editName: false,
        addCity: false,
      }
    },
    methods: {
      handleEditName: function() {
        if(this.editName === false) {
          this.editName = true
        }else{
          this.editName = false
        }
      },
      handleAddCity: function() {
        if(this.addCity === false) {
          this.initialAC()
          this.addCity = true
        }else{
          this.addCity = false
          this.clearAC()
        }
      },
      initialAC: function() {
        this.autocomplete = new google.maps.places.Autocomplete(
          (this.$refs.autocomplete),
          {types: ['(cities)']}
        );
        this.autocomplete.addListener('place_changed', () => {
          let place = this.autocomplete.getPlace();
          let ac = place.address_components;
          let city = ac[0]["long_name"];
          let country = ac[2]["long_name"];
          this.crew.cities.push({name: (`${city}`), country: (`${country}`)});
          console.log(`The user picked ${city}`);
        });
      },
      cleanAC: function() {
        this.autocomplete = ''
      }

    }

  }
</script>

<style scoped>
  .crew-name {
    display: flex;
    flex-direction: row;
  }
</style>
