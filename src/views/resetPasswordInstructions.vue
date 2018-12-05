<template>
  <VcAFrame>
    <VcAColumn>
      <VcABox :first="true" :title="getTitle()">
        <div class="content">
          {{ (this.$route.params.pool === "pool") ? $t("reset.PasswordInstructionsPool1.description") : $t("reset.PasswordInstructions.description") }}
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
        <button
                ref="send"
                class="vca-button-primary vca-full-width"
                @click.once="submitForm(resetFormEMail)"
                @keyup.enter="submitForm(signInForm)">
          {{ $t('options.sendEmail') }}
        </button>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>

<script>
    import Vue from 'vue'
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
      name: "ResetPasswordInstructions",
      components: { VcAFrame, VcAColumn, VcABox },

        data() {
          return {
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
            disableSend() {
              this.$refs.send.disabled = true
            },
            submitForm(resetFormEMail) {
                this.$refs[resetFormEMail].validate((valid) => {
                    if (valid) {
                      var that = this;
                      this.axios
                        .post('/drops/webapp/reset', {
                          address: that.resetFormEMail.email,
                        })
                        .then(function (response) {
                          that.disableSend()
                          that.messageOpen(that.$t('reset.PasswordInstructions.successResponse'), that.$t('reset.alert.description'), 'success');
                        })
                        .catch(function (error) {
                            switch (error.response.status) {
                                case 401:
                                    that.messageOpen(that.$t('reset.PasswordInstructions.errorResponse'), error.response.data.msg, "error");
                                    break;
                                case 404:
                                    that.messageOpen(that.$t('reset.PasswordInstructions.errorResponse'), error.response.data.msg, "error");
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
            getTitle() {
                return (this.$route.params.pool === "pool") ? this.$t("reset.PasswordInstructionsPool1.title") : this.$t("reset.PasswordInstructions.title")
            }
        }
    }
</script>
<style scoped>
  .vca-full-width {
    margin-top:1em;
    margin-bottom:1em;
    width: 100%;
  }
    /*.resetPasswordInstructions {*/
        /*max-width: 75%;*/
        /*margin: 0 auto;*/
    /*}*/
    /*.fade-enter-active, .fade-leave-active {*/
      /*transition: opacity .5s;*/
    /*}*/
    /*.fade-enter, .fade-leave-to !* .fade-leave-active below version 2.1.8 *! {*/
      /*opacity: 0;*/
    /*}*/
    /*.resetPasswordContent {*/
        /*max-width: 50%;*/
        /*margin: 0 auto;*/
        /*padding-top: 15%;*/
    /*}*/
    /*.title {*/
        /*width: 75%;*/
        /*margin: 0 auto;*/
        /*text-align: center;*/
    /*}*/
    /*.content {*/
        /*font-size: 16px;*/
    /*}*/

</style>
