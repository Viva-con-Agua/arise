<template>
  <VcAFrame>
    <VcAColumn>
      <VcABox :first="true" :title="$t('reset.Email.title')">
        <el-form
          :model="resetFormEmail"
          :ref="resetFormEmail"
          :rules="rules"
          status-icon>
          <el-form-item
            :label="$t('reset.label.newEmail')"
            prop="password">
            <div id="pw">
              <el-input
                v-model="resetFormEmail.email"
                type="email"/>
            </div>
          </el-form-item>
          <el-form-item
            :label="$t('reset.label.checkEmail')"
            prop="checkPass">
            <el-input
              v-model="resetFormEmail.checkEmail"
              type="email"/>
          </el-form-item>
        </el-form>
        <button
                ref="resetIt"
                class="vca-button-primary vca-full-width"
                @click.prevent="submitForm(resetFormPassword)"
                @keyup.enter="submitForm(resetFormPassword)">
          {{ $t('options.resetIt') }}
        </button>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>

<script>
  import Vue from 'vue'
  import Password from 'vue-password-strength-meter';
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import VcAFrame from '@/components/page/VcAFrame.vue';
  import VcAColumn from '@/components/page/VcAColumn.vue';
  import VcABox from '@/components/page/VcABox.vue';
  import {
    Button,
    Form,
    FormItem,
    Notification,
    Input
  } from 'element-ui'


  Vue.use(VueAxios, axios);
  Vue.use(Button);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Notification);
  Vue.use(Input);

  Notification.closeAll();

  export default {
        name: "ResetPassword",
        components: { Password, VcAFrame, VcAColumn, VcABox },

        data() {
            var checkPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('signup.error.email.empty')));
                } else if (value !== this.resetFormPassword.password) {
                    callback(new Error(this.$t('signup.error.email.unequal')));
                } else {
                    callback();
                }
            };

            return {
              resetFormEmail: {
                email: '',
                checkEmail: ''
              },
              suggestions: [],

              rules: {
                email: [
                    { required: true, message: this.$t('validationError.checkPass'), trigger: 'blur' }
                ],
                checkEmail: [
                    { required: true, validator: checkPass, trigger: 'blur' }
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
                        duration: 3000
                    });
                }
            },
            disableButton() {
                this.$refs.resetIt.disabled = true
            },
          submitForm(resetFormEmail) {
            var that = this;
            this.$refs[resetFormEmail].validate((valid) => {
              if(valid) {
                this.axios
                  .post('/drops/webapp/email/reset/' + this.$route.params.token, {
                    password1: that.resetFormEmail.email,
                    password2: that.resetFormEmail.checkEmail
                  })
                  .then(function(response) {
                      that.disableButton()
                      that.messageOpen(that.$t('reset.EmailDone.title'), that.$t('reset.EmailDone.description'), 'success')
                      setTimeout( () => that.$router.push({path: '/signin'}), 3000);
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
          resetForm(resetFormEmail) {
            this.$refs[resetFormEmail].resetFields();
          },
          showFeedback ({suggestions, warning}) {
              this.suggestions = suggestions;
          },
          showScore (score) {
            // console.log('💯', score);
          },
        }
    }
</script>
<style scoped>
  .vca-full-width {
    margin-top:1em;
    margin-bottom:1em;
    width: 100%;
  }

  .list {
    font-size: 13px;
  }
  .suggestions {
    font-size: small;
    color: #c0c4cc;
  }

</style>
