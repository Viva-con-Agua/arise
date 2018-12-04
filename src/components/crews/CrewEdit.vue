<template>
  <div id="crew-selected">
    <div class="crew-name">
      <p>{{ $t('crews.crewform.label.crewname') }} {{ crew.name }}</p>
      <button v-on:click="handleEditName">{{ $t('crews.button.editName') }}</button>
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
      <button v-on:click="handleAddCity">{{ $t('crews.button.addCity') }}</button>
      <input
          v-show="addCity"
          ref="autocomplete"
          v-model="Location"
          class="input-new-city"
          onfocus="value = ''"
          type="text"
        >
    </div>
    <div class="submit-crew">
      <button v-on:click="handleSubmit(crew)">{{ $t('crews.button.update')}}</button>
      <button v-on:click="handleDelete(crew)">{{ $t('crews.button.delete')}}</button>
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
    mounted(){
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
          this.addCity = true
        }else{
          this.addCity = false
        }
      },
      socketSend(operation, crew) {
        this.$options.sockets.onopen = () => console.log('socket is open');
        console.log(crew.cities)
        this.$socket.send(JSON.stringify({
          operation: operation, 
          query: [
            {id: crew.id, name: crew.name, cities: crew.cities}
          ]
        }));
      },
      handleSubmit(crew) {
        this.socketSend("UPDATE", crew)
        console.log(crew)
      },
      handleDelete(crew) {
        this.socketSend("DELETE", this.crew)
        this.$emit('delete-crew')
      },
    }

  }
</script>

<style scoped>
  .crew-name {
    display: flex;
    flex-direction: row;
  }
</style>
