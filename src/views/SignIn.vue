<template>
  <div id="signin">
    <el-card class="box-card">
<!--      <span v-show="show">
        <el-alert
          :title="errormessage"
          type="error"
          show-icon/>
      </span>-->
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
            type="password"
            @keyup.enter="submitForm(signInForm)"/>
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
        @click.prevent="submitForm(signInForm)"
        @keyup.enter="submitForm(signInForm)">{{ $t('options.signin') }}</el-button>
      <div style="margin: 20px;">
        <h5>{{ $t('signin.notasupporti') }} <router-link to="signup">{{ $t('signin.notasupportiklick') }}</router-link></h5>
        <h5>{{ $t('signin.lostpw') }} <router-link :to="{ name: 'resetPasswordInstructions', params: { pool: p=2 }}">{{ $t('signin.lostpwklick') }}</router-link></h5>
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
    Message,
    Input
  } from 'element-ui'

  Vue.use(VueAxios, axios);
  Vue.use(Button);
  Vue.use(Card);
  Vue.use(Checkbox);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Message);
  Vue.use(Input);

  export default {
    name: "SignIn",
    components: {Freak},

    data() {
      return {
        show: false,
        errormessage: "fail",

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
                  .post('http://localhost:3000/drops/webapp/authenticate', this.signInForm)
                  .then(function (response)
                  {
                      switch (response.status)
                      {
                        case 200:
                            that.$router.push({path: '/'});
                            break;
                      }
                  }).catch(function (error) {
                    switch (error.response.status) {
                        case 500:
                            that.errormessage = error.response.data.msg;
                            that.open();
                            break;
                        case 412:
                            that.$router.push({path: '/resetPasswordInstructions?pool=1'});
                            break;
                        case 401:
                            that.errormessage = error.response.data.msg;
                            that.open();
                    }
                  }).finally(() => this.loading = false)
          }
        });
      },



      open() {
        this.$message({
          message: this.errormessage,
          type: 'error'
        });
      }

    }
  }
</script>
<style scoped>
  .buttonSignin {
    width: 100%;
    padding-top: 2%;
  }

  .box-card {
    max-width: 30%;
    margin: 0 auto;
    margin-bottom: 15%;
  }

  #signin {
    padding-top: 10%;
    width: 100%;
    height: 100%;
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