<template>
  <div class="changePassword">
    <el-card class="box-card">
      <div
        slot="header"
        class="title">
        <h2>{{ $t("changePassword.title") }}</h2>
        <h4>{{ $t("changePassword.description") }}</h4>
      </div>
      <span>{{ $t('changePassword.label.oldPassword')}}</span>
      <el-input
        v-model="oldPassword"
        type="password"/>
      <el-form
        :model="ChangePasswordForm"
        :ref="ChangePasswordForm"
        :rules="rules">
        <el-form-item
          :label="$t('changePassword.label.newPassword')"
          prop="newPassword">
          <password
            v-model="ChangePasswordForm.newPassword"
            :toggle="true"
            class="input"
            default-class="el-input__inner"
            @feedback="showFeedback"/>
          <span> {{ showFeedback.suggestions }}</span>
        </el-form-item>
        <el-form-item
          :label="$t('changePassword.label.checkNewPassword')"
          prop="checkNewPassword">
          <el-input
            v-model="ChangePasswordForm.checkNewPassword"
            type="password"/>
        </el-form-item>
      </el-form>
      <el-button
        class="buttonChangePassword"
        type="primary"
        icon="el-icon-arrow-right"
        @click.prevent="submitForm(ChangePasswordForm)">{{ $t('options.submit') }}</el-button>
      <el-button
        type="text"
        icon="el-icon-close"
        @click.prevent><router-link to="Profile">{{ $t('options.back') }}</router-link></el-button>
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
    Input,
  } from 'element-ui'

  Vue.use(VueAxios, axios);
  Vue.use(Button);
  Vue.use(Card);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Input);

  export default {
    name: "ChangePassword",
    components: {Password},

    data () {
      var checkPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'));
        } else if (value !== this.ChangePasswordForm.newPassword) {
          callback(new Error('Two inputs don\'t match!'));
        } else {
          callback();
        }
      };

      return {
        oldPassword: '',

        ChangePasswordForm: {
          newPassword: '',
          checkNewPassword: '',
        },

        rules: {
          oldPassword: [
            { required: true, trigger: 'blur' }
          ],
          checkNewPassword: [
            { required: true, validator: checkPass, message: this.$t('validationError.checkPass'), trigger: 'blur' }
          ]
        }
      }

    },



    methods: {
      submitForm(resetFormEMail) {
        this.$refs[resetFormEMail].validate((valid) => {
          if (valid) {
            var that = this;
            this.axios
              .post('http://localhost/drops/', {
                address: that.resetFormEMail.email,
              })
              .then(function (response) {
              })
              .catch(function (error) {
                switch (error.response.status) {
                  case 401:

                    break;
                  case 404:

                    break;
                }
              })
              .finally(() => this.loading = false)
          }
        });
      },
      showFeedback ({suggestions, warning}) {
        console.log('🙏', suggestions)
        console.log('⚠', warning)
      },
      showScore (score) {
        console.log('💯', score)
      }
    }
  }
</script>

<style scoped>
  .buttonChangePassword {
    width: 70%;
    padding-top: 2%;
  }

  .changePassword {
    max-width: 40%;
    margin: 0 auto;
    padding-top: 10%;
  }
</style>