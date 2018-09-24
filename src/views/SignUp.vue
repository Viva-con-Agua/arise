<template>
  <div id="signupform">
    <el-card class="box-card">
      <div
              slot="header"
              class="title">
        <font-awesome-icon
                icon="sign-up-alt"
                size="4x"/>
        <h2>{{ $t("signup.title") }}</h2>
      </div>
      <el-form
        ref="signUpForm"
        :model="signUpForm"
        :rules="rules"
        class="signUpForm"
        status-icon>
        <el-form-item
          :label="$t('signup.label.firstname')"
          prop="firstname">
          <el-input
            v-model="signUpForm.firstName"/>
        </el-form-item>
        <el-form-item
          :label="$t('signup.label.lastname')"
          prop="lastname">
          <el-input
            v-model="signUpForm.lastName"/>
        </el-form-item>
        <el-form-item
          :label="$t('signup.label.mobile')"
          prop="mobile">
          <el-input
            v-model="signUpForm.mobilePhone"/>
        </el-form-item>
        <el-form-item
          :label="$t('signup.label.placeofresidence')"
          prop="placeofresidence">
          <el-input
            v-model="signUpForm.placeOfResidence"/>
        </el-form-item>
        <el-form-item
          :label="$t('signup.label.birthdate')"
          prop="birthdate">
          <el-date-picker
            v-model="signUpForm.birthday"
            :placeholder="$t('signup.label.birthdateinfo')"
            type="date"
            style="width: 100%;"/>
        </el-form-item>
        <el-form-item
          :label="$t('signup.label.gender')"
          prop="gender">
          <div id="genContent">
            <el-radio-group
              v-model="signUpForm.gender"
              size="small">
              <el-radio
                label="female">{{ $t('gender.female') }}</el-radio>
              <el-radio
                label="male">{{ $t('gender.male') }}</el-radio>
              <el-radio
                label="other">{{ $t('gender.other') }}</el-radio>
              <el-radio
                label="prefernottosay">{{ $t('gender.prefernottosay') }}</el-radio>
          </el-radio-group></div>
        </el-form-item>
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
          :label="$t('signup.label.password')"
          prop="password">
          <div id="pw">
            <password
              v-model="signUpForm.password"
              :toggle="true"
              class="input"
              default-class="el-input__inner"
              @feedback="showFeedback"/>
          </div>
          <span class="suggestions">{{ this.suggestions[0] }}</span>
        </el-form-item>
        <el-form-item
          :label="$t('signup.label.confirmPassword')"
          prop="checkPass">
          <el-input
            v-model="signUpForm.checkPass"
            type="password"/>
        </el-form-item>
      </el-form>
      <el-button
        class="buttonSignup"
        type="primary"
        icon="el-icon-arrow-right"
        @submit.native.prevent="submitForm">{{ $t('options.signup') }}</el-button>
      <el-button
        class="buttonSignup"
        type="secondary"
        icon="el-icon-close"
        @click.prevent="resetForm">{{ $t('options.reset') }}</el-button>

      <div class="text-body">
        <span>{{ $t('signup.asupporti') }} <router-link to="signin">{{ $t('options.signin') }}</router-link></span>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Vue from 'vue'
 import Password from 'vue-password-strength-meter';
 import axios from 'axios'
 import VueAxios from 'vue-axios'
  import {
    Button,
    DatePicker,
    Card,
    Form,
    FormItem,
    Input,
    Radio,
    Notification,
    RadioGroup
  } from 'element-ui'

 Vue.use(VueAxios, axios);
  Vue.use(Card);
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
   components: {Password},
   data () {
       var checkPass = (rule, value, callback) => {
           if (value === '') {
               callback(new Error('Please input the password again'));
           } else if (value !== this.signUpForm.password) {
               callback(new Error('Two inputs don\'t match!'));
           } else {
               callback();
           }
       };
     var checkeMail = (rule, value, callback) => {
       if (value === '') {
         callback(new Error('Please input the password again'));
       } else if (value !== this.signUpForm.email) {
         callback(new Error('Two inputs don\'t match!'));
       } else {
         callback();
       }
     };

     return {
       suggestions: [""],

       signUpForm: {
           firstName: '',
           lastName: '',
           mobilePhone: '',
           placeOfResidence: '',
           birthday: '',
         gender: '',
         email: '',
         password: '',
       },

       rules: {
         firstName: [
           {required: true, message: this.$t('validationError.firstname'), trigger: 'blur',},
             {message: this.$t('inputSample.firstname'), trigger: 'blur'}
         ], lastName: [
           {required: true, message: this.$t('validationError.lastname'), trigger: 'change'},
               {message: this.$t('inputSample.lastname'), trigger: 'blur'}
           ], mobilePhone: [
           {required: true, message: this.$t('validationError.mobile'), trigger: 'blur'},
               {pattern:/^(?=.*[0\+])(?=.*[0-9]{4})(?=.*[-/\\s])(?=.*([0-9]{4,}))(?=.*[-/\\s])(?=.*[0-9]{4,})/, message: this.$t('inputSample.mobile'), trigger: 'blur'}
           ], placeOfResidence: [
           {required: true, message: this.$t('validationError.placeofresidence'), trigger: 'blur'},
               {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.placeofresidence'), trigger: 'blur'}
         ], birthday: [
           {type: 'date', required: true, message: this.$t('validationError.birthdate'), trigger: 'change'}
         ], gender: [
               {required: false}
           ],email: [
           {required: true, validator: checkeMail, message: this.$t('validationError.email'), trigger: 'blur'},
               {pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: this.$t('inputSample.email') }
         ], checkPass: [
               { required: true, validator: checkPass, message: this.$t('validationError.checkPass'), trigger: 'blur' }
           ]
       }
     }
   },

    //createUserBody
   methods: {
     submitForm() {
       this.$refs.signUpForm.validate((valid) => {
         if (valid) {
           var that = this;
           this.axios
             .post('http://localhost/drops/webapp/signup', this.signUpForm)
             .then(function (response) {
               if (response.status == 200) {
                 that.$router.push({path: 'finishSignup'})
               }
             }
             .catch(function (error) {
                 switch (error.response.status) {
                     case 500:
                         that.open(that.$t('signin.error'), error.response.data.msg, "error");
                         break;
                     case 401:
                         that.open(that.$t('signin.error'), error.response.data.msg, "error");
                 }
              })
             .finally(() => this.loading = false))
         }
       });
     },
     resetForm() {
      this.$refs.signUpForm.resetFields();
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
         // console.log('🙏', suggestions);
         // console.log('⚠', warning);
     },
     showScore (score) {
         // console.log('💯', score);
     },

   },

 };
</script>

<style scoped>
  .buttonSignup {
    margin-bottom:1em;
    /*padding-top: 0.6em;*/
  }

  #signupform {
    width: 100%;
    flex: 1;
    padding-bottom: 1em;
  }

  .box-card {
    width: 35%;
    margin: 0 auto;
    margin-top: 10%;
  }

  el-form-item {
      float: left;
  }

  #genContent {
      float: left;
      clear: both;
  }


</style>
