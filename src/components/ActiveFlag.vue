<template>
    	<div class="active-flag">
		<div class="activeFlagTitle"><strong>{{ $t("profile.activeFlag.title") }}</strong></div>
		
		<div class="active-flag-status" v-if="isActive">
		  <span>{{ $t("profile.activeFlag.status.active") }}</span>
		  <a class="vca-button-primary vca-full-width" style="cursor: pointer;" @click.prevent="handleSetInactiveRequest">{{ $t("profile.activeFlag.actions.active") }}</a>
		</div>

		<div class="active-flag-status" v-if="isRequested">
		  <span>{{ $t("profile.activeFlag.status.requested") }}</span>
		  <a class="vca-button-primary vca-full-width" style="cursor: pointer;" @click.prevent="handleUnsetActiveRequest">{{ $t("profile.activeFlag.actions.requested") }}</a>
		</div>

		<div class="active-flag-status" v-if="!isActive && hasCrew && !isRequested">
		  <span>{{ $t("profile.activeFlag.status.apply") }}</span>
		  <a class="vca-button-primary vca-full-width" style="cursor: pointer;" @click.prevent="handleActiveRequest">{{ $t("profile.activeFlag.actions.apply") }}</a>
		</div>

		<div class="active-flag-status" v-if="!hasCrew && !isActive">
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
        methods: {
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

</style>
