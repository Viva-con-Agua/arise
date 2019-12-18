<!--
Component Active flag shows a button to 
    * request active state, if the requirements therefore are fullfilled, this means the supporter has selected a crew (hasCrew)
      This request has to be aproved by an ASP of the crew or an employee
    * end the request, if the supporter has applied to become an active member of the crew
    * end the active membership, if the request has been aproved
-->
<template>
            <div class="active-flag">
                <div class="activeFlagTitle"><strong class="activeFlagTitle-title">{{ $t("profile.activeFlag.title") }}</strong> 
                        <span class="activeFlag-active" v-if="isActive">{{ $t("profile.activeFlag.current.active") }}</span>
                        <span class="activeFlag-requested" v-if="isRequested">{{ $t("profile.activeFlag.current.requested") }}</span>
                        <span class="activeFlag-inactive" v-if="canApply()">{{ $t("profile.activeFlag.current.inactive") }}</span>
                        <span class="activeFlag-denied" v-if="isDenied()">{{ $t("profile.activeFlag.current.denied") }}</span>
                </div>

                <div class="active-flag-status" v-if="isActive">
                  <span>{{ $t("profile.activeFlag.status.active") }}</span>
                  <a class="vca-button-warn vca-full-width" style="cursor: pointer;" @click.prevent="handleSetInactiveRequest">{{ $t("profile.activeFlag.actions.active") }}</a>
                </div>

                <div class="active-flag-status" v-if="isRequested">
                  <span>{{ $t("profile.activeFlag.status.requested") }}</span>
                  <a class="vca-button-primary vca-full-width" style="cursor: pointer;" @click.prevent="handleUnsetActiveRequest">{{ $t("profile.activeFlag.actions.requested") }}</a>
                </div>

                <div class="active-flag-status" v-if="canApply()">
                  <span>{{ $t("profile.activeFlag.status.apply") }}</span>
                  <a class="vca-button-primary vca-full-width" style="cursor: pointer;" @click.prevent="handleActiveRequest">{{ $t("profile.activeFlag.actions.apply") }}</a>
                </div>

                <div class="active-flag-status" v-if="isDenied()">
                  <span><strong>{{ $t("profile.warning.important") }}</strong></span>
                  <span v-if="!hasCrew">{{ $t("profile.activeFlag.status.noCrew") }}</span>
                  <a class="disabled vca-button-primary vca-full-width" >{{ $t("profile.activeFlag.actions.cannotApply") }}</a>
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
        name: "ActiveFlag",
        data() {
            return {
                hasCrew: false,
                isActive: false,
                isRequested: false
            }
        },
        created() {
            this.init()
        },
        mounted() {
                this.$root.$on('activeState', () => { this.init(); })
        },
        methods: {
            canApply() { return (!this.isActive && this.hasCrew && !this.isRequested); },
            isDenied() { return (!this.hasCrew && !this.isActive); },
            /* Set the active state of the supporter to inactive */
            handleSetInactiveRequest(event) {
                if (!confirm(this.$t('profile.activeFlag.messages.inactive.confirm'))) {
                        return false;
                }
                this.submit('/drops/webapp/profile/active/inactive');
            },
            /* Set the active requested state of the supporter back to inactive */
            handleUnsetActiveRequest(event) {
                if (!confirm(this.$t('profile.activeFlag.messages.unset.confirm'))) {
                        return false;
                }
                this.submit('/drops/webapp/profile/active/inactive');
            },
            /* Set the active state of the supporter to requested to apply for active state */
            handleActiveRequest(event) {
                if (!confirm(this.$t('profile.activeFlag.messages.request.confirm'))) {
                        return false;
                }
                this.submit('/drops/webapp/profile/active/request')
            },
            /* Send the request to the backend to change current state */
            submit(url) {
                this.axios
                  .post(url)
                          .then(response => {
                            switch (response.status) {
                                // TODO: Handle other return codes
                                      case 200:
                                        // TODO: Add return state to the message to show a more specific message
                                        this.open(
                                                  this.$t('profile.activeFlag.messages.request.success.title'),
                                                  this.$t('profile.activeFlag.messages.request.success.message'),
                                                  "success"
                                        )
                                        this.setState(response.data.additional_information.status);
                                        // Emit nvmState to check if the non-voting-membership state is affected by the change of the active state
                                        this.$root.$emit('nvmState');
                                break;
                            }
                }).catch(error => {
                    this.selection = this.default
                    this.open(
                        this.$t('profile.activeFlag.notification.error.title'),
                        this.$t('profile.activeFlag.notification.error.msg'),
                        "error"
                    )
                })
            },
            // Set the state 
            setState(status) {
                        switch(status) {
                                case 'active':
                                        this.isActive = true;
                                        this.isRequested = false;
                                        break;
                                case 'requested':
                                        this.isActive = false;
                                        this.isRequested = true;
                                        break;
                                case 'inactive':
                                default:
                                        this.isActive = false;
                                        this.isRequested = false;
                                        break;
                        }
            },
            init() {
                this.axios
                  .get('/drops/webapp/profile/active/check')
                  .then(response => {
                    switch (response.status) {
                      case 200:
                        this.hasCrew = (response.data.additional_information.conditions.hasPrimaryCrew);
                        this.setState(response.data.additional_information.status)
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

.activeFlagTitle-title { margin-right: 5px; }
.activeFlag-active { color: green; }
.activeFlag-inactive { color: grey; }
.activeFlag-denied { color: red; }
.activeFlag-requested { color: orange; }

</style>
