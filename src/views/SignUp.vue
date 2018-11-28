<template>
  <div id="signupform">
    <h1 class="pageTitle">{{ $t('signup.title.view') }}</h1>
    <el-form
        ref="signUpForm"
        :model="signUpForm"
        :rules="rules"
        class="signUpForm"
        @keyup.enter.native="submitForm"
        status-icon>
      <div class="column">
      <el-card class="box-card">
        <div
                slot="header"
                class="title">
          <h2>{{ $t("signup.title.supporter") }}</h2>
        </div>
        <p class="infoBox">
          {{ $t('signup.infoBox') }}
        </p>
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
      </el-card>
      </div>
      <div class="column">
      <el-card class="box-card">
        <div
                slot="header"
                class="title">
          <h2>{{ $t("signup.title.credentials") }}</h2>
        </div>
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
      </el-card>
      <el-card class="box-card">
        <div
                slot="header"
                class="title">
          <h2>{{ $t("signup.title.register") }}</h2>
        </div>
        <button
                class="vca-button-primary buttonSignUp"
                @click.prevent="submitForm">
          {{ $t('signup.formSubmit') }}
        </button>
      
      <div class="text-body">
        <span>{{ $t('signup.asupporti') }} <router-link to="signin">{{ $t('options.signin') }}</router-link></span>
      </div>
    </el-card>
      </div>

    </el-form>
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
         ],
         lastName: [
           {required: true, message: this.$t('validationError.lastname'), trigger: 'change'},
           {message: this.$t('inputSample.lastname'), trigger: 'blur'}
         ],
         mobilePhone: [
           {required: true, message: this.$t('validationError.mobile'), trigger: 'blur'},
           {pattern:/^(?=.*[0\+])(?=.*[0-9]{4})(?=.*[-/\\s])(?=.*([0-9]{4,}))(?=.*[-/\\s])(?=.*[0-9]{4,})/, message: this.$t('inputSample.mobile'), trigger: 'blur'}
         ],
         placeOfResidence: [
           {required: true, message: this.$t('validationError.placeofresidence'), trigger: 'blur'},
           {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.placeofresidence'), trigger: 'blur'}
         ],
         birthday: [
           {type: 'date', required: true, message: this.$t('validationError.birthdate'), trigger: 'change'}
         ],
         gender: [
           {required: false}
         ],
         email: [
           {required: true, message: this.$t('validationError.email'), trigger: 'blur'},
           {pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: this.$t('inputSample.email') }
         ],
         checkemail: [
           {required: true, validator: checkeMail, trigger: 'blur'},
           {pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: this.$t('inputSample.email') }
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

    //createUserBody
   methods: {
     submitForm() {
       this.$refs.signUpForm.validate((valid) => {
         if (valid) {
           var that = this;
           this.axios
             .post('/drops/webapp/signup', this.signUpForm)
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
                 }
              })
             .finally(() => this.loading = false)
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
     },
     showScore (score) {
         // console.log('💯', score);
     },

   },

 };
</script>

<style scoped lang="less">

  @columnSpace: 3em;
  @columnWidth: 30%;
  @columnsCount: 2;

  .buttonSignUp {
    margin-top:1em;
    margin-bottom:1em;
    width: 100%;
    /*padding-top: 0.6em;*/
  }

  #signupform {
    width: 100%;
    flex: 1;
    padding-bottom: 1em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;
  }

  .pageTitle {
    width: (@columnWidth * @columnsCount) + @columnSpace;
    align-self: center;
    padding: 0 0.2em;
  }

  .signUpForm {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: @columnWidth;
    height: 100%;

    & .box-card:not(:first-child) {
      margin-top: 2em;
    }
    &:not(:first-child) {
      margin-left: @columnSpace;
    }
  }

  .title > h2 {
    font-size: 1.5em;
    margin: 0;
  }

  .infoBox {
    background-color: rgba(165, 119, 64, 0.6);
    border: 1px dashed rgba(165, 119, 64, 1);
    -webkit-border-radius: 0.3em;
    -moz-border-radius: 0.3em;
    border-radius: 0.3em;
    padding: 0.5em;
  }

  /*.suggestions {*/
    /*line-height: 1em;*/
  /*}*/

  .box-card {
    width: 100%;
  }

  el-form-item {
      float: left;
  }

  #genContent {
      float: left;
      clear: both;
  }


</style>
