<template>
  <div id="crewForm">
    <el-form
      ref="crewForm"
      :model="crewForm"
      :rules="rules"
      status-icon>
      <el-form-item
        :label="$t('crewform.label.crewname')"
        prop="CrewName">
        <el-input
          v-model="crewForm.CrewName"/>
      </el-form-item>
      <el-form-item
        :label="$t('crewform.label.location')"
        prop="City">
        <input
          v-if="inputVisible"
          ref="autocomplete"
          v-model="Location"
          class="input-new-city"
          onfocus="value = ''"
          type="text"
        >
      </el-form-item>
        <div class="location-list">
          <span v-for="location, index in llist">
                 {{location}}
          </span>
        </div>
      <el-button
        type="primary"
        icon="el-icon-arrow-right"
        @click.prevent="submitForm('crewForm')">{{ $t('options.submit') }}</el-button>
    </el-form>
  </div>
</template>

<script>
  import Vue from 'vue'
  import CrewModel from './CrewModel'
  import {
    Button,
    Form,
    FormItem,
    Input,
    RadioGroup,
    RadioButton
  } from 'element-ui'

  Vue.use(Button);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Input);
  Vue.use(RadioGroup);
  Vue.use(RadioButton);
  Vue.use(CrewModel);
    export default {
        name: "CrewForm",
        components: {
        },
        data() {
            return {
                address: '',
                City: {
                  name: '',
                  country: ''
                },
                Cities: [],
                crewForm: {
                    CrewName: '',
                    Cities: [],
                },
                Location: '',
                llist: [''], 
                sendForm: {
                  operation: '',
                  query: [''],
                  status: ''
                },
                Cities: [],
                inputVisible: true,
                cityValue: '',


                rules: {
                    CrewName: [
                        {required: true, message: this.$t('validationError.crewname'), trigger: 'blur',},
                        {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.name'), trigger: 'blur'}
                    ],
                    /*City: [
                        {required: true, message: this.$t('validationError.city'), trigger: 'blur'},
                        {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.city'), trigger: 'blur'}
                    ],
                    Country: [
                        {required: true, message: this.$t('validationError.country'), trigger: 'blur'},
                        {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.country'), trigger: 'blur'}
                    ],*/
                }
            }
        },

        mounted() {
            this.$options.sockets.onmessage = (data) => console.log(data);
            this.autocomplete = new google.maps.places.Autocomplete(
                (this.$refs.autocomplete),
                {types: ['(cities)']}
            );
            this.autocomplete.addListener('place_changed', () => {
                let place = this.autocomplete.getPlace();
                let ac = place.address_components;
                let city = ac[0]["long_name"];
                let country = ac[2]["long_name"];
                this.City.name = (`${city}`);
                this.City.country = (`${country}`);
                this.crewForm.Cities.push(this.City);
                this.llist.push(this.crewForm.Cities)
                console.log(`The user picked ${city}`);
                //this.handleInputConfirm();
            });

        },

        methods: {
          socketSend(operation, crewForm) {
            this.$options.sockets.onopen = () => 
              console.log('socket is open');
              //var cities = new Set(this.crewForm.City)
              //var crewJson = JSON.stringify({name: crewForm.CrewName, cities: this.crewForm.Cities})
            this.$socket.send(JSON.stringify({operation: operation, query: [{name: this.crewForm.CrewName, cities: this.crewForm.Cities}]}));

              this.$options.sockets.onmessage = (data) => console.log(data);
            
          },
          submitForm(crewForm) {
            this.$refs[crewForm].validate((valid) => {
              if (valid) {
                this.socketSend('INSERT', crewForm);
                console.log('socket Send call with');
                console.log(crewForm);
              } else {
                  console.log('error submit!!');
                  return false;
               }
             });
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
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 100%;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    }

    #CountryContent {
        float: left;
    }

    #tag {
        float: left;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
        float: left;
    }

</style>
