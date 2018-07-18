<template>
  <div id="finishSignup">
    <el-card class="box-card">
      <div
        slot="header"
        class="title">
        <font-awesome-icon
          icon="check-circle"
          size="4x"/>
        <h2>{{ $t("signup.finish.title") }}</h2>
      </div>
      <div class="content">
        {{ $t("signup.finish.description") }}
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "FinishSignup",

    data() {
      return {
      }
    },
    created() {
      setTimeout( () => this.$router.push({path: '/signin'}), 50000);
    }
  }
</script>
<style scoped>
  #finishSignup {
    max-width: 50%;
    margin: 0 auto;
    padding-top: 10%;
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