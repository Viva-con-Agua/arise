<template>
  <div id="signin">
    <h1> hallo habibi tobi </h1>
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
        :model="signin"
        :rules="rules">
        <el-form-item
          :label="$t('signin.label.email')"
          prop="email">
          <el-input
            v-model="signinForm.email"/>
        </el-form-item>
        <el-form-item
          :label="$t('signin.label.password')"
          prop="password">
          <el-input
            v-model="signinForm.password"
            type="password"/>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        icon="el-icon-arrow-right"
        @click.prevent="submitForm">{{ $t('options.signin') }}</el-button>
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
    Form,
    FormItem,
    Input
  } from 'element-ui'

  Vue.use(VueAxios, axios);
  Vue.use(Button);
  Vue.use(Card);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Input);

  export default {
    name: "SignIn",

    data() {

      return {
        rules: {
          email: [
            { required: true, trigger: 'blur'}
          ],
          password: [
            { required: true, trigger: 'blur' }
          ]
        },

        signinForm: {
          email: '',
          password: ''
        },
      }
    },
    methods: {
      submitForm(resetFormPassword) {
        this.$refs[resetFormPassword].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.$router.push({path: '/resetPasswordDone'});
          } else {
            console.log('error submit!!');
            return false;
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