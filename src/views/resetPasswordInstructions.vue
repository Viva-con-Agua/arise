<template>
  <div class="resetPasswordInstructions">
    <transition name="fade">
      <!--<span v-show="show">
        <el-alert
          :title='statusMessage'
          :description='statusDescription'
          :type='statusType'
          show-icon
          @close="hintClosed"
        />
      </span> -->
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
          :ref="resetFormEMail"
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
          @click.once="submitForm(resetFormEMail)"
          @keyup.enter="submitForm(signInForm)">{{ $t('options.sendEmail') }}</el-button>
      </el-card>
    </div>
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
      Message,
      Step,
      Steps,
      Input
    } from 'element-ui'


    Vue.use(VueAxios, axios);
    Vue.use(Button);
    Vue.use(Card);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Message);
    Vue.use(Step);
    Vue.use(Steps);
    Vue.use(Input);


    export default {
      name: "ResetPasswordInstructions",
        data() {
          return {
            show: false,
            statusMessage: this.$t('reset.alert.title'),
              statusDescription: this.$t('reset.alert.description'),
              statusType: 'success',

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
            messageOpen() {
              this.$message({
                message: statusDescription,
                type: statusType
              });
            },
            submitForm(resetFormEMail) {
                this.$refs[resetFormEMail].validate((valid) => {
                    if (valid) {
                      var that = this;
                      this.axios
                        .post('http://localhost/drops/webapp/reset', {
                          address: that.resetFormEMail.email,
                        })
                        .then(function (response) {
                          //that.show = true;
                          messageOpen();
                        })
                        .catch(function (error) {
                            switch (error.response.status) {
                                case 401:
                                    that.statusMessage = that.$t('reset.PasswordInstructions.errorResponse');
                                    that.statusDescription = error.response.data.msg;
                                    that.statusType = "error";
                                    //that.show = true;
                                    messageOpen();
                                    break;
                                case 404:
                                    that.statusMessage = that.$t('reset.PasswordInstructions.errorResponse');
                                    that.statusDescription = error.response.data.msg;
                                    that.statusType = "error";
                                    //that.show = true;
                                    messageOpen();
                                    break;
                            }
                        })
                        .finally(() => this.loading = false)
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
        padding-top: 15%;
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