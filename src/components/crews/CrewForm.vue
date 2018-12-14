<template>
  <div id="form-vertical">
      <div class="form-group" :class="{'has-error': errors.has('name')}">
        <p v-html="$t('crews.crewform.label.crewname')"></p>
        <input
          v-model="crew.name"
          placeholder=""
          name="name"
          v-validate="'required'"
          prop="name">
        <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
      </div>
      <div class="form-group">
        <p v-html="$t('crews.crewform.label.location')"></p>
        <input
            v-if="inputVisible"
            ref="autocomplete"
            v-model="Location"
            class="input-new-city"
            v-bind:placeholder="$t('crews.edit.addCity')"
            onfocus="value = ''"
            type="text"
          />
        <CitiesSelect :cities="crew.cities" v-on:vca-remove-city="removeCity" />
      </div>
      <div class="form-group">
        <button
          class="vca-button-primary vca-full-width"
          @click.prevent="submitForm">{{ $t('options.submit') }}
        </button>
      </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import validator from 'vee-validate';
  import CitiesSelect from '@/components/crews/CitiesSelect.vue'
  Vue.use(validator)
  export default {
    name: "CrewForm",
    components: { CitiesSelect },
    data() {
      return {
        address: '',
        city: {
          name: '',
          country: ''
        },
        crew: {
          name: '',
          cities: []
        },
        Location: '',
        sendForm: {
          operation: '',
          query: [''],
          status: ''
        },
        inputVisible: true,
        cityValue: ''
      }
    },
    mounted() {
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
      });
    },
    methods: {
      socketSend(operation) {
        // this.$options.sockets.onopen = () => console.log('socket is open');
        this.$socket.send(JSON.stringify({
          operation: operation, 
          query: [
            {name: this.crew.name, cities: this.crew.cities}
          ]
        }));
      },
      submitForm() {
        this.$validator.validate().then(result => {
            if (result) {
                this.socketSend('INSERT');
                this.crew.cities = [];
                this.crew.name = '';
            }
        });
        // console.log('socket Send call with');
        // console.log(crew);
      },
      removeCity(city) {
          this.crew.cities = this.crew.cities.filter(c => !(c.name === city.name && c.country === city.country))
      }
    },
  }
</script>

<style scoped>

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

    #CountryContent {
        float: left;
    }

    #tag {
        float: left;
    }

</style>
