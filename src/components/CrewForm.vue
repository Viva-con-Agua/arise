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
        :label="$t('crewform.label.cities')"
        prop="City">
        <!--<div id="tag">
          <el-tag
            v-for="city in Cities"
            :key="city"
            :disable-transitions="false"
            closable
            @close="handleClose(city)">
            {{ city }}
          </el-tag>
        </div>-->
        <!--            <input
                    class="input-new-city"
                    v-if="inputVisible"
                    v-model="cityValue"
                    onfocus="value = ''"
                    type="text"
                    ref="autocomplete"
            />-->
        <input
          v-if="inputVisible"
          ref="autocomplete"
          v-model="City"
          class="input-new-city"
          onfocus="value = ''"
          type="text"
        >

        <!--<el-button v-else class="button-new-tag" size="small">+ New City</el-button>-->
      </el-form-item>
      <el-form-item
        :label="$t('crewform.label.country')"
        prop="Country">
        <div id="CountryContent">
          {{ $t('latest') }}
          <el-radio-group
            v-model="crewForm.Country"
            size="mini">
            <el-radio-button
              label="Germany">{{ $t('country.de') }}</el-radio-button>
            <el-radio-button
              label="Austria">{{ $t('country.at') }}</el-radio-button>
            <el-radio-button
              label="Switzerland">{{ $t('country.ch') }}</el-radio-button>
            <el-radio-button
              label="Netherlands">{{ $t('country.nl') }}</el-radio-button>
        </el-radio-group></div>
        <el-input
          v-model="crewForm.Country"/>
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-arrow-right"
        @click.prevent="submitForm('crewForm')">{{ $t('options.submit') }}</el-button>
    </el-form>
  </div>
</template>

<script>
  import Vue from 'vue'
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

    export default {
        name: "CrewForm",
        components: {
        },


        data() {
            return {
                address: '',
                crewForm: {
                    CrewName: '',
                    City: '',
                    Country: '',
                },
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
                    City: [
                        {required: true, message: this.$t('validationError.city'), trigger: 'blur'},
                        {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.city'), trigger: 'blur'}
                    ],
                    Country: [
                        {required: true, message: this.$t('validationError.country'), trigger: 'blur'},
                        {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.country'), trigger: 'blur'}
                    ],
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
                let city = ac[0]["short_name"];
                this.crewForm.City = (`${city}`);
                //this.crewForm.Country = (`${country}`); 
                console.log(`The user picked ${city}`);
                this.handleInputConfirm();
                //this.cityValue = "";
            });

        },

        methods: {
          socketSend(operation, crewForm) {
            this.$options.sockets.onopen = () => 
              console.log('socket is open');
              var cities = new Set(this.crewForm.City)
              var crewJson = JSON.stringify({name: crewForm.CrewName, country: crewForm.Country, cities: this.cities})
            this.$socket.send(JSON.stringify({operation: operation, query: [{name: this.crewForm.CrewName, country: this.crewForm.Country, cities: [this.crewForm.City]}]}));

              this.$options.sockets.onmessage = (data) => console.log(data);
            
          },
          submitForm(crewForm) {
            this.$refs[crewForm].validate((valid) => {
              if (valid) {
                //this.sendForm.operation = 'INSERT';
                //this.sendForm.query = JSON.stringify({name: crewForm.CrewName, country: crewForm.country, cities: crewForm.City})
                this.socketSend('INSERT', crewForm);
                      //console.log('crewForm is valid');
                      //that.$options.sockets.onopen = () => {
                      //  console.log('socket is open')
                      //  this.$socket.send(JSON.stringify({operation: 'INSERT', query: [{name: crewForm.CrewName, country: crewForm.Country, cities: crewForm.City}]}))  


                      //this.$options.sockets.onmessage = (data) => console.log(data);
                     // }
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
