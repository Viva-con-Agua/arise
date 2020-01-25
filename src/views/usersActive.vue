<template>
    <VcAFrame>
        <VcAColumn size="90%">
            <VcABox :first="true" :title="$t('users.title')">
                <div v-if="!isIE()" class="users-wrapper">
                    <WidgetUserList :crewName="crewName" :activeFlag="activeFlag" v-on:setUsersActive="setUsersActive" v-on:setUsersInActive="setUsersInActive" :options="options"/>
                </div>
                <p v-else>
                    <i18n path="users.ie.msg" tag="label" for="users.ie.alternative">
                        <a href='https://www.mozilla.org/firefox/download/thanks/'>{{ $t("users.ie.alternative") }}</a>
                    </i18n>
                </p>
            </VcABox>
        </VcAColumn>
    </VcAFrame>
</template>

<script>
    import Vue from 'vue'
    import IEDetector from '@/utils/IEDetector.js'
    import { VcAFrame, VcAColumn, VcABox } from 'vca-widget-base'
    import 'vca-widget-base/dist/vca-widget-base.css'
    import WidgetUserList from 'vca-widget-user'
    import 'vca-widget-user/dist/vca-widget-user.css'
    import axios from 'axios'
    import {
      Notification
    } from 'element-ui'

    Vue.use(Notification);
    Notification.closeAll();

    export default {
        name: "users",
        components: { WidgetUserList, VcAFrame, VcAColumn, VcABox },
        data () {

            switch (this.$route.params.activeState) {
                case 'active':
                    var buttons = [ { 'label': this.$t('users.active.button.remove'), 'callback': 'setUsersInActive' } ]
                    break;
                case 'inactive':
                    var buttons = [ { 'label': this.$t('users.active.button.activate'), 'callback': 'setUsersActive' } ]
                    break;
                case 'requested':
                default:
                    var buttons = [ { 'label': this.$t('users.active.button.confirm'), 'callback': 'setUsersActive' }, { 'label': this.$t('users.active.button.decline'), 'callback': 'setUsersInActive' } ]
                    break;
            }

            return {
                options: {
                    'type': { 'menue': true, 'value': 'table' },
                    'sorting': { 'menue': { 'field': 'Supporter_firstName', 'dir': 'ASC' } },
                    'buttons': buttons,
                    'filter': {},
                    'lang': this.$i18n.locale //'de-DE'
                },
		crewName: null,
		activeFlag: this.$route.params.activeState,
            }
        },
	created () {
            this.init();
	},
        methods: {
            setUsersActive: function(selectedUsers) {
                if (selectedUsers.users.length === 0) {
                    this.open(
                        this.$t('users.active.messages.update.noUserSelected.title'),
                        this.$t('users.active.messages.update.noUserSelected.message'),
                        "error"
                    )
                    return false;
                }
                if (!confirm(this.$t('label.active.messages.confirm'))) {
	            return false;
                }
                let request = { users: selectedUsers.users };
                this.submit('/drops/widgets/users/active', request);
            },
            setUsersInActive: function(selectedUsers) {
                if (selectedUsers.users.length === 0) {
                    this.open(
                        this.$t('users.active.messages.update.noUserSelected.title'),
                        this.$t('users.active.messages.update.noUserSelected.message'),
                        "error"
                    )
                    return false;
                }
                if (!confirm(this.$t('label.active.messages.decline'))) {
                    return false;
                }
                let request = { users: selectedUsers.users };
                this.submit('/drops/widgets/users/inactive', request);
            },
            submit(url, data) {

                axios
                    .post(url, data)
                    .then(response => {
                        switch (response.status) {
                            case 200:
                                this.open(
                                    this.$t('success.title'),
                                    this.$t('success.msg'),
                                    "success"
				)
                                window.location.reload();
                                break;
                    }
                }).catch(error => {
                    this.open(
                        this.$t('error.title'),
                        this.$t('error.unknown'),
                        "error"
                    )
                })
            },
            isIE() {
                return (new IEDetector()).isIE()
            },
            init() {
                if (this.$route.params.activeState != 'active' && this.$route.params.activeState != 'requested' && this.$route.params.activeState != 'inactive') {
                    this.$router.next({path: '/error/404'})
                }
		axios.get('/drops/webapp/identity').then((response) => {
			if (response.status === 200) {
				// Check if admin or employee, then show full list of active requested users
				var userRoles = response.data.additional_information.roles.map((role) => role.role)

				if (!userRoles.includes('employee') && !userRoles.includes('admin')) {
					this.crewName = response.data.additional_information.profiles[0].supporter.crew.name;
				}
			}
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

    .users-wrapper /deep/ th {
        text-align: center;
        padding: 0 0.2em;
    }

    .users-wrapper /deep/ .row:after,
    .users-wrapper /deep/ .row:before {
        display: none;
        content: "";
    }

    .users-wrapper /deep/ .form-control {
        height: inherit;
    }

    .users-wrapper /deep/ .searchWrapper {
        margin-bottom: 1em;
    }

    .users-wrapper /deep/ .small {
        font-size: 100%;
    }

</style>
