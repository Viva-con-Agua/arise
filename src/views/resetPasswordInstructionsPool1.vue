<template>
  <VcAFrame>
    <VcAColumn>
      <VcABox :first="true" :title="$t('reset.PasswordInstructionsPool1.titel')">
        <div class="content">
          {{ $t("reset.PasswordInstructionsPool1.description") }}
        </div>
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
      Form,
      FormItem,
      Notification,
      Input
    } from 'element-ui'


    Vue.use(VueAxios, axios);
    Vue.use(Button);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Notification);
    Vue.use(Input);

    Notification.closeAll();

    export default {
      name: "ResetPasswordInstructionsPool1",
      components: { VcAFrame, VcAColumn, VcABox },
      data() {
        return {
        }
      },
      methods: {
      }
    }
</script>
<style scoped>
  .vca-full-width {
    margin-top:1em;
    margin-bottom:1em;
    width: 100%;
  }
</style>
