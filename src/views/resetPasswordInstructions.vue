<template>
  <div class="resetPasswordInstructions">
    <transition name="fade">
      <span v-show="show">
        <el-alert
          :title="$t('reset.alert.title')"
          :description="$t('reset.alert.description')"
          type="info"
          show-icon
        />
      </span>
    </transition>
    <div class="resetPasswordContent">
      <el-steps
        :active="1"
      >
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
            icon="user-lock"
            size="4x"/>
          <h2>{{ $t("reset.PasswordInstructions.title") }}</h2>
        </div>
        <div class="content">
          {{ $t("reset.PasswordInstructions.description") }}
        </div>
        <el-form
          :model="resetFormEMail"
          :rules="rules"
          status-icon>
          <el-form-item
            :label="$t('reset.label.email')"
            prop="email">

            <el-input
              v-model.lazy="resetFormEMail.email"/>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-arrow-right"
          @click.once="submitForm; show = !show">{{ $t('options.sendEmail') }}</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import {
      Alert,
      Button,
      Card,
      Form,
      FormItem,
      Step,
      Steps,
      Input
    } from 'element-ui'


    Vue.use(VueAxios, axios);
    Vue.use(Alert);
    Vue.use(Button);
    Vue.use(Card);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Step);
    Vue.use(Steps);
    Vue.use(Input);


    export default {
      name: "ResetPasswordInstructions",
        data() {
          return {
            show: false,

            resetFormEMail: {
                    email: ''
                },

                rules: {
                    email: [
                        {required: true, message: this.$t('validationError.email'), trigger: 'blur'},
                        {pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: this.$t('inputSample.email'), trigger: 'blur' }
                    ]}

            }
        },
        methods: {
            submitForm(resetFormEMail) {

                this.$refs[resetFormEMail].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(resetFormEMail) {
                this.$refs[resetFormEMail].resetFields();
            },
        }
    }
</script>
<style scoped>
    .resetPasswordInstructions {
        max-width: 75%;
        margin: 0 auto;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    .resetPasswordContent {
        max-width: 50%;
        margin: 0 auto;
        padding-top: 20px;
    }
    .title {
        width: 75%;
        margin: 0 auto;
        text-align: center;
    }
    .content {
        font-size: 16px;
    }

</style>