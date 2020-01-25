<template>
  <VcAFrame>
    <VcAColumn>
      <VcABox :title="$t('signup.finish.title')">
        <div class="content">
          {{ $t("signup.finish.description") }}
        </div>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>

<script>
  import Vue from 'vue';
  import { VcAFrame, VcAColumn, VcABox } from 'vca-widget-base'
  import 'vca-widget-base/dist/vca-widget-base.css'

  export default {
    name: "FinishSignup",
    components: { VcAFrame, VcAColumn, VcABox },

    data() {
      return {
      }
    }
  }
</script>
<style scoped>

</style>