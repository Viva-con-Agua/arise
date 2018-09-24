<template>
  <div id="OAuth">
    <el-form
      ref="OAuth"
      :model="OAuth"
      :rules="rules"
      status-icon>
      <el-form-item
        :label="$t('oauth.label.id')"
        prop="id">
        <el-input
          v-model="OAuth.id"/>
      </el-form-item>
      <el-form-item
        :label="$t('oauth.label.secret')"
        prop="secret">
        <el-input
          v-model="OAuth.secret"/>
      </el-form-item>
      <el-form-item
        :label="$t('oauth.label.uri')"
        prop="redirectURI">
        <el-input
          v-model="OAuth.redirectURI"/>
      </el-form-item>
      <el-form-item
        :label="$t('oauth.label.types')"
        prop="grantTypes">
        <div id="subLabel">{{ $t('oauth.sublabel.types') }}</div>
        <!--            <el-input
                    v-model="OAuth.grantTypes"
                    :disabled="true">
            </el-input>-->
        <div id="grantTypes">
          <el-checkbox-group
            v-model="OAuth.checkedGrandTypes"
            :max="1">
            <el-checkbox 
              v-for="type in OAuth.grantTypes" 
              :label="type" 
              :key="type">{{ type }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-arrow-right"
        @click.prevent="submitForm">{{ $t('options.submit') }}</el-button>
    </el-form>
  </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import {
      Button,
      Checkbox,
      CheckboxGroup,
      Form,
      FormItem,
      Input
    } from 'element-ui'

    Vue.use(VueAxios, axios);
    Vue.use(Button);
    Vue.use(Checkbox);
    Vue.use(CheckboxGroup);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Input);

    const typesOptions = [  {authorization_code: 'Authorization Code'},
                            { asasd:'Implicit'},
                            {asdsd:'Password'},
                            {asdasd: 'Client Credentials'}];
    export default {

        name: "OAuth",
        components: {
        },

        data() {
            return {
                OAuth: {
                    id: '',
                    secret: '',
                    redirectURI: '',
                    checkedGrandTypes: ['Authorization Code'],
                    grantTypes: typesOptions
                },


                rules: {
                    id: [
                        {required: true, message: this.$t('validationError.id'), trigger: 'blur'},
                        {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.id'), trigger: 'blur'}
                    ],
                    secret: [
                        {required: true, message: this.$t('validationError.secret'), trigger: 'blur'}
                    ],
                    redirectURI: [
                        {required: true, message: this.$t('validationError.uri'), trigger: 'blur'}
                    ],
                    grantTypes: [
                        {required: true, message: this.$t('validationError.types'), trigger: 'blur'}
                    ],
                }
            }
        },

        methods: {

            submitForm() {
                this.$refs.OAuth.validate((valid) => {
                    if (valid) {
                        alert('submit!');
                      this.axios
                        .post('http://localhost:3000/test', {
                          data: this.OAuth,
                        })
                        .catch(error => {
                          console.log(error)
                          this.errored = true
                        })
                        .finally(() => this.loading = false)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            resetForm() {
                this.$refs.OAuth.resetFields();
            },
        }
    }
</script>

<style scoped>
    #grantTypes {
        clear: both;
        float: left;
    }
</style>
