<template>
  <div id="form-vertical">
    <div class="form-group" :class="{'has-error': errors.has('name')}">
      <p v-html="$t('crews.crewform.label.crewname')"></p>
      <input 
        v-model="crew.name" 
        placeholder=""
        name="name"
        v-validate="{ required: true }"
        data-rules="required"
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
          onfocus="value = ''"
          type="text"
        >
    </div>
    <div class="form-group">
      <button
        type="primary"
        icon="el-icon-arrow-right"
        class="btn btn-primary"
        @click="$validator.validate()"
        v-on:click="submitForm(crew)">{{ $t('options.submit') }}
      </button>
    </div>
     <div class="form-group">
       <span v-for="city, index in crew.cities">
         {{city.name}}, {{city.country}} <br>
       </span>
     </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import validator from 'vee-validate';
  Vue.use(validator)
  export default {
    name: "CrewForm",
    components: {},
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
        cityValue: '',
        rules: {
          name: [
            {required: true, message: this.$t('validationError.crewname'), trigger: 'blur',},
            {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.name'), trigger: 'blur'}
          ]
        }
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
        let city = ac[0]["long_name"];
        let country = ac[2]["long_name"];
        this.crew.cities.push({name: (`${city}`), country: (`${country}`)});
      });
    },
    methods: {
      socketSend(operation, crew) {
        this.$options.sockets.onopen = () => console.log('socket is open');
        this.$socket.send(JSON.stringify({
          operation: operation, 
          query: [
            {name: this.crew.name, cities: this.crew.cities}
          ]
        }));
      },
      submitForm(crew) {
        this.rules.name[0].required = true;
        this.socketSend('INSERT', crew);
        this.crew.cities = [];
        this.crew.name = '';
        console.log('socket Send call with');
        console.log(crew);
      },
      resetForm(crewForm) {
        this.$refs[crewForm].resetFields();
      },
      handleClose(city) {
        this.Cities.splice(this.Cities.indexOf(city), 1);
      },

      handleInputConfirm() {
        let city = this.cityValue;
        if (city) {
          this.Cities.push(city);
        }
        this.city = '';
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
