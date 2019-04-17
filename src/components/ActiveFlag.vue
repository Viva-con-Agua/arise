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
		  <a class="vca-button-primary vca-full-width" style="cursor: pointer;" @click.prevent="handleSetInactiveRequest">{{ $t("profile.activeFlag.actions.active") }}</a>
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
            handleSetInactiveRequest(event) {
		if (!confirm(this.$t('profile.activeFlag.messages.inactive.confirm'))) {
			return false;
		}
		this.submit('/drops/webapp/profile/active/inactive');
	    },
            handleUnsetActiveRequest(event) {
		if (!confirm(this.$t('profile.activeFlag.messages.unset.confirm'))) {
			return false;
		}
		this.submit('/drops/webapp/profile/active/inactive');
	    },
            handleActiveRequest(event) {
		if (!confirm(this.$t('profile.activeFlag.messages.request.confirm'))) {
			return false;
		}
		this.submit('/drops/webapp/profile/active/request')
            },
            submit(url) {
                
        	this.axios
        	  .post(url)
       	 	  .then(response => {
            		switch (response.status) {
              			case 200:
                			this.open(
                  				this.$t('profile.activeFlag.messages.request.success.title'),
                  				this.$t('profile.activeFlag.messages.request.success.message'),
                  				"success"
                			)
					this.setState(response.data.additional_information.status);
					//NonVotingMembership.init();
					console.log('triggering nvmState');
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
			console.log(response.data.additional_information);
			this.hasCrew = (response.data.additional_information.conditions.hasCrew);
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
