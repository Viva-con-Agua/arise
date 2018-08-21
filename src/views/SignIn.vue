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
        :rules="rules">
        <el-form-item
          :label="$t('signin.label.email')"
          prop="email">
          <el-input
            v-model="signInForm.email"/>
        </el-form-item>
        <el-form-item
          :label="$t('signin.label.password')"
          prop="password">
          <el-input
            v-model="signInForm.password"
            type="password"/>
        </el-form-item>
      </el-form>
      <el-checkbox
        v-model="signInForm.rememberMe">
        {{ $t('options.rememberme') }}
      </el-checkbox>
      <el-button
        type="primary"
        icon="el-icon-arrow-right"
        @click.prevent="submitForm(signInForm)">{{ $t('options.signin') }}</el-button>
      <div style="margin: 20px;">
        <h5>{{ $t('options.notamember') }} <a href="drops/auth/login">{{ $t('options.notamemberklick') }}</a></h5>
        <h5>{{ $t('options.lostpw') }} <a href="drops/auth/login">{{ $t('options.lostpwklick') }}</a></h5>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import {
    Button,
    Card,
    Checkbox,
    Form,
    FormItem,
    Input
  } from 'element-ui'

  Vue.use(VueAxios, axios);
  Vue.use(Button);
  Vue.use(Card);
  Vue.use(Checkbox);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Input);

  export default {
    name: "SignIn",

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
                      message: this.$t('inputSample.email')
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
                  .post('http://localhost/drops/webapp/authenticate', this.signInForm)
                  .then(function (response)
                  {
                      console.log(response);
                      var status = console.log(response.status)
                      switch (status)
                      {
                          case "200":
                          case "":
                      }
                      that.$router.push({path: '/resetPasswordDone'});

                  })
                  .catch(error => {
                  console.log(error)
                  this.errored = true
          })
          .finally(() => this.loading = false)
            //this.$router.push({path: '/resetPasswordDone'});
          }
        });
      },
    }
  }
</script>
<style scoped>
  .box-card {
    max-width: 30%;
    margin: 0 auto;
    margin-bottom: 15%;
  }

  #signin {
    padding-top: 10%;
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    background: -webkit-linear-gradient(70deg, #ff6464 40%, #5ac8fa 40%);
    background: -o-linear-gradient(70deg, #ff6464 40%, #5ac8fa 40%);
    background: -moz-linear-gradient(70deg, #ff6464 40%, #5ac8fa 40%);
    background: linear-gradient(70deg, #ff6464 40%, #5ac8fa 40%);
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