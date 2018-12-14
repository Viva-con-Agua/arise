<template>
  <div id="crew-selected">
    <div class="crew-name">
      <p v-html="$t('crews.crewform.label.crewname')"></p>
      <input
        v-model="crew.name" 
        placeholder="crew.name"
        v-validate="'required'"
        data-rules="required">
    </div>
    <div class="crew-cities">
      <p v-html="$t('crews.crewform.label.location')"></p>
      <input
          ref="autocomplete"
          v-model="Location"
          v-bind:placeholder="$t('crews.edit.addCity')"
          class="input-new-city"
          onfocus="value = ''"
          type="text"
        >
      <CitiesSelect :cities="crew.cities" v-on:vca-remove-city="removeCity" />
    </div>

    <div class="submit-crew">
      <button
        class="vca-button-primary vca-full-width"
        v-on:click="handleSubmit(crew)">{{ $t('crews.button.update')}}</button>
      <button
        class="vca-button-warn vca-full-width"
        v-on:click="handleDelete(crew)">{{ $t('crews.button.delete')}}</button>
    </div>
 </div>
</template>

<script>
  import Vue from 'vue'
   import VcABox from '@/components/page/VcABox.vue'
  import CitiesSelect from '@/components/crews/CitiesSelect.vue'

  export default {
    name: "CrewSelected",
    props: ['crew'],
    components: { VcABox, CitiesSelect },
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
          let city = ac.find(field => field.types.some(t => t === "locality")) //ac[0]["long_name"];
          let country = ac.find(field => field.types.some(t => t === "country")) //ac[ac.length-1]["long_name"];
          if(typeof city !== "undefined" && typeof country !== "undefined") {
            this.crew.cities.push({name: (`${city.long_name}`), country: (`${country.long_name}`)});
          }
          // console.log(`The user picked ${city}`);
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
      removeCity(city) {
        this.crew.cities = this.crew.cities.filter((c) => !(c.name === city.name && c.country === city.country))
        this.handleSubmit(this.crew)
      },
      socketSend(operation, crew) {
        // this.$options.sockets.onopen = () => console.log('socket is open');
        // console.log(crew.cities)
        this.$socket.send(JSON.stringify({
          operation: operation, 
          query: [
            {id: crew.id, name: crew.name, cities: crew.cities}
          ]
        }));
      },
      handleSubmit(crew) {
        this.$validator.validate().then(result => {
          if (result) {
            this.socketSend("UPDATE", crew)
          }
        })
        // console.log(crew)
      },
      handleDelete(crew) {
        this.socketSend("DELETE", this.crew)
        this.$emit('delete-crew')
      },
    }

  }
</script>

<style scoped>
  .crewNameEdit {
    width: 95%;
    font-size: 14px;
    box-sizing: border-box;
    height: 40px;
  }
    input {
        font-size: 14px;
        width: 100%;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    }
</style>
