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
  import VcAFrame from '@/components/page/VcAFrame.vue';
  import VcAColumn from '@/components/page/VcAColumn.vue';
  import VcABox from '@/components/page/VcABox.vue';

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