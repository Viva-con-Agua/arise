<template>
  <div id="signupform">
    <sui-divider hidden/>
    <sui-divider horizontal>
      Person</sui-divider>

    <el-form
            :model="signUpForm"
            :rules="rules"
            label-position=""
            ref="SignUpForm"
            class="signUpForm">
      <el-form-item
              label="Firstname:"
              prop="firstname">
        <el-input
                v-model="signUpForm.firstname"></el-input>
      </el-form-item>
      <el-form-item
              label="Lastname:"
              prop="lastname">
        <el-input
                v-model="signUpForm.lastname"></el-input>
      </el-form-item>
      <el-form-item
              label="Mobile:"
              prop="mobile">
        <el-input
                v-model="signUpForm.mobile"></el-input>
      </el-form-item>
      <el-form-item
              label="Wohnort:"
              prop="placeofresidence">
        <el-input
                v-model="signUpForm.placeofresidence"></el-input>
      </el-form-item>
      <el-form-item
              label="Geburtsdatum:" required>
        <el-date-picker
                v-model="signUpForm.birthdate"
                type="date"
                placeholder="Wann wurdest du geboren?"
                style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item
            label="Gender:"
            prop="gender">
        <div id="gen_content">
        <el-radio-group
                v-model="signUpForm.gender"
                size="small">
          <el-radio-button
                  label="female">female</el-radio-button>
          <el-radio-button
                  label="male">male</el-radio-button>
          <el-radio-button
                  label="other">other</el-radio-button>
          <el-radio-button
                  label="prefer not to say">prefer not to say</el-radio-button>
        </el-radio-group></div>
      </el-form-item>
      <sui-divider horizontal>
        Account</sui-divider>
      <el-form-item
              label="e-mail Adresse:"
              prop="email">
        <el-input
                v-model="signUpForm.email"></el-input>
      </el-form-item>
      <password
        v-model="signUpForm.password"
        :toggle="false"
        @score="showScore"
        @feedback="showFeedback"
        :class="{'input': true }"
        name="password"
        type="password"
        defaultClass = "style"
        style="
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 40px;
            line-height: 40px;
            outline: 0;
            padding: 0 15px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            width: 100%;"/>
    </el-form>

<!--    <el-form :label-position="'top'" @submit.prevent="validateBeforeSubmit">
      <el-form-field>
        <label>Vorname:</label>
        <div class="ui icon input">
        <input
          v-validate="'required|alpha'"
          v-model.lazy="firstname"
          :class="{'is-danger': errors.has('firstname')}"
          name="firstname"
          id="frr"
          type="text"
          placeholder="Vorname"><i
          v-show="fields.firstname && fields.firstname.dirty && fields.firstname.touched && errors.has('firstname')"><sui-icon name="times circle" color="red"></sui-icon>
        </i>
          </div>
        <i
          v-show="errors.has('firstname')"
          class="fa fa-warning">
        </i>
        <span
          v-show="fields.firstname && fields.firstname.dirty && fields.firstname.touched && errors.has('firstname')"
          class="help_is-danger"> {{ errors.first('firstname') }}</span></el-form-field>
      <el-form-field>
        <label>Nachname:</label>
        <input
          v-validate="'required|alpha'"
          v-model.lazy="lastname"
          id="grr"
          ref="text"
          :class="{'input': true, 'is-danger': errors.has('lastname') }"
          name="lastname"
          type="text"
          placeholder="Nachname">
        <i
          v-show="errors.has('lastname')"
          class="fa fa-warning"></i>
        <span
          v-show="fields.lastname && fields.lastname.dirty && fields.lastname.touched && errors.has('lastname')"
          class="help_is-danger"> {{ errors.first('lastname') }}</span></el-form-field>
      <sui-form-field>
        <label>Handynummer:</label>
        <input
          v-validate="'required|min:6|verify_mobile'"
          v-model.lazy="phone"
          :class="{'input': true, 'is-danger': errors.has('phone') }"
          name="phone"
          type="text"
          placeholder="+49 1523 456789">
        <i
          v-show="errors.has('phone')"
          class="fa fa-warning"></i>
        <span
          v-show="fields.phone && fields.phone.dirty && fields.phone.touched  && errors.has('phone')"
          class="help_is-danger"> {{ errors.first('phone') }}</span></sui-form-field>
      <sui-form-field>
        <label>Wohnort:</label>
        <input
          v-validate="'required|alpha_spaces'"
          v-model.lazy="location"
          :class="{'input': true, 'is-danger': errors.has('location') }"
          name="location"
          type="text">
        <i
          v-show="errors.has('location')"
          class="fa fa-warning"></i>
        <span
          v-show="fields.location && fields.location.dirty && errors.has('location')"
          class="help_is-danger"> {{ errors.first('location') }}</span></sui-form-field>
      <sui-form-field>
        <label>Geburtstag:</label>
        <input
          v-validate="'required|date_format:DD.MM.YYYY'"
          v-model.lazy="birthdate"
          :class="{'input': true, 'is-danger': errors.has('birthdate') }"
          name="birthdate"
          type="date"
          placeholder=" 15.05.1910">
        <i
          v-show="errors.has('birthdate')"
          class="fa fa-warning"></i>
        <span
          v-show="fields.birthdate && fields.birthdate.dirty && errors.has('birthdate')"
          class="help_is-danger"> {{ errors.first('birthdate') }}</span></sui-form-field>
      <sui-form-field>
        <label>Gender:<div id="op">Optional</div></label>
        <sui-dropdown
          v-model="gender"
          :options="options"
          placeholder="Gender"
          selection></sui-dropdown></sui-form-field>
      <sui-divider hidden/>
      <sui-divider horizontal>
        Account</sui-divider>
      <sui-form-field>
        <label>e-mail Adresse:</label>
        <input
          v-validate="'required|email'"
          v-model.lazy="email"
          :class="{'input': true, 'is-danger': errors.has('email') }"
          name="email"
          type="email"
          placeholder="freak@vivaconagua.org">
        <i
          v-show="errors.has('email')"
          class="fa fa-warning"></i>
        <span
          v-show="fields.email && fields.email.dirty && errors.has('email')"
          class="help_is-danger"> {{ errors.first('email') }}</span></sui-form-field>

      <sui-form-field>
        <label>Passwort:</label>
        <i
          v-show="errors.has('password')"
          class="fa fa-warning"></i>
        <password
          v-validate="'required|min:8|verify_password'"
          v-model="password"
          :toggle="false"
          @score="showScore"
          @feedback="showFeedback"
          :class="{'input': true, 'is-danger': errors.has('password') }"
          name="password"
          type="password"/>
        <span
          v-show="fields.password && fields.password.dirty && errors.has('password')"
          class="help_is-danger"> {{ errors.first('password') }}</span>
          </sui-form-field>
      <sui-form-field>
        <label>Passwort wiederholen:</label>
        <i
        v-show="errors.has('password_confirmation')"
        class="fa fa-warning"></i>
        <input
        v-validate="'required|confirmed:password'"
        v-model.lazy="password_confirmation"
        :class="{'input': true, 'is-danger': errors.has('password_confirmation') }"
        name="password_confirmation"
        type="password">
        <span
        v-show="fields.password_confirmation && fields.password_confirmation.dirty && errors.has('password_confirmation')"
        class="help_is-danger"> {{ errors.first('password_confirmation') }}</span>
      </sui-form-field>-->
      <!--<sui-form-field>-->
        <!--<label>Passwort wiederholen*:</label>-->
        <!--<i-->
          <!--v-show="errors.has('password_confirmation')"-->
          <!--class="fa fa-warning"></i>-->
        <!--<input-->
          <!--v-validate="'required|confirmed:password'"-->
          <!--v-model="password_confirmation"-->
          <!--:class="{'input': true, 'is-danger': errors.has('password_confirmation') }"-->
          <!--name="password_confirmation"-->
          <!--type="password">-->
        <!--<span-->
          <!--v-show="fields.password_confirmation && fields.password_confirmation.dirty && errors.has('password_confirmation')"-->
          <!--class="help_is-danger"> {{ errors.first('password_confirmation') }}</span></sui-form-field>-->
      <sui-divider hidden/>
      <el-button
              type="primary"
              @click.prevent="resetForm"
              icon="el-icon-close">Reset</el-button>
      <el-button
        type="primary"
        @click.prevent="submitForm"
        icon="el-icon-arrow-right">Sign Up</el-button>
      <div style="margin: 20px;">
        <h5>Du bist bereits dabei? <a href="drops/auth/login">Log In</a></h5>
      </div>
  </div>
</template>

<script>
  import Password from 'vue-password-strength-meter'
  var axios = require('axios');


 export default {
   components: { Password},
   data () {
     // var checkName = (rule, value, callback) => {
     //   if (value === '') {
     //     callback(new Error('Please input the password again'));
     //   } else if (value !== this.ruleForm2.pass) {
     //     callback(new Error('Two inputs don\'t match!'));
     //   } else {
     //     callback();
     //   }
     // };


     // focused: null,
     //   email:'',
     //   firstname:'',
     //   lastname:'',
     //   phone:'',
     //   location:'',
     //   birthdate:'',
     //   //gender - sex
     //   gender:null,
     //   options:[{
     //   text: 'female',
     //   value: 'female',
     // }, {
     //   text: 'male',
     //   value: 'male',
     // }, {
     //   text: 'other',
     //   value: 'other',
     // }, {
     //   text: 'rather not say',
     //   value: 'rather not say',
     // }],
     //   password:null,


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
       },


       rules: {
         firstname: [
           {required: true, message: 'Please input a name', trigger: 'blur'},
           {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'}
         ], lastname: [
           {required: true, message: '', trigger: 'change'}
         ], mobile: [
           {type: 'date', required: true, message: '', trigger: 'change'}
         ], placeofresidence: [
           {type: 'date', required: true, message: '', trigger: 'change'}
         ], birthdate: [
           {type: 'array', required: true, message: '', trigger: 'change'}
         ], email: [
           {required: true, message: '', trigger: 'change'}
         ],
       }
     }
   },

   methods: {

     submitForm(SignUpForm) {
       this.$refs[SignUpForm].validate((valid) => {
         if (valid) {
           alert('submit!');
         } else {
           console.log('error submit!!');
           return false;
         }
       });
     },
     resetForm(SignUpForm) {
       this.$refs[SignUpForm].resetFields();
     },

     // validateBeforeSubmit() {
     //   this.$validator.localize('de');
     //   this.$validator.validateAll().then((result) => {
     //     if (result) {
     //       alert('Du hast dich erfolgreich registriert!');
     //
     //       const uri = 'http://localhost/drops/auth/signup';
     //
     //       axios.default.withCredentials= true;
     //       this.axios.post(uri, {
     //         'email' : this.email,
     //         'firstname' : this.firstname,
     //         'lastname' : this.lastname,
     //         'mobile' : this.phone,
     //         'location' : this.ruleForm.placeofresidence,
     //         'birthdate' : this.birthdate,
     //         'gender' : this.gender,
     //         'password' : this.password,
     //       }).then((response) => {
     //         console.log(response);
     //       }).catch((error) => {
     //         console.error(error);
     //       });
     //
     //       return;
     //     }
     //     alert('Alle mit "*" makierten Felder müssen ausgefüllt sein.');
     //   });
     // },

     showFeedback ({suggestions, warning}) {
       console.log('🙏', suggestions)
       console.log('⚠', warning)
     },
     showScore (score) {
       console.log('💯', score)
     },

   }

 };
</script>

<style scoped>
  /*@import "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.0/semantic.min.css";
*/


  el-form-item {
      float: left;
  }

  #gen_content {
      float: left;
      clear: both;
  }

  style {
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      padding: 0 15px;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
  }
</style>
