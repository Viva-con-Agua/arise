<template>
  <sui-form>
    <div id="loginform">
      <sui-divider hidden/>
      <sui-divider horizontal>
        <i
          class="sign in icon"/>
        SIGN IN</sui-divider>
      <div class="field">
        <label>e-mail:</label>
        <div class="ui left icon input">
          <input
            v-validate="required"
            v-model="email"
            :class="{'input': true, 'is-danger': errors.has('email') }"
            type="text"
            placeholder="freak@vivaconagua.org"
            autocomplete="off">
          <i class="user icon"/>
        </div>
      </div>
      <sui-divider hidden/>
      <div class="field">
        <label>password:</label>
        <div class="ui left icon input">
          <input
            type="password"
            autocomplete="off"
          >
          <i class="lock icon"/>
        </div>
      </div>
      <sui-divider hidden/>
      <sui-checkbox
        v-model="vremember"
        label="remember me"
        toggle/>
      <sui-divider hidden/>
      <div class="ui blue submit button">login</div>
      <sui-divider horizontal>OR</sui-divider>
      <h6>Du hast noch keinen Account? Du kannst jederzeit <a href="drops/auth/signup">Mitmachen</a>.</h6>
      <h6>Passwort vergessen? Das kannst <a href="drops/auth/reset">hier</a> neu setzen.</h6>
    </div>
  </sui-form>

</template>

<script>
   export default {
      name: "Login",
      components: {}
    }
</script>

<style scoped>
    @import "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.0/semantic.min.css";

    #loginform {
      padding-left: 25%;
      padding-right: 25%;
      text-align: left;
    }

    .help_is-danger {
      font-size: x-small;
      color: red;
    }

</style>
