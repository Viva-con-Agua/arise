<template>
  <div id="signupform">
    <sui-divider hidden/>
    <sui-divider horizontal>
      Person</sui-divider>

    <el-form
            :model="signUpForm"
            :rules="rules"
            ref="SignUpForm"
            class="signUpForm"
            status-icon>
      <el-form-item
              v-bind:label="$t('signup.label.firstname')"
              prop="firstname">
        <el-input
                v-model="signUpForm.firstname">
        </el-input>
      </el-form-item>
      <el-form-item
              v-bind:label="$t('signup.label.lastname')"
              prop="lastname">
        <el-input
                v-model="signUpForm.lastname">
        </el-input>
      </el-form-item>
      <el-form-item
              v-bind:label="$t('signup.label.mobile')"
              prop="mobile">
        <el-input
                v-model="signUpForm.mobile">
        </el-input>
      </el-form-item>
      <el-form-item
              v-bind:label="$t('signup.label.placeofresidence')"
              prop="placeofresidence">
        <el-input
                v-model="signUpForm.placeofresidence">
        </el-input>
      </el-form-item>
      <el-form-item
              v-bind:label="$t('signup.label.birthdate')"
              required>
        <el-date-picker
                v-model="signUpForm.birthdate"
                type="date"
                v-bind:placeholder="$t('signup.label.birthdateinfo')"
                style="width: 100%;">
        </el-date-picker>
      </el-form-item>
      <el-form-item
              v-bind:label="$t('signup.label.gender')"
            prop="gender">
        <div id="gen_content">
        <el-radio-group
                v-model="signUpForm.gender"
                size="small">
          <el-radio-button
                  label="female">{{ $t('gender.female') }}</el-radio-button>
          <el-radio-button
                  label="male">{{ $t('gender.male') }}</el-radio-button>
          <el-radio-button
                  label="other">{{ $t('gender.other') }}</el-radio-button>
          <el-radio-button
                  label="prefer not to say">{{ $t('gender.prefernottosay') }}</el-radio-button>
        </el-radio-group></div>
      </el-form-item>
      <sui-divider horizontal>
        Account</sui-divider>
      <el-form-item
              v-bind:label="$t('signup.label.email')"
              prop="email">
        <el-input
                v-model="signUpForm.email">
        </el-input>
      </el-form-item>
      <el-form-item
              v-bind:label="$t('signup.label.password')"
              prop="password">
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
      </el-form-item>
       <el-form-item
            v-bind:label="$t('signup.label.confirmPassword')"
            prop="checkPass">
            <el-input
                v-model="signUpForm.checkPass">
            </el-input>
        </el-form-item>
    </el-form>


      <sui-divider hidden/>
      <el-button
              type="text"
              @click.prevent="resetForm"
              icon="el-icon-close">{{ $t('options.reset') }}</el-button>
      <el-button
        type="primary"
        @click.prevent="submitForm"
        icon="el-icon-arrow-right">{{ $t('options.signup') }}</el-button>
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
       var checkPass = (rule, value, callback) => {
           if (value === '') {
               callback(new Error('Please input the password again'));
           } else if (value !== this.signUpForm.password) {
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
         checkPass: '',
       },


       rules: {
         firstname: [
           {required: true, message: this.$t('validationError.firstname'), trigger: 'blur',},
             {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.firstname'), trigger: 'blur'}
         ], lastname: [
           {required: true, message: this.$t('validationError.lastname'), trigger: 'change'},
               {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.lastname'), trigger: 'blur'}
           ], mobile: [
           {required: true, message: this.$t('validationError.mobile'), trigger: 'blur'},
               {pattern:/^(?=.*[0\+])(?=.*[0-9]{4})(?=.*[-/\\s])(?=.*([0-9]{4,}))(?=.*[-/\\s])(?=.*[0-9]{4,})/, message: this.$t('inputSample.mobile'), trigger: 'blur'}
           ], placeofresidence: [
           {required: true, message: this.$t('validationError.placeofresidence'), trigger: 'blur'},
               {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.placeofresidence'), trigger: 'blur'}
         ], birthdate: [
           {type: 'date', required: true, message: this.$t('validationError.birthdate'), trigger: 'change'}
         ], email: [
           {required: true, message: this.$t('validationError.email'), trigger: 'blur'},
               {pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: this.$t('inputSample.email') }
         ], checkPass: [
               { required: true, validator: checkPass, message: this.$t('validationError.checkPass'), trigger: 'blur' }
           ]
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
