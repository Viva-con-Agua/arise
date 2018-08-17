<template>
  <div id="resetPasswordDone">
    <el-steps
      :active="3">
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
          icon="check-circle"
          size="4x"/>
        <h2>{{ $t("reset.PasswordDone.title") }}</h2>
      </div>
      <div class="content">
        {{ $t("reset.PasswordDone.description") }}
      </div>
    </el-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Card,
    Step,
    Steps
  } from 'element-ui'


  Vue.use(Card);
  Vue.use(Step);
  Vue.use(Steps);

  export default {
    name: "ResetPasswordDone",

    data() {
      return {
      }
    },
    created() {
      setTimeout( () => this.$router.push({path: '/signin'}), 5000);
    }
  }
</script>
<style scoped>
  #resetPasswordDone {
    max-width: 50%;
    padding-top: 15%;
    margin: 0 auto;
  }
  .title {
    width: 50%;
    margin: 0 auto;
    text-align: center;
  }
  .content {
    font-size: 16px;
  }

  </style>