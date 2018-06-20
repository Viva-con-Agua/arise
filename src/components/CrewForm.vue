<template>
  <div id="crewForm">
    <!-- <h2>{{ $t ('lang.test.msg') }}</h2> -->
    <el-form :model="crewForm" :label-position="'top'" :rules="rules" ref="CrewForm" label-width="200px">
      <el-form-item label="Crewname:" prop="crewname">
        <el-input v-model="crewForm.CrewName"></el-input>
      </el-form-item>
        <input-tag
            :tags.sync="newCities"
            placeholder="Cityname"
            validate="text">
      </input-tag>
<!--      <sui-segment>
        <ul> <li v-for="city in newCities">{{ city }}</li></ul>

        <div class="input">
          <vue-google-autocomplete
            :types="(cities)"
            :country="['de','nl','at','ch']"
            ref="address"
            v-model="crewForm.City.value"
            id="map"
            v-on:placechanged='getAddressData'>
          </vue-google-autocomplete>
        </div>
      </sui-segment>-->
     <!-- <el-form-item label="Country:" prop="country">
        <el-input v-model="crewForm.Country"></el-input>
      </el-form-item>-->
        <el-form-item label="Country:" prop="country">
            <el-radio-group v-model="crewForm.country">
                <el-radio-button label="Germany">Deutschland</el-radio-button>
                <el-radio-button label="Austria">Österreich</el-radio-button>
                <el-radio-button label="Switzerland">Schweiz</el-radio-button>
                <el-radio-button label="Netherlands">Niederlande</el-radio-button>
            </el-radio-group>
        </el-form-item>
      <el-button
        type="submit"
        @click.prevent="submitForm">
        Submit
      </el-button>
      <el-button
        type="reset"
        @click.prevent="resetForm">
        Reset
      </el-button>
    </el-form>
  </div>
</template>

<script>
// import i18n from './src/lang/'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import InputTag from 'vue-input-tag'
//import InputTag from "vue-input-tag/src/InputTag";

    export default {

      name: "CrewForm",
        components: {
            InputTag,
          VueGoogleAutocomplete
        },

      data () {
        return {
            newCities: [],
            address: '',
            crewForm: {
              CrewName: '',
              City: '',
              Country: '',
            },

          rules: {
            CrewName: [
              {required: true, message: 'Please input a name', trigger: 'blur'}
              ],
            City: [
              {required: true, message: 'Please input at least 1 city', trigger: 'blur'}
              ],
            Country: [
              {required: true, message: 'Please input a country', trigger: 'change'}
              ],
          }
        }
      },

 /*       mounted() {
          this.$refs.address.focus();
        },
*/
      methods: {

          /**
           * When the location found
           * @param {Object} addressData
           * @param {Object} placeResultData
           * @param {Object} id
           */
          getAddressData: function (addressData, placeResultData, id) {
            this.address = addressData;
          },

        submitForm(CrewForm) {
          this.$refs[CrewForm].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(CrewForm) {
          this.$refs[CrewForm].resetFields();
        },
      },


    }
</script>

<style scoped>

</style>
