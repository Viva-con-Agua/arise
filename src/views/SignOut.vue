<template>
    <VcAFrame>
        <VcAColumn>
            <VcABox :first="true" :title="$t('signOut.title')">
                <span>{{ $t("signOut.info") }}</span>
            </VcABox>
        </VcAColumn>
    </VcAFrame>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import VcAFrame from '@/components/page/VcAFrame.vue';
    import VcAColumn from '@/components/page/VcAColumn.vue';
    import VcABox from '@/components/page/VcABox.vue';
    import {
        Notification
    } from 'element-ui';

    Vue.use(Notification);

    Notification.closeAll();

    export default {
        name: "SignOut",
        components: { VcAFrame, VcAColumn, VcABox },
        mounted: function() {
            this.requestSignOut()
        },
        methods: {
            requestSignOut: function() {
                var that = this
                axios
                    .get('/drops/webapp/out')
                    .then(function(response) {
                        that.$router.push({path: '/'});
                    })
                    .catch(function(error) {
                        switch (error.response.status) {
                            case 500:
                                if(error.response.data.hasOwnProperty("msg")) {
                                    that.open(that.$t('signOut.error.serverError.title'), error.response.data.msg, "error");
                                } else {
                                    that.open(that.$t('signOut.error.serverError.title'), that.$t('signOut.error.serverError.msg'), "error");
                                }
                                break;
                            case 401:
                                if(error.response.data.hasOwnProperty("msg")) {
                                    that.open(that.$t('signOut.error.unAuthorized.title'), error.response.data.msg, "error");
                                } else {
                                    that.open(that.$t('signOut.error.unAuthorized.title'), that.$t('signOut.error.unAuthorized.msg'), "error");
                                }
                                break;
                        }
                    })
                    .finally(() => this.loading = false);
            },
            open(title, message, type) {
                if(typeof title !== 'undefined' && typeof message !== 'undefined' && typeof type !== 'undefined') {
                    Notification({
                        title: title,
                        message: message,
                        type: type,
                        duration: 6000
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>