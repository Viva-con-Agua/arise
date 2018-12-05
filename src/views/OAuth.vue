<template>
  <VcAFrame>
    <VcAColumn size="60%">
      <VcABox :first="true" :title="$t('oauth.title.list')">
          <table class="clients">
            <thead>
              <tr>
                <th>{{ $t('oauth.label.id') }}</th>
                <th>{{ $t('oauth.label.secret') }}</th>
                <th>{{ $t('oauth.label.uri') }}</th>
                <th>{{ $t('oauth.label.types') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="clients.length === 0">
                <td colspan="4">{{ $t('oauth.noClients') }}</td>
              </tr>
              <tr v-else v-for="client in clients">
                <td>{{ client.id }}</td>
                <td>{{ hideSecret(client) }}</td>
                <td>{{ client.redirectUri }}</td>
                <td>{{ client.grantTypes.map((grantType) => $t('oauth.grantTypes.' + grantType)).join(", ") }}</td>
              </tr>
            </tbody>
          </table>
      </VcABox>
    </VcAColumn>
    <VcAColumn>
      <VcABox :first="true" :title="$t('oauth.title.form')">
        <el-form
                ref="oAuth"
                :model="oAuth"
                :rules="rules"
                status-icon>
          <el-form-item
                  :label="$t('oauth.label.id')"
                  prop="id">
            <el-input
                    v-model="oAuth.id"/>
          </el-form-item>
          <el-form-item
                  :label="$t('oauth.label.secret')"
                  prop="secret">
            <el-input
                    v-model="oAuth.secret"/>
          </el-form-item>
          <el-form-item
                  :label="$t('oauth.label.uri')"
                  prop="redirectURI">
            <el-input
                    v-model="oAuth.redirectUri"/>
          </el-form-item>
          <el-form-item
                  :label="$t('oauth.label.types')"
                  prop="grantTypes">
            <div id="grantTypes">
              <el-checkbox-group
                      class="grantTypeOptions"
                      v-model="oAuth.grantTypes">
                <el-checkbox
                        v-for="type in grantTypeOptions"
                        :value="type"
                        :label="type"
                        :key="type">{{ $t('oauth.grantTypes.' + type) }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <button
                  class="vca-button-primary vca-full-width"
                  @click.prevent="submitForm">
            {{ $t('options.submit') }}
          </button>
        </el-form>
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
      Checkbox,
      CheckboxGroup,
      Notification,
      Form,
      FormItem,
      Input
    } from 'element-ui'

    Vue.use(VueAxios, axios);
    Vue.use(Button);
    Vue.use(Checkbox);
    Vue.use(CheckboxGroup);
    Vue.use(Notification);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Input);

    Notification.closeAll();

    export default {

        name: "OAuth",
        components: { VcAFrame, VcAColumn, VcABox },

        data() {
            var typesOptions = [ 'authorization_code', 'implicit', 'password', 'client_credentials' ]
            return {
                clients: [],
                oAuth: {
                    id: '',
                    secret: '',
                    redirectUri: '',
                    grantTypes: ['authorization_code']
                },
                grantTypeOptions: typesOptions,

                rules: {
                    id: [
                        {required: true, message: this.$t('validationError.id'), trigger: 'blur'},
                        {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.id'), trigger: 'blur'}
                    ],
                    secret: [
                        {required: true, message: this.$t('validationError.secret'), trigger: 'blur'}
                    ],
                    redirectUri: [
                        {required: true, message: this.$t('validationError.uri'), trigger: 'blur'}
                    ],
                    grantTypes: [
                        {required: true, message: this.$t('validationError.types'), trigger: 'blur'}
                    ],
                }
            }
        },
        created: function() {
            this.getClients()
        },

        methods: {
            open(title, message, type) {
                Notification({
                    title:  title,
                    message: message,
                    type: type
                });
            },

            getClients() {
                this.axios.get('/drops/webapp/oauthclient/list')
                    .then((response) => {
                        if(response.status === 200) {
                            this.clients = response.data.additional_information
                        }
                    })
                    .catch((error) => {
                        var msgPath = ""
                        switch(error.response.status) {
                            case 500:
                                msgPath = "oauth.error.serverError"
                                break;
                            case 400:
                                msgPath = "oauth.error.bogus"
                                break;
                            default:
                                msgPath = "oauth.error.default"
                                break;
                        }
                        if(error.response.data.hasOwnProperty("msg")) {
                            this.open(this.$t(msgPath + '.title'), error.response.data.msg, "error");
                        } else {
                            this.open(this.$t(msgPath + '.title'), this.$t(msgPath + '.msg'), "error");
                        }
                    })
            },

            hideSecret(client) {
                return "********"
            },

            submitForm() {
                this.$refs.oAuth.validate((valid) => {
                    if (valid) {
                      this.axios
                        .post('/drops/webapp/oauthclient/create', this.oAuth)
                        .then(response => {
                            if(response.status === 200) {
                                this.clients.push(response.data.additional_information)
                                this.open(this.$t('oauth.success.title'), 'oauth.success.msg', "success");
                            }
                        })
                        .catch(error => {
                            var msgPath = ""
                            switch(error.response.status) {
                                case 500:
                                    msgPath = "oauth.error.serverError"
                                    break;
                                case 400:
                                    msgPath = "oauth.error.bogus"
                                    break;
                                default:
                                    msgPath = "oauth.error.default"
                                    break;
                            }
                            if(error.response.data.hasOwnProperty("msg")) {
                                this.open(this.$t(msgPath + '.title'), error.response.data.msg, "error");
                            } else {
                                this.open(this.$t(msgPath + '.title'), this.$t(msgPath + '.msg'), "error");
                            }
                        })
                        .finally(() => this.loading = false)
                    } else {
                        return false;
                    }
                });
            },

            resetForm() {
                this.$refs.oAuth.resetFields();
            },
        }
    }
</script>

<style scoped lang="less">
  .vca-full-width {
    width: 100%;
    margin-top:1em;
    margin-bottom:1em;
  }

  .grantTypeOptions {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    padding: 0 0.5em;

    .el-checkbox {
      margin: 0em;
      padding-left: 0.5em;
    }
  }

  #grantTypes {
    float: left;
    clear: both;
    width: 100%;
  }

  .clients {
    width: 100%;
  }
</style>
