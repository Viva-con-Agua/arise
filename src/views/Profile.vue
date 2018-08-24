<template>
  <div id="changeProfile">
    <el-upload
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      action="https://jsonplaceholder.typicode.com/posts/"
      class="avatar-uploader"
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar">
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"/>
    </el-upload>
    <el-form
      ref="profileForm"
      :model="profileForm"
      :rules="rules"
      class="profileForm">
      <el-form-item
        :label="$t('changeProfile.firstname')"
        prop="firstName">
        <el-input
          v-model="profileForm.firstname"/>
      </el-form-item>
      <el-form-item
        :label="$t('chageProfile.lastname')"
        prop="lastName">
        <el-input
          v-model="profileForm.lastname"/>
      </el-form-item>
      <el-form-item
        :label="$t('profileForm.mobile')"
        prop="mobile">
        <el-input
          v-model="profileForm.mobilePhone"/>
      </el-form-item>
      <el-form-item
        :label="$t('profileForm.placeofresidence')"
        prop="placeofresidence">
        <el-input
          v-model="profileForm.placeOfResidence"/>
      </el-form-item>
      <el-form-item
        :label="$t('profileForm.birthdate')"
        prop="birthdate">
        <el-date-picker
          v-model="profileForm.birthday"
          :placeholder="$t('profileForm.birthdateInfo')"
          type="date"/>
      </el-form-item>
      <el-form-item
        :label="$t('profileForm.gender')"
        prop="gender">
        <el-radio-group
          v-model="profileForm.sex"
          size="small">
          <el-radio
            label="female">{{ $t('gender.female') }}</el-radio>
          <el-radio
            label="male">{{ $t('gender.male') }}</el-radio>
          <el-radio
            label="other">{{ $t('gender.other') }}</el-radio>
          <el-radio
            label="prefernottosay">{{ $t('gender.prefernottosay') }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import {
    Button,
    DatePicker,
    Form,
    FormItem,
    Radio,
    RadioGroup,
    Input,
  } from 'element-ui'

  Vue.use(VueAxios, axios);
  Vue.use(Button);
  Vue.use(DatePicker);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Radio);
  Vue.use(RadioGroup);
  Vue.use(Input);

  export default {
    name: "ChangeProfile",

    data () {
      return {
        imgageUrl: '',

        profilForm: {
          firstName: '',
          lastName: '',
          mobilePhone: '',
          placeOfResidence: '',
          birthday: '',
          sex: ''
        },
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
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('Avatar picture must be JPG format!');
        }
        if (!isLt2M) {
          this.$message.error('Avatar picture size can not exceed 2MB!');
        }
        return isJPG && isLt2M;
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>