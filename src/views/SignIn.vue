<template>
  <div id="signin">
    <el-card class="box-card">
      <div
        slot="header"
        class="title">
        <font-awesome-icon
          icon="sign-in-alt"
          size="4x"/>
        <h2>{{ $t("signin.title") }}</h2>
      </div>
      <!-- <div class="description">
        {{ $t("signin.description") }}
      </div>-->
      <el-form
        :ref="signInForm"
        :model="signInForm"
        @keyup.enter.native="submitForm(signInForm)"
        :rules="rules">
        <el-form-item
          :label="$t('signin.label.email')"
          prop="email">
          <el-input
            v-model="signInForm.email"
            />
        </el-form-item>
        <el-form-item
          :label="$t('signin.label.password')"
          prop="password">
          <el-input
            v-model="signInForm.password"
            type="password"
            />
           </el-input>
        </el-form-item>
      </el-form>
      <el-checkbox
        v-model="signInForm.rememberMe">
        {{ $t('options.rememberme') }}
      </el-checkbox>
      <el-button
        class="buttonSignin"
        type="primary"
        icon="el-icon-arrow-right"
        @click.prevent="submitForm(signInForm)">
        {{ $t('options.signin') }}
      </el-button>
      <div class="text-body">
        <span>{{ $t('signin.notasupporti') }} <router-link to="signup">{{ $t('signin.notasupportiklick') }}</router-link></span><br />
        <span>{{ $t('signin.lostpw') }} <router-link :to="{ name: 'resetPasswordInstructions', params: { pool: 'default' }}">{{ $t('signin.lostpwklick') }}</router-link></span>
      </div>
    </el-card>
    <Freak
      message="Schon dabei?"></Freak>
  </div>
</template>

<script>

  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Freak from '@/components/Freak.vue'
  import {
    Button,
    Card,
    Checkbox,
    Form,
    FormItem,
    Notification,
    Input
  } from 'element-ui'

  Vue.use(VueAxios, axios);
  Vue.use(Button);
  Vue.use(Card);
  Vue.use(Checkbox);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Notification);
  Vue.use(Input);

  Notification.closeAll();

  export default {
    name: "SignIn",
    components: {Freak},

    data() {
      return {
        signInForm: {
          email: '',
          password: '',
          rememberMe: false
        },

        rules: {
              email: [
                  { required: true, message: this.$t('validationError.email'), trigger: 'blur' },
                  {
                      pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: this.$t('inputSample.email'), trigger: 'blur'
                  }
              ],
              password: [
                  { required: true, trigger: 'blur' }
              ]
          }
      }
    },
    methods: {
      submitForm(signInForm) {
        this.$refs[signInForm].validate((valid) => {
          if (valid) {
              var that = this;
              this.axios
                  .post('/drops/webapp/authenticate', this.signInForm)
                  .then(function (response)
                  {
                    switch (response.status)
                      {
                        case 200:
                            var path = window.atob(that.$route.params.redirectUrl);
                            window.location.reload();
                            break;
                      }
                  }).catch(function (error) {
                    switch (error.response.status) {
                        case 500:
                            that.open(that.$t('signin.error'), error.response.data.msg, "error");
                            break;
                        case 412:
                            that.$router.push({path: '/resetPasswordInstructions/pool'});
                            break;
                        case 401:
                            that.open(that.$t('signin.error'), error.response.data.msg, "error");
                    }
                  }).finally(() => this.loading = false)
          }
        });
      },
      open(title, message, type) {
        Notification({
          title:  title,
          message: message,
          type: type
        });
      }
    },  
    beforeCreate () {
      var that = this;
      this.axios
        .get('/drops/webapp/identity')
        .then(function (response) {
           if (response.status == 200) {
              var path = window.atob(that.$route.params.redirectUrl);
              window.location.replace(path);
           }
         })
         .catch(function (error) {
            switch (error.response.status) {
               case 500:
                 that.open(that.$t('signin.error'), error.response.data.msg, "error");
                         break;
             }
         })
         .finally(() => this.loading = false)
    }
  }
</script>
<style scoped>
  .buttonSignin {
    margin-top:1em;
    margin-bottom:1em;
    width: 100%;
    /*padding-top: 0.6em;*/
  }

  .box-card {
    width: 35%;
    margin: 0 auto;
    margin-top: 10%;
  }

  #signin {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  /*  background-repeat: repeat;
    background: -webkit-linear-gradient(70deg, #ff6464 40%, #5ac8fa 40%);
    background: -o-linear-gradient(70deg, #ff6464 40%, #5ac8fa 40%);
    background: -moz-linear-gradient(70deg, #ff6464 40%, #5ac8fa 40%);
    background: linear-gradient(70deg, #ff6464 40%, #5ac8fa 40%);
  */
  }

  .title {
    width: 50%;
    margin: 0 auto;
    text-align: center;
  }
  .content {
    font-size: 16px;
  }
  .list {
    font-size: 13px;
  }

</style>
