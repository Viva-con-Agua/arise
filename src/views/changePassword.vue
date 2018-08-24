<template>
  <el-card class="box-card">
    <div
      slot="header"
      class="title">
      <h2>{{ $t("changePassword.title") }}</h2>
    </div>
    <el-input
      v-model="oldPassword"
      type="password"/>
    <el-form
      :model="ChangePasswordForm"
      :ref="ChangePasswordForm"
      :rules="rules">
      <el-form-item
        :label="$t('changePassword.newPassword')"
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
        :label="$t('changePassword.checkNewPassword')"
        prop="checkNewPassword">
        <el-input
          v-model="ChangePasswordForm.checkNewPassword"
          type="password"/>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      icon="el-icon-arrow-right"
      @click.prevent="submitForm(ChangePasswordForm)">{{ $t('changePassword.submit') }}</el-button>
  </el-card>
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
    oldPassword: '',
    ChangePasswordForm: {
      newPassword: '',
      checkNewPassword: '',
    },

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

      };
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
    }
  }
</script>

<style scoped>

</style>