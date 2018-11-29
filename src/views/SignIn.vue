<template>
  <div id="signin">
    <VcAFrame>
      <VcAColumn>
        <VcABox :title="$t('signin.title')">
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
                      autoComplete="on"
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
          <button
                  class="vca-button-primary buttonSignin"
                  @click.prevent="submitForm(signInForm)">
            {{ $t('options.signin') }}
          </button>
          <div class="text-body">
            <span>{{ $t('signin.notasupporti') }} <router-link :to="{name: 'SignUp'}">{{ $t('signin.notasupportiklick') }}</router-link></span><br />
            <span>{{ $t('signin.lostpw') }} <router-link :to="{ name: 'resetPasswordInstructions', params: { pool: 'default' }}">{{ $t('signin.lostpwklick') }}</router-link></span>
          </div>
        </VcABox>
      </VcAColumn>
    </VcAFrame>
    <Freak :message="$t('freak.signin')" />
  </div>
</template>

<script>

  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Freak from '@/components/Freak.vue'
  import VcAFrame from '@/components/page/VcAFrame.vue';
  import VcAColumn from '@/components/page/VcAColumn.vue';
  import VcABox from '@/components/page/VcABox.vue';
  import {
    Button,
    Checkbox,
    Form,
    FormItem,
    Notification,
    Input
  } from 'element-ui'

  Vue.use(VueAxios, axios);
  Vue.use(Button);
  Vue.use(Checkbox);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Notification);
  Vue.use(Input);

  Notification.closeAll();

  export default {
    name: "SignIn",
    components: {Freak, VcAFrame, VcAColumn, VcABox},

    data() {
      return {
        signInForm: {
          email: '',
          password: '',
          rememberMe: false
        },

        rules: {
              email: [
                  {
                      required: true,
                      message: this.$t('validationError.email'),
                      trigger: 'blur'
                  },
                  {
                      pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: this.$t('inputSample.email'),
                      trigger: 'blur'
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
  }

  #signin {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .freak {
    left: 1em;
    width: 10%;
  }

</style>
