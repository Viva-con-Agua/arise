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
        <h4>you forgot your password?</h4>
      </div>
      <div class="content">
        no problem, just enter here your e-mail adress and we will send you the instructions to reset it.
      </div>
      <el-form
        :model="resetForm"
        :rules="rules"
        status-icon>
        <el-form-item
          :label="$t('reset.label.email')"
          prop="email">

          <el-input
            v-model.lazy="resetForm.email"/>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        icon="el-icon-arrow-right"
        @click.prevent="show = !show">{{ $t('options.sendemail') }}</el-button>
      <el-button
        type="text"
        icon="el-icon-close"
        @click.prevent="resetForm">{{ $t('options.reset') }}</el-button>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "ResetPassword",

        data() {
            return {

                resetForm: {
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
            submitForm(resetForm) {

                this.$refs[resetForm].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(SignUpForm) {
                this.$refs[SignUpForm].resetFields();
            },
        }
    }
</script>
<style scoped>
    .resetPassword {
        max-width: 480px;
    }
    .box-card {

    }
    .title {
        width: 50%;
        margin: 0 auto;
        text-align: center;
    }
    .content {
        font-size: 14px;
    }

</style>