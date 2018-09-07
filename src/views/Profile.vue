<template>
  <div id="Profile">
    <!-- Profilepicture -->
    <el-upload
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      action="https://jsonplaceholder.typicode.com/posts/"
      class="avatar-uploader">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar">
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"/>
    </el-upload>
    <!-- Account Information -->
    <el-input
      v-model="emailaddress"
      :disabled="true"
      :label="$t('profile.label.email')"
      placeholder="this.emailaddress"
      style="width: 80%"
    />
    <el-button
      type="primary"
      icon="el-icon-edit"
      @click.prevent><router-link to="changeEMail"/></el-button>
    <el-input
      v-model="password"
      :disabled="true"
      :label="$t('profile.label.email')"
      placeholder="this.password"
      style="width: 80%"
    />
    <el-button
      type="primary"
      icon="el-icon-edit"
      @click.prevent><router-link to="changePassword"/></el-button>

    <!-- Personal Information -->
    <el-button
      type="primary"
      icon="el-icon-edit"
      @click="openAuthorization()">{{ $t('options.edit') }}</el-button>
    <el-form
      ref="profileForm"
      :model="profileForm"
      :rules="rules"
      class="profileForm">
      <el-form-item
        :label="$t('profile.label.firstname')"
        prop="firstname">
        <el-input
          v-model="profileForm.firstName"
          :placeholder="profileForm.firstName"/>
      </el-form-item>
      <el-form-item
        :label="$t('profile.label.lastname')"
        prop="lastname">
        <el-input
          v-model="profileForm.lastName"/>
      </el-form-item>
      <el-form-item
        :label="$t('profile.label.mobile')"
        prop="mobile">
        <el-input
          v-model="profileForm.mobilePhone"/>
      </el-form-item>
      <el-form-item
        :label="$t('profile.label.placeofresidence')"
        prop="placeofresidence">
        <el-input
          v-model="profileForm.placeOfResidence"/>
      </el-form-item>
      <el-form-item
        :label="$t('profile.label.birthdate')"
        prop="birthdate">
        <div class="clear">
          <el-date-picker
            v-model="profileForm.birthday"
            :placeholder="$t('profile.label.birthdateInfo')"
            type="date"/>
        </div>
      </el-form-item>
      <el-form-item
        :label="$t('profile.label.gender')"
        prop="gender">
        <div class="clear">
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
        </div>
      </el-form-item>
    </el-form>
    <el-button
      class="buttonSave"
      type="primary"
      icon="el-icon-arrow-right"
      @click.prevent="submitForm(profileForm)">{{ $t('options.save') }}</el-button>
    <el-button
      type="text"
      icon="el-icon-close"
      @click.prevent><router-link to="Profile">{{ $t('options.back') }}</router-link></el-button>
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
    MessageBox,
    Radio,
    RadioGroup,
    Upload,
    Input,
  } from 'element-ui'

  Vue.use(VueAxios, axios);
  Vue.use(Button);
  Vue.use(DatePicker);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(MessageBox);
  Vue.use(Radio);
  Vue.use(RadioGroup);
  Vue.use(Upload);
  Vue.use(Input);

  export default {
    name: "ChangeProfile",

    data () {
      return {
        imageUrl: '',
        emailaddress: '',
        profileForm: {
          email: '',
          firstName: '',
          lastName: '',
          mobilePhone: '',
          placeOfResidence: '',
          birthday: '',
          sex: ''
        },
        rules: {
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
                switch (response.status)
                {
                  case 200:

                }
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
      openAuthorization() {
        this.$prompt(this.$t('profile.openAuth.description'), this.$t('profile.openAuth.title'), {
          confirmButtonText: this.$t('options.ok'),
          cancelButtonText: this.$t('options.cancel'),
        }).then(value => {
          this.$message({
            type: 'success',
            message: 'Can edit'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Permission denied'
          });
        });
      }
    },
    created () {
      var that = this;
      this.axios
        .get('/drops/webapp/profile/get')
        .then(function (response) {
          switch (response.status)
          {
            case 200:

              var profiles = [];
              profiles = response.data.additional_information;
              that.profileForm = profiles[0];
              that.emailaddress = that.profileForm.email;
              break;
          }
        }).catch(function (error) {
            switch (error.status) {
                        case 500:
                            that.open(that.$t('signin.error'), error.response.data.msg, "error");
                            break;
                        case 412:
                            that.$router.push({path: '/resetPasswordInstructions/pool'});
                            break;
                        case 401:
                            that.open(that.$t('signin.error'), error.response.data.msg, "error");
                    
                    }
                  
        }).finally(() => this.loading = false)
          
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
  .buttonSave {
    width: 70%;
    padding-top: 2%;
  }

  #Profile {
    max-width: 50%;
    margin: 0 auto;
    padding-top: 10%;
  }
</style>
