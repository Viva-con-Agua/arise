<template>
            <div class="non-voting-membership">
                <div class="nvmTitle"><strong class="nvmTitle-title">{{ $t("profile.nvm.title") }}</strong>
                        <span class="nvm-active" v-if="isNVM">{{ $t("profile.nvm.current.active") }}</span>
                        <span class="nvm-expired" v-if="isExpired">{{ $t("profile.nvm.current.expired") }}</span>
                        <span class="nvm-inactive" v-if="canApply">{{ $t("profile.nvm.current.inactive") }}</span>
                        <span class="nvm-denied" v-if="isDenied()">{{ $t("profile.nvm.current.denied") }}</span>
                </div>
                <div class="nvmDescription">{{ $t("profile.nvm.description") }}</div>

                <el-card class="box-card tail expand spaced">
                    <a :href="articleOfAssociationLink" target="_blank">{{ $t("profile.nvm.aoa") }}</a>
                </el-card>

                <div class="nvm" v-if="isNVM">
                  <span><strong>{{ $t("profile.nvm.status.active") }}</strong></span>
                  <a class="vca-button-warn vca-full-width" style="cursor: pointer;" @click.prevent="handleSetInactiveRequest">{{ $t("profile.nvm.actions.active") }}</a>
                </div>

                <div class="nvm" v-if="isExpired">
                  <span>{{ $t("profile.nvm.status.renew") }}</span>
                  <a class="vca-button-primary vca-full-width" style="cursor: pointer;" @click.prevent="handleActiveRequest">{{ $t("profile.nvm.actions.renew") }}</a>
                </div>

                <div class="nvm" v-if="canApply">
                  <span>{{ $t("profile.nvm.status.apply") }}</span><br/><br/>
                  <span>{{ $t("profile.nvm.status.confirmation") }}</span>
                  <a class="vca-button-primary vca-full-width" style="cursor: pointer;" @click.prevent="handleActiveRequest">{{ $t("profile.nvm.actions.apply") }}</a>
                </div>

                <div class="nvm" v-if="isDenied()">
                  <span><strong>{{ $t("profile.warning.important") }}</strong></span>
                  <span v-if="!hasAddress">{{ $t("profile.nvm.status.noAddress") }}</span>
                  <span v-if="!isActive">{{ $t("profile.nvm.status.inActive") }}</span>
                  <span v-if="!hasPrimaryCrew">{{ $t("profile.nvm.status.noPrimaryCrew") }}</span>
                  <a class="disabled vca-button-primary vca-full-width" >{{ $t("profile.nvm.actions.cannotApply") }}</a>
                </div>
        </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import {
        Notification,
        Button
    } from 'element-ui'
    Vue.use(Notification);
    Vue.use(Button);
    Notification.closeAll();

    export default {
        name: "NonVotingMembership",
        data() {
            return {
                articleOfAssociationLink: this.$t('profile.nvm.link'),
                hasAddress: true,
                isActive: true,
                canApply: false,
                hasPrimaryCrew: true,
                isExpired: false,
                isNVM: false
            }
        },
        created() {
            this.init()
        },
        mounted() {
                this.$root.$on('nvmState', () => { this.init(); })
        },
        methods: {
            isDenied() { return (!this.canApply && !this.isExpired && !this.isNVM); },
            handleSetInactiveRequest(event) {
                if (!confirm(this.$t('profile.nvm.messages.inactive.confirm'))) {
                        return false;
                }
                this.submit('/drops/webapp/profile/nvm/inactive');
            },
            handleActiveRequest(event) {
                if (!confirm(this.$t('profile.nvm.messages.request.confirm'))) {
                        return false;
                }
                this.submit('/drops/webapp/profile/nvm/request')
            },
            submit(url) {
                
                this.axios
                  .post(url)
                          .then(response => {
                            switch (response.status) {
                                      case 200:
                                        this.open(
                                                  this.$t('profile.nvm.messages.request.success.title'),
                                                  this.$t('profile.nvm.messages.request.success.message'),
                                                  "success"
                                        )
                                        this.init();
                                break;
                            }
                }).catch(error => {
                    this.selection = this.default
                    this.open(
                        this.$t('profile.nvm.notification.error.title'),
                        this.$t('profile.nvm.notification.error.msg'),
                        "error"
                    )
                })
            },
            init() {
                this.axios
                  .get('/drops/webapp/profile/nvm/check')
                  .then(response => {
                    switch (response.status) {
                      case 200:
                        switch(response.data.additional_information.status) {
                                case 'expired':
                                        this.isExpired = true;
                                        this.isNVM = false;
                                        this.canApply = false;
                                        break;
                                case 'active':
                                        this.isNVM = true;
                                        this.isExpired = false;
                                        this.canApply = false;
                                        break;
                                case 'inactive':
                                        this.canApply = true;
                                        this.isExpired = false;
                                        this.isNVM = false;
                                        break;
                                case 'denied':
                                default:
                                        this.isNVM = false;
                                        this.isExpired = false;
                                        this.canApply = false;
                                        this.hasAddress = (response.data.additional_information.conditions.hasAddress);
                                        this.isActive = (response.data.additional_information.conditions.isActive);
                                        this.hasPrimaryCrew = (response.data.additional_information.conditions.hasPrimaryCrew);
                                        break;
                        }
                    }
                }).catch(error => {
                    this.selection = this.default
                })
            },
            open(title, message, type) {
                Notification({
                    title:  title,
                    message: message,
                    type: type
                });
            }
        }
    }
</script>

<style scoped>
.spaced { margin: 10px 0; }
.nvmTitle-title { margin-right: 5px; }
.nvm-active { color: green; }
.nvm-inactive { color: grey; }
.nvm-denied { color: red; }
.nvm-requested { color: orange; }

</style>
