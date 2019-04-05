<template>
  <VcAFrame>
    <VcAColumn>
      <VcABox :first="true" :title="$t('delete.User.title')">
        <div class="content">
          {{ $t("delete.User.description") }}
        </div>
        <button
           ref="send"
                class="vca-button-primary vca-full-width"
                @click.once="deleteUser"
                @keyup.enter="deleteUser">
          {{ $t('options.delete') }}
        </button>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import { VcAFrame, VcAColumn, VcABox } from 'vca-widget-base'
    import 'vca-widget-base/dist/vca-widget-base.css'
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
      name: "ResetEmailInstructions",
      components: { VcAFrame, VcAColumn, VcABox },
        data() {
          return {
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
            deleteUser() {
                      var that = this;
                      this.axios
                        .get('/drops/webapp/user/delete')
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
            },
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



