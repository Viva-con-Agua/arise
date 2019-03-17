<template>
  <VcAFrame :title="$t('signup.title.view')" hasContainer="true">
    <el-form
        ref="signUpForm"
        :model="signUpForm"
        :rules="rules"
        class="columns-container"
        @keyup.enter.native.prevent="submitForm"
        status-icon>
      <VcAColumn>
        <VcABox :first="true" :title="$t('supporterForm.title')">
          <VcAInfoBox>
            {{ $t('supporterForm.infoBox') }}
          </VcAInfoBox>
          <el-form-item
            :label="$t('supporterForm.label.firstname')"
            prop="firstname">
            <el-input
              v-model="signUpForm.firstName"/>
          </el-form-item>
          <el-form-item
            :label="$t('supporterForm.label.lastname')"
            prop="lastname">
            <el-input
              v-model="signUpForm.lastName"/>
          </el-form-item>
                      <el-form-item
            :label="$t('supporterForm.label.mobile')"
            prop="mobile">
            <el-input
              v-model="signUpForm.mobilePhone"/>
          </el-form-item>
          <el-form-item
            :label="$t('supporterForm.label.birthdate')"
            prop="birthdate">
            <el-date-picker
              v-model="signUpForm.birthday"
              :placeholder="$t('supporterForm.label.birthdateinfo')"
              type="date"
              style="width: 100%;"/>
          </el-form-item>
          <el-form-item
            :label="$t('supporterForm.label.gender')"
            prop="gender">
            <div id="genContent">
              <el-radio-group
              class="genderOptions"
                v-model="signUpForm.gender"
                size="small">
                <el-radio
                  label="female">{{ $t('gender.female') }}</el-radio>
                <el-radio
                  label="male">{{ $t('gender.male') }}</el-radio>
                <el-radio
                  label="other">{{ $t('gender.other') }}</el-radio>
                <el-radio
                  label="undefined">{{ $t('gender.undefined') }}</el-radio>
            </el-radio-group></div>
          </el-form-item>
        </VcABox>
      </VcAColumn>
      <VcAColumn>
        <VcABox :first="true" :title="$t('profile.title.address')">
          <AddressSelect v-on:currentAddress="currentAddress($event)"/>
        </VcABox>
      </VcAColumn>
      <VcAColumn>
        <VcABox :first="true" :title="$t('signup.title.credentials')">
          <el-form-item
            :label="$t('signup.label.email')"
            prop="email">
            <el-input
              v-model="signUpForm.email"/>
          </el-form-item>
          <el-form-item
            :label="$t('signup.label.checkemail')"
            prop="checkemail">
            <el-input
              v-model="signUpForm.checkemail"/>
          </el-form-item>
          <el-form-item
            :label="$t('signup.label.password.title')"
            prop="password">
            <div id="pw">
              <password
                v-model="signUpForm.password"
                :toggle="true"
                class="input"
                default-class="el-input__inner"
                :placeholder="$t('signup.label.password.placeholder')"
                @feedback="showFeedback"/>
            </div>
            <p v-if="suggestions.length !== 0" class="el-form-item__error">
              <span class="suggestions">{{ suggestions[0] }}</span><br v-if="suggestions.length >= 2" />
              <span v-if="suggestions.length >= 2" class="suggestions">{{ suggestions[1] }}</span><br v-if="suggestions.length >= 3" />
              <span v-if="suggestions.length >= 3" class="suggestions">{{ suggestions[2] }}</span>
            </p>
          </el-form-item>
          <el-form-item
            :label="$t('signup.label.confirmPassword')"
            prop="checkPass">
            <el-input
              v-model="signUpForm.checkPass"
              type="password"/>
          </el-form-item>
        </VcABox>
        <VcABox :first="false" :title="$t('signup.title.register')">
          <button
                  class="vca-button-primary buttonSignUp"
                  @click.prevent="submitForm">
            {{ $t('signup.formSubmit') }}
          </button>

          <div class="text-body">
            <span>{{ $t('signup.asupporti') }} <router-link to="signin">{{ $t('options.signin') }}</router-link></span>
          </div>
        </VcABox>
      </VcAColumn>

    </el-form>
  </VcAFrame>
</template>

<script>
  import Vue from 'vue'
 import Password from 'vue-password-strength-meter';
 import axios from 'axios'
 import VueAxios from 'vue-axios'
  import AddressSelect from '@/components/address/AddressForm.vue'
  import { VcAFrame, VcAColumn, VcABox, VcAInfoBox } from 'vca-widget-base'
  import 'vca-widget-base/dist/vca-widget-base.css'
  import {
    Button,
    DatePicker,
    Form,
    FormItem,
    Input,
    Radio,
    Notification,
    RadioGroup
  } from 'element-ui'

 Vue.use(VueAxios, axios);
  Vue.use(Button);
  Vue.use(DatePicker);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Input);
  Vue.use(Notification);
  Vue.use(Radio);
  Vue.use(RadioGroup);

  Notification.closeAll();

 //var axios = require('axios');


 export default {
   components: { Password, VcAFrame, VcAColumn, VcABox, VcAInfoBox, AddressSelect },
   data () {
       var checkPass = (rule, value, callback) => {
           if (value === '') {
               callback(new Error(this.$t('signup.error.password.empty')));
           } else if (value !== this.signUpForm.password) {
               callback(new Error(this.$t('signup.error.password.unequal')));
           } else {
               callback();
           }
       };
     var checkeMail = (rule, value, callback) => {
       if (value === '') {
         callback(new Error(this.$t('signup.error.email.empty')));
       } else if (value !== this.signUpForm.email) {
         callback(new Error(this.$t('signup.error.email.unequal')));
       } else {
         callback();
       }
     };

     return {
       suggestions: [],

       signUpForm: {
           firstName: '',
           lastName: '',
           address: {
            street: '',
            additional: '',
            city: '',
            country: ''
           },
           mobilePhone: '',
           birthday: '',
         gender: '',
         email: '',
         password: '',
       },

       rules: {
         firstName: [
           {required: true, message: this.$t('validationError.firstname'), trigger: 'blur',},
           {message: this.$t('inputSample.firstname'), trigger: 'blur'}
         ],
         lastName: [
           {required: true, message: this.$t('validationError.lastname'), trigger: 'change'},
           {message: this.$t('inputSample.lastname'), trigger: 'blur'}
         ],
         mobilePhone: [
           {required: true, message: this.$t('validationError.mobile'), trigger: 'blur'},
           {pattern:/^(?=.*[0+])(?=.*[0-9]{4})(?=.*[-/\\s])(?=.*([0-9]{4,}))(?=.*[-/\\s])(?=.*[0-9]{4,})/, message: this.$t('inputSample.mobile'), trigger: 'blur'}
         ],
         street: [
           {required: false, message: this.$t('validationError.street'), trigger: 'blur'},
           {message: this.$t('inputSample.street'), trigger: 'blur'}
         ],
         zip: [
           {required: false, message: this.$t('validationError.zip'), trigger: 'blur'},
           {pattern:/^[0-9]{4,8}$/, message: this.$t('inputSample.zip'), trigger: 'blur'}
         ],
         placeOfResidence: [
           {required: false, message: this.$t('validationError.placeofresidence'), trigger: 'blur'},
           {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.placeofresidence'), trigger: 'blur'}
         ],
  country: [
  {required: false, message: this.$t('validationError.country'), trigger: 'blur'},
     {message: this.$t('inputSample.country'), trigger: 'blur'}
  ],
         birthday: [
           {type: 'date', required: true, message: this.$t('validationError.birthdate'), trigger: 'change'}
         ],
         gender: [
           {required: false}
         ],
         email: [
           {required: true, message: this.$t('validationError.email'), trigger: 'blur'},
           {pattern:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: this.$t('inputSample.email') }
         ],
         checkemail: [
           {required: true, validator: checkeMail, trigger: 'blur'},
           {pattern:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: this.$t('inputSample.email') }
         ],
         password: [
             { required: true, message: this.$t('validationError.checkPass'), trigger: 'blur' }
         ],
         checkPass: [
           { required: true, validator: checkPass, trigger: 'blur' }
         ]
       }
     }
   },
    mounted() {
    },

    //createUserBody
   methods: {
     submitForm() {
       this.$refs.signUpForm.validate((valid) => {
         if (valid) {
             function transform(form) {
                 var date = Date.parse(form.birthday)
                 form['birthday'] = date
                 return form
             }
           var that = this;
           this.axios
             .post('/drops/webapp/signup', transform(this.signUpForm))
             .then(function (response) {
               if (response.status == 200) {
                 that.$router.push({path: 'finishSignup'})
               }
             })
             .catch(function (error) {
                 switch (error.response.status) {
                     case 500:
                         if(error.response.data.hasOwnProperty("msg")) {
                             that.open(that.$t('signup.error.serverError.title'), error.response.data.msg, "error");
                         } else {
                             that.open(that.$t('signup.error.serverError.title'), that.$t('signup.error.serverError.msg'), "error");
                         }
                         break;
                     case 401:
                         if(error.response.data.hasOwnProperty("msg")) {
                             that.open(that.$t('signup.error.unAuthorized.title'), error.response.data.msg, "error");
                         } else {
                             that.open(that.$t('signup.error.unAuthorized.title'), that.$t('signup.error.unAuthorized.msg'), "error");
                         }
                         break;
                     case 400:
                         if(error.response.data.hasOwnProperty("msg")) {
                             that.open(that.$t('signup.error.badRequest.title'), error.response.data.msg, "error");
                         } else {
                             that.open(that.$t('signup.error.badRequest.title'), that.$t('signup.error.badRequest.msg'), "error");
                         }
                         break;
                 }
              })
             .finally(() => this.loading = false)
         }
       });
     },
     resetForm() {
      this.$refs.signUpForm.resetFields();
     },
      currentAddress(address) {
        this.signUpForm.address = address;
      },
     open(title, message, type) {
         Notification({
             title:  title,
             message: message,
             type: type
         });
     },
     showFeedback ({suggestions, warning}) {
         this.suggestions = suggestions;
     }

   },

 };
</script>

<style scoped lang="less">

  .buttonSignUp {
    margin-top:1em;
    margin-bottom:1em;
    width: 100%;
    /*padding-top: 0.6em;*/
  }

  /*.suggestions {*/
    /*line-height: 1em;*/
  /*}*/

  el-form-item {
      float: left;
  }

  .genderOptions {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      padding: 0 0.5em;

      .el-radio {
          margin: 0em;
          padding-left: 0.5em;
      }
  }

  #genContent {
      float: left;
      clear: both;
      width: 100%;
  }


</style>
