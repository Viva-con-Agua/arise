<template>
  <VcAFrame>
    <el-form
            ref="profileForm"
            :model="profileForm"
            :rules="rules"
            @keyup.enter.native="submitForm(profileForm)"
            class="columns-container">
      <VcAColumn>
        <VcABox :first="true" :title="$t('supporterForm.title')">

            <VcAInfoBox>
              {{ $t('supporterForm.infoBox') }}
            </VcAInfoBox>
            <el-form-item
                    :label="$t('supporterForm.label.firstname')"
                    prop="firstname">
              <el-input
                      v-model="profileForm.firstName"/>
            </el-form-item>
            <el-form-item
                    :label="$t('supporterForm.label.lastname')"
                    prop="lastname">
              <el-input
                      v-model="profileForm.lastName"/>
            </el-form-item>
            <el-form-item
                    :label="$t('supporterForm.label.mobile')"
                    prop="mobile">
              <el-input
                      v-model="profileForm.mobilePhone"/>
            </el-form-item>
            <el-form-item
                    :label="$t('supporterForm.label.placeofresidence')"
                    prop="placeofresidence">
              <el-input
                      v-model="profileForm.placeOfResidence"/>
            </el-form-item>
            <el-form-item
                    :label="$t('supporterForm.label.birthdate')"
                    prop="birthdate">
              <el-date-picker
                      v-model="profileForm.birthday"
                      :placeholder="$t('supporterForm.label.birthdateinfo')"
                      type="date"
                      style="width: 100%;"/>
            </el-form-item>
            <el-form-item
                    :label="$t('supporterForm.label.gender')"
                    prop="gender">
              <div id="genContent">
                <el-radio-group
                        v-model="profileForm.gender"
                        size="small">
                  <el-radio
                          label="female">{{ $t('gender.female') }}</el-radio>
                  <el-radio
                          label="male">{{ $t('gender.male') }}</el-radio>
                  <el-radio
                          label="other">{{ $t('gender.other') }}</el-radio>
                  <el-radio
                          label="prefernottosay">{{ $t('gender.prefernottosay') }}</el-radio>
                </el-radio-group></div>
            </el-form-item>
        </VcABox>
      </VcAColumn>
      <VcAColumn>
        <VcABox :first="true" :title="$t('profile.title.avatar')">
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
        </VcABox>
        <VcABox :first="false" :title="$t('profile.title.crew')">
          <span>Todo</span>
        </VcABox>
      </VcAColumn>
      <VcAColumn>
        <VcABox :first="true" :title="$t('profile.title.account')">
          <el-input
                  v-model="emailaddress"
                  :disabled="true"
                  :label="$t('profile.label.email')"
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
          <a href="#">{{ $t("options.delete") }}</a>
        </VcABox>
        <VcABox :first="false" :title="$t('profile.title.update')">
          <button
                  class="vca-button-primary buttonSave"
                  @click.prevent="submitForm(profileForm)">
            {{ $t('options.save') }}
          </button>
        </VcABox>
      </VcAColumn>
    </el-form>
  </VcAFrame>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import VcAFrame from '@/components/page/VcAFrame.vue';
  import VcAColumn from '@/components/page/VcAColumn.vue';
  import VcABox from '@/components/page/VcABox.vue';
  import VcAInfoBox from '@/components/page/VcAInfoBox.vue';
  import {
    Button,
    DatePicker,
    Form,
    FormItem,
    Notification,
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
  Vue.use(Notification);
  Vue.use(Radio);
  Vue.use(RadioGroup);
  Vue.use(Upload);
  Vue.use(Input);

  Notification.closeAll();

  export default {
    name: "ChangeProfile",
    components: { VcAFrame, VcAColumn, VcABox, VcAInfoBox },

    data () {
      return {
        imageUrl: '',
        emailaddress: '',
        profileForm: {
            firstName: '',
            lastName: '',
            mobilePhone: '',
            placeOfResidence: '',
            birthday: '',
            gender: ''
        },
        rules: {
            firstName: [
                {required: true, message: this.$t('validationError.firstname'), trigger: 'blur',},
                {message: this.$t('inputSample.firstname'), trigger: 'blur'}
            ],
            lastName: [
                {required: true, message: this.$t('validationError.lastname'), trigger: 'change'},
                {message: this.$t('inputSample.lastname'), trigger: 'blur'}
            ],
            mobilePhone: [
                {required: true, message: this.$t('validationError.mobile'), trigger: 'blur'},
                {pattern:/^(?=.*[0\+])(?=.*[0-9]{4})(?=.*[-/\\s])(?=.*([0-9]{4,}))(?=.*[-/\\s])(?=.*[0-9]{4,})/, message: this.$t('inputSample.mobile'), trigger: 'blur'}
            ],
            placeOfResidence: [
                {required: true, message: this.$t('validationError.placeofresidence'), trigger: 'blur'},
                {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.placeofresidence'), trigger: 'blur'}
            ],
            birthday: [
                {type: 'date', required: true, message: this.$t('validationError.birthdate'), trigger: 'change'}
            ],
            gender: [
                {required: false}
            ],
        },
      };
    },
    methods: {
      submitForm(profileForm) {
          function toProfileSubmit(form, email) {
              var gender = form.gender
              form['sex'] = gender
              form['email'] = email
              return form
          }
          var that = this;
          this.$refs.profileForm.validate((valid) => {
              if(valid) {
                  this.axios
                      .post('/drops/webapp/profile/update', toProfileSubmit(that.profileForm, that.emailaddress))
                      .then(function (response) {
                          console.log(response)
                          switch (response.status) {
                              case 200:
                                  that.open(
                                      that.$t('profile.messages.update.success.title'),
                                      that.$t('profile.messages.update.success.message'),
                                      "success"
                                  )
                                  break;
                          }
                      })
                      .catch(function (error) {
                          switch (error.response.status) {
                              case 401:
                                  that.open(
                                      that.$t('profile.messages.update.notAuthorized.title'),
                                      that.$t('profile.messages.update.notAuthorized.message'),
                                      "error"
                                  )
                                  break;
                              case 404:
                                  that.open(
                                      that.$t('profile.messages.update.notFound.title'),
                                      that.$t('profile.messages.update.notFound.message'),
                                      "error"
                                  )
                                  break;
                          }
                      })
                      .finally(() => this.loading = false)
              }
          })
          
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
      open(title, message, type) {
          Notification({
              title:  title,
              message: message,
              type: type
          });
      }
    },
    created () {
        function profileToForm(profile) {
            profile['gender'] = profile['sex']
            return profile
        }
      var that = this;
      this.axios
        .get('/drops/webapp/profile/get')
        .then(function (response) {
          switch (response.status)
          {
            case 200:
              var profile = response.data.additional_information[0];
              that.profileForm = profileToForm(profile);
              that.emailaddress = profile.email;
              break;
          }
        }).catch(function (error) {
            switch (error.response.status) {
                        case 500:
                            that.open(that.$t('signin.error'), error.response.data.msg, "error");
                            break;
                        case 412:
                            that.$router.push({path: '/resetPasswordInstructions/pool'});
                            break;
                        case 401:
                            that.$router.push({path: '/signin/L2FyaXNlLyMvcHJvZmlsZQ=='});
                            break;
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
    width: 100%;
    margin-top:1em;
    margin-bottom:1em;
  }

  el-form-item {
    float: left;
  }

  #genContent {
    float: left;
    clear: both;
  }
</style>
