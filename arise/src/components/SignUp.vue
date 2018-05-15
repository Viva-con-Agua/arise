<template>
  <div id="signupform">
    <sui-divider hidden/>
    <sui-divider horizontal>
      SIGN UP</sui-divider>
    <sui-form @submit.prevent="validateBeforeSubmit">
      <sui-form-field>
        <label>e-mail Adresse:</label>
        <input
          v-validate="'required|email'"
          v-model="email"
          :class="{'input': true, 'is-danger': errors.has('email') }"
          name="email"
          type="text"
          placeholder="freak@vivaconagua.org">
        <i
          v-show="errors.has('email')"
          class="fa fa-warning"></i>
        <span
          v-show="fields.email && fields.email.dirty && errors.has('email')"
          class="help_is-danger"> {{ errors.first('email') }}</span></sui-form-field>
      <sui-form-field>
        <label>Vorname:</label>
        <input
          v-validate="'required|alpha'"
          v-model="firstname"
          :class="{'input': true, 'is-danger': errors.has('firstname') }"
          name="firstname"
          type="text"
          placeholder="Vorname">
        <i
          v-show="errors.has('firstname')"
          class="fa fa-warning"></i>
        <span
          v-show="fields.firstname && fields.firstname.dirty && errors.has('firstname')"
          class="help_is-danger"> {{ errors.first('firstname') }}</span></sui-form-field>
      <sui-form-field>
        <label>Nachname:</label>
        <input
          v-validate="'required|alpha'"
          v-model="lastname"
          :class="{'input': true, 'is-danger': errors.has('lastname') }"
          name="lastname"
          type="text"
          placeholder="Nachname">
        <i
          v-show="errors.has('lastname')"
          class="fa fa-warning"></i>
        <span
          v-show="fields.lastname && fields.lastname.dirty && errors.has('lastname')"
          class="help_is-danger"> {{ errors.first('lastname') }}</span></sui-form-field>
      <sui-form-field>
        <label>Handynummer:</label>
        <input
          v-validate="'required'"
          v-model="phone"
          :class="{'input': true, 'is-danger': errors.has('phone') }"
          name="phone"
          type="text">
        <i
          v-show="errors.has('phone')"
          class="fa fa-warning"></i>
        <span
          v-show="fields.phone && fields.phone.dirty && errors.has('phone')"
          class="help_is-danger"> {{ errors.first('phone') }}</span></sui-form-field>
      <sui-form-field>
        <label>Wohnort:</label>
        <input
          v-validate="'required|alpha_spaces'"
          v-model="location"
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
          v-validate="'required'"
          v-model="birthdate"
          :class="{'input': true, 'is-danger': errors.has('birthdate') }"
          name="birthdate"
          placeholder=" 15.05.1910">
        <i
          v-show="errors.has('birthdate')"
          class="fa fa-warning"></i>
        <span
          v-show="fields.birthdate && fields.birthdate.dirty && errors.has('birthdate')"
          class="help_is-danger"> {{ errors.first('birthdate') }}</span></sui-form-field>
      <sui-form-field>
        <label>Gender:</label>
        <sui-dropdown
          v-model="gender"
          :options="options"
          placeholder="Gender"
          selection></sui-dropdown></sui-form-field>
      <sui-form-field>
        <label>Passwort:</label>
        <i
          v-show="errors.has('password')"
          class="fa fa-warning"></i>
        <input
          v-validate="'required'"
          v-model="password"
          :class="{'input': true, 'is-danger': errors.has('password') }"
          name="password"
          type="password"></sui-form-field>
      <sui-form-field>
        <label>Passwort wiederholen:</label>
        <i
          v-show="errors.has('password_confirmation')"
          class="fa fa-warning"></i>
        <input
          v-validate="'required|confirmed:password'"
          v-model="password_confirmation"
          :class="{'input': true, 'is-danger': errors.has('password_confirmation') }"
          name="password_confirmation"
          type="password"
        >
        <span
          v-show="fields.password_confirmation && fields.password_confirmation.dirty && errors.has('password_confirmation')"
          class="help_is-danger"> {{ errors.first('password_confirmation') }}</span></sui-form-field>
      <sui-divider hidden/>
      <button
        class="ui blue submit button"
        type="submit">Sign Up</button>
      <sui-divider horizontal>OR</sui-divider>
    <h6>Du bist bereits dabei? <a href="drops/auth/login">Log In</a></h6></sui-form>
  </div>
</template>

<script>
  var axios = require('axios');

 export default {
   name: "SignUp",
   components: {},
   data:() => ({
     email: '',
     firstname:'',
     lastname:'',
     phone:'',
     location:'',
     birthdate:'',
     //gender - sex
     gender: null,
     options: [{
       text: 'female',
       value: 'female',
     }, {
       text: 'male',
       value: 'male',
     }, {
       text: 'other',
       value: 'other',
     }],
     password:'',
   }),
   methods: {
     validateBeforeSubmit() {
       this.$validator.validateAll().then((result) => {
         if (result) {
           alert('Du hast dich erfolgreich registriert!');

           const uri = 'http://localhost:3000/test';

           axios.default.withCredentials= true;
           this.axios.post(uri, {
             'email' : this.email,
             'firstname' : this.firstname,
             'lastname' : this.lastname,
             'mobile' : this.phone,
             'location' : this.location,
             'birthdate' : this.birthdate,
             'gender' : this.gender,
           }).then((response) => {
             console.log(response);
           }).catch((error) => {
             console.error(error);
           });

           return;
         }
         alert('Bitte korriegiere deine Eingaben!');
       });
     },

   }

 };
</script>

<style scoped>
  @import "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.0/semantic.min.css";

  #signupform {
    padding-left: 25%;
    padding-right: 25%;
    text-align: left;
  }

  .help_is-danger {
    font-size: x-small;
    color: red;
  }

</style>
