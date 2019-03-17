<template>
    <VcAFrame>
        <VcAColumn>
            <VcABox :first="true" :title="$t('signup.title.token')">
                <span>{{ $t("signup.info.token") }}</span>
            </VcABox>
        </VcAColumn>
    </VcAFrame>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import { VcAFrame, VcAColumn, VcABox } from 'vca-widget-base'
    import 'vca-widget-base/dist/vca-widget-base.css'
    import {
        Notification
    } from 'element-ui';

    Vue.use(Notification);

    Notification.closeAll();

    export default {
        name: "SignUpToken",
        components: { VcAFrame, VcAColumn, VcABox },
        data () {
            return {
                "token": this.$route.params.token
            }
        },
        mounted: function() {
            this.sendToken()
        },
        methods: {
            sendToken: function() {
                var that = this
                axios
                    .get('/drops/webapp/signup/' + this.token)
                    .then(function(response) {
                        that.$router.push({path: '/'});
                    })
                    .catch(function(error) {
                        switch (error.response.status) {
                            case 500:
                                if(error.response.data.hasOwnProperty("msg")) {
                                    that.open(that.$t('signup.error.serverError.title'), error.response.data.msg, "error");
                                } else {
                                    that.open(that.$t('signup.error.serverError.title'), that.$t('signup.error.serverError.msg'), "error");
                                }
                                break;
                            case 404:
                                if(error.response.data.hasOwnProperty("msg")) {
                                    that.open(that.$t('signup.error.notFound.title'), error.response.data.msg, "error");
                                } else {
                                    that.open(that.$t('signup.error.notFound.title'), that.$t('signup.error.notFound.msg'), "error");
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