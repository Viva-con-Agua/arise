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
              label="Firstname:"
              prop="firstname">
        <el-input
                v-model="signUpForm.firstname">
        </el-input>
      </el-form-item>
      <el-form-item
              label="Lastname:"
              prop="lastname">
        <el-input
                v-model="signUpForm.lastname">
        </el-input>
      </el-form-item>
      <el-form-item
              label="Mobile:"
              prop="mobile">
        <el-input
                v-model="signUpForm.mobile">
        </el-input>
      </el-form-item>
      <el-form-item
              label="Wohnort:"
              prop="placeofresidence">
        <el-input
                v-model="signUpForm.placeofresidence">
        </el-input>
      </el-form-item>
      <el-form-item
              label="Geburtsdatum:" required>
        <el-date-picker
                v-model="signUpForm.birthdate"
                type="date"
                placeholder="Wann wurdest du geboren?"
                style="width: 100%;">
        </el-date-picker>
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
                v-model="signUpForm.email">
        </el-input>
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
        <el-form-item
            label="Confirm:"
            prop="checkPass">
            <el-input
                v-model="signUpForm.checkPass">
            </el-input>
        </el-form-item>
    </el-form>


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
           {required: true, message: 'Please input your firstname', trigger: 'blur',},
             {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: 'Your firstname should be like mine: Frederik', trigger: 'blur'}
         ], lastname: [
           {required: true, message: 'Please input your lastname', trigger: 'change'},
               {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: 'Your lastname is unvalid.', trigger: 'blur'}
           ], mobile: [
           {required: true, message: 'Please input phone', trigger: 'blur'},
               {pattern:/^(?=.*[0\+])(?=.*[0-9]{4})(?=.*[-/\\s])(?=.*([0-9]{4,}))(?=.*[-/\\s])(?=.*[0-9]{4,})/, message:'Your mobile number should look like this: +49-1234-56783', trigger: 'blur'}
           ], placeofresidence: [
           {required: true, message: 'Please input your place of resisdence', trigger: 'blur'},
               {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: 'Choose your city, like mine: Berlin', trigger: 'blur'}
         ], birthdate: [
           {type: 'date', required: true, message: 'looks like, you dont know when you was born...', trigger: 'change'}
         ], email: [
           {required: true, message: 'Please input your e-mail address', trigger: 'blur'},
               {pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Is this realy your address? It should look like: freak@vivaconagua.org' }
         ], checkPass: [
               { required: true, validator: checkPass, trigger: 'blur' }
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
