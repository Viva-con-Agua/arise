<template>
  <div id="resetPassword">
    <el-steps
      :active="2">
      <el-step 
        :title="$t('reset.steps.title.1')" 
        :description="$t('reset.steps.description.1')"/>
      <el-step 
        :title="$t('reset.steps.title.2')" 
        :description="$t('reset.steps.description.2')"/>
      <el-step 
        :title="$t('reset.steps.title.3')" 
        :description="$t('reset.steps.description.3')"/>
    </el-steps>
    <el-card class="box-card">
      <div 
        slot="header" 
        class="title">
        <font-awesome-icon 
          icon="lock-open" 
          size="4x"/>
        <h2>{{ $t("reset.Password.title") }}</h2>
      </div>
     <!-- <div class="description">
        {{ $t("reset.Password.description") }}
        <div class="list">
          <dl>
            <dt>{{ $t('reset.Password.thingstoinclude.title') }}</dt>
            <dd>{{ $t('reset.Password.thingstoinclude.1') }}</dd>
            <dd>{{ $t('reset.Password.thingstoinclude.2') }}</dd>
            <dt>{{ $t('reset.Password.thingstoavoid.title') }}</dt>
            <dd>{{ $t('reset.Password.thingstoavoid.1') }}</dd>
            <dd>{{ $t('reset.Password.thingstoavoid.2') }}</dd>
            <dd>{{ $t('reset.Password.thingstoavoid.3') }}</dd>
          </dl>
        </div>
      </div>-->
      <el-form
        :model="resetFormPassword"
        :ref="resetFormPassword"
        :rules="rules"
        status-icon>
        <el-form-item
          :label="$t('reset.label.password')"
          prop="password">
          <div id="pw">
            <password
              v-model="resetFormPassword.password"
              :toggle="true"
              class="input"
              default-class="el-input__inner"
              @feedback="showFeedback"/>
          </div>
          <span class="suggestions">{{ this.suggestions[0] }}</span>
        </el-form-item>
        <el-form-item
          :label="$t('reset.label.checkPassword')"
          prop="checkPass">
          <el-input
            v-model="resetFormPassword.checkPass"
            type="password"/>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        icon="el-icon-arrow-right"
        @click.prevent="submitForm(resetFormPassword)">{{ $t('options.resetIt') }}</el-button>
    </el-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Password from 'vue-password-strength-meter';
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import {
    Button,
    Card,
    Form,
    FormItem,
    Notification,
    Step,
    Steps,
    Input
  } from 'element-ui'


  Vue.use(VueAxios, axios);
  Vue.use(Button);
  Vue.use(Card);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Notification);
  Vue.use(Step);
  Vue.use(Steps);
  Vue.use(Input);

  Notification.closeAll();

  export default {
        name: "ResetPassword",
        components: {Password},

        data() {
          var checkPass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('Please input the password again'));
            } else if (value !== this.resetFormPassword.password) {
              callback(new Error('Two inputs don\'t match!'));
            } else {
              callback();
            }
          };

            return {
              resetFormPassword: {
                password: '',
                checkPass: ''
              },
              suggestions: [""],

              rules: {
                password: [
                  { required: true, trigger: 'blur'}
                ],
                checkPass: [
                  { required: true, validator: checkPass, message: this.$t('validationError.checkPass'), trigger: 'blur' }
                ]
              }
            }
        },
        methods: {
            messageOpen(title, message, type) {
                if(typeof title !== 'undefined' && typeof message !== 'undefined' && typeof type !== 'undefined') {
                    Notification({
                        title: title,
                        message: message,
                        type: type,
                        duration: 6000
                    });
                }
            },
          submitForm(resetFormPassword) {
            var that = this;
            this.$refs[resetFormPassword].validate((valid) => {
              if(valid) {
                this.axios
                  .post('http://localhost/drops/webapp/reset/' + this.$route.params.token, {
                    password1: that.resetFormPassword.password,
                    password2: that.resetFormPassword.checkPass
                  })
                  .then(function(response) {
                      this.$router.push({path: '/resetPasswordDone'});
                  })
                  .catch(function(error) {
                    switch (error.response.status) {
                      case 401:
                        that.messageOpen(that.$t('reset.PasswordInstructions.errorResponse'), error.response.data.msg, "error");
                        break;
                      case 404:
                        that.messageOpen(that.$t('reset.PasswordInstructions.errorResponse'), error.response.data.msg, "error");
                        break;
                    }
                  })
                  .finally(() => this.loading = false);
              }
            });
          },
          resetForm(resetFormPassword) {
            this.$refs[resetFormPassword].resetFields();
          },

          showFeedback ({suggestions, warning}) {
            this.suggestions = suggestions;
            // console.log('🙏', suggestions);
            // console.log('⚠', warning);
          },
          showScore (score) {
            // console.log('💯', score);
          },
        }
    }
</script>
<style scoped>
  #resetPassword {
    max-width: 50%;
    padding-top: 15%;
    margin: 0 auto;
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
  .suggestions {
    font-size: small;
    color: #c0c4cc;
  }

</style>