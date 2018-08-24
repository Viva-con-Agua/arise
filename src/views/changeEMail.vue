<template>
  <div class="changeEMail">
    <el-card class="box-card">
      <div
        slot="header"
        class="title">
        <h2>{{ $t("changeEMail.title") }}</h2>
        <h4>{{ $t("changeEMail.description") }}</h4>
      </div>
      <span>{{ $t('changeEMail.label.oldEMail') }}</span>
      <el-input
        v-model="oldEMail"/>
      <el-form
        :model="ChangeEMailForm"
        :ref="ChangeEMailForm"
        :rules="rules">
        <el-form-item
          :label="$t('changeEMail.label.newEMail')"
          prop="newEMail">
          <el-input
            v-model="ChangeEMailForm.newEMail"/>
        </el-form-item>
        <el-form-item
          :label="$t('changeEMail.label.checkNewEMail')"
          prop="checkNewEMail">
          <el-input
            v-model="ChangeEMailForm.checkNewEMail"/>
        </el-form-item>
      </el-form>
      <el-button
        class="buttonChangeEMail"
        type="primary"
        icon="el-icon-arrow-right"
        @click.prevent="submitForm(ChangeEMailForm)">{{ $t('changeEMail.submit') }}</el-button>
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
      var checkEMail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'));
        } else if (value !== this.ChangeEMailForm.newEMail) {
          callback(new Error('Two inputs don\'t match!'));
        } else {
          callback();
        }
      };

      return {
        oldEMail: '',

        ChangeEMailForm: {
          newEMail: '',
          checkNewEMail: '',
        },

        rules: {
          oldEMail: [
            { required: true, trigger: 'blur' }
          ],
          checkNewEMail: [
            { required: true, validator: checkEMail, message: this.$t('validationError.checkEMail'), trigger: 'blur' }
          ]
        }
      }

    },



    methods: {
      submitForm(ChangeEMailForm) {
        this.$refs[ChangeEMailForm].validate((valid) => {
          if (valid) {
            var that = this;
            this.axios
              .post('http://localhost/drops/', {
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
  .buttonChangeEMail {
    width: 70%;
    padding-top: 2%;
  }

  .changeEMail {
    max-width: 40%;
    margin: 0 auto;
    padding-top: 10%;
  }
</style>