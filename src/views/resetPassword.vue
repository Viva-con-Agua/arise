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
      <div class="description">
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
      </div>
      <el-form
        :model="resetFormPassword"
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
        @click.prevent="submitForm">{{ $t('options.resetIt') }}</el-button>
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
    Step,
    Steps,
    Input
  } from 'element-ui'


  Vue.use(VueAxios, axios);
  Vue.use(Button);
  Vue.use(Card);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Step);
  Vue.use(Steps);
  Vue.use(Input);

  export default {
        name: "ResetPassword",
        components: {Password},

        data() {
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

              resetFormPassword: {
                  password: '',
                  checkPass: ''
                },

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
          resetForm(resetFormPassword) {
            this.$refs[resetFormPassword].resetFields();
          },

          showFeedback ({suggestions, warning}) {
            console.log('🙏', suggestions)
            console.log('⚠', warning)
          },
          showScore (score) {
            console.log('💯', score)
          },
        }
    }
</script>
<style scoped>
    #resetPassword {
      max-width: 50%;
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

</style>