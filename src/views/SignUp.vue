<template>
  <div id="signupform">
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
          v-model="signUpForm.firstname"/>
      </el-form-item>
      <el-form-item
        :label="$t('signup.label.lastname')"
        prop="lastname">
        <el-input
          v-model="signUpForm.lastname"/>
      </el-form-item>
      <el-form-item
        :label="$t('signup.label.mobile')"
        prop="mobile">
        <el-input
          v-model="signUpForm.mobile"/>
      </el-form-item>
      <el-form-item
        :label="$t('signup.label.placeofresidence')"
        prop="placeofresidence">
        <el-input
          v-model="signUpForm.placeofresidence"/>
      </el-form-item>
      <el-form-item
        :label="$t('signup.label.birthdate')"
        prop="birthdate">
        <el-date-picker
          v-model="signUpForm.birthdate"
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
      type="primary"
      icon="el-icon-arrow-right"
      @click.prevent="submitForm"
      @keyup.enter="submitForm">{{ $t('options.signup') }}</el-button>
    <el-button
      type="text"
      icon="el-icon-close"
      @click.prevent="resetForm">{{ $t('options.reset') }}</el-button>

    <div style="margin: 20px;">
      <h5>{{ $t('signup.asupporti') }}<router-link to="signin">{{ $t('options.signin') }}</router-link></h5>
    </div>
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
    Form,
    FormItem,
    Input,
    Radio,
    RadioGroup
  } from 'element-ui'

 Vue.use(VueAxios, axios);
  Vue.use(Button);
  Vue.use(DatePicker);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Input);
  Vue.use(Radio);
  Vue.use(RadioGroup);

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

       signUpForm: {
         firstname: '',
         lastname: '',
         mobile: '',
         placeofresidence: '',
         birthdate: '',
         gender: '',
         email: '',
         password: '',
       },/*
       signUpForm2: {
         firstName: this.signUpForm.firstname,
         lastName: this.signUpForm.lastname,
         mobilePhone: this.signUpForm.mobile,
         placeOfResidence: this.signUpForm.placeofresidence,
         birthday: this.signUpForm.birthdate,
         sex: this.signUpForm.gender,
         emial: this.signUpForm.email,
         password: this.signUpForm.password,
         profileImageUrl: '',
       },*/

       rules: {
         firstname: [
           {required: true, message: this.$t('validationError.firstname'), trigger: 'blur',},
             {message: this.$t('inputSample.firstname'), trigger: 'blur'}
         ], lastname: [
           {required: true, message: this.$t('validationError.lastname'), trigger: 'change'},
               {message: this.$t('inputSample.lastname'), trigger: 'blur'}
           ], mobile: [
           {required: true, message: this.$t('validationError.mobile'), trigger: 'blur'},
               {pattern:/^(?=.*[0\+])(?=.*[0-9]{4})(?=.*[-/\\s])(?=.*([0-9]{4,}))(?=.*[-/\\s])(?=.*[0-9]{4,})/, message: this.$t('inputSample.mobile'), trigger: 'blur'}
           ], placeofresidence: [
           {required: true, message: this.$t('validationError.placeofresidence'), trigger: 'blur'},
               {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.placeofresidence'), trigger: 'blur'}
         ], birthdate: [
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
             .post('http://localhost:3000/test', this.signUpForm)
             .then(function (response) {
               if (response == 200) {
                 that.$router.push({path: 'finishSignup'})
               }
             }
             .catch(function (error) {
               console.log(error)
              })
             .finally(() => this.loading = false))
         } else {
           console.log('error submit!!');
           return false;
         }
       });
     },
     resetForm() {
      this.$refs.signUpForm.resetFields();
     },
     showFeedback ({suggestions, warning}) {
       console.log('🙏', suggestions)
       console.log('⚠', warning)
     },
     showScore (score) {
       console.log('💯', score)
     },

   },

 };
</script>

<style scoped>
  #signupform {
    position: relative;
    left: 25%;
    width: 50%;
  }

  el-form-item {
      float: left;
  }

  #genContent {
      float: left;
      clear: both;
  }


</style>
