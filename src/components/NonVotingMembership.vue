<template>
    	<div class="non-voting-membership">
		<div class="nvmTitle"><strong>{{ $t("profile.nvm.title") }}</strong></div>
		<div class="nvmDescription">{{ $t("profile.nvm.description") }}</div>
		
		<div class="nvm" v-if="isNVM">
		  <span>{{ $t("profile.nvm.status.end") }}</span>
		  <a class="vca-button-primary vca-full-width" style="cursor: pointer;" @click.prevent="handleNVMRequest">{{ $t("profile.nvm.actions.active") }}</a>
		</div>

		<div class="nvm" v-if="isExpired">
		  <span>{{ $t("profile.nvm.status.renew") }}</span>
		  <a class="vca-button-primary vca-full-width" style="cursor: pointer;" @click.prevent="handleNVMRequest">{{ $t("profile.nvm.actions.renew") }}</a>
		</div>

		<div class="nvm" v-if="canApply">
		  <span>{{ $t("profile.nvm.status.apply") }}</span>
		  <a class="vca-button-primary vca-full-width" style="cursor: pointer;" @click.prevent="handleNVMRequest">{{ $t("profile.nvm.actions.active") }}</a>
		</div>

		<div class="nvm" v-if="!canApply && !isExpired && !isNVM">
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
        methods: {
            handleClick(event) {
                if(event.label !== this.selection.label || event.value !== this.selection.value) {
                    this.selection = event
                    this.submit()
                }
            },
            submit() {
                
        	this.axios
        	  .get('/drops/webapp/profile/nvm/request')
       	 	  .then(response => {
            		switch (response.status) {
              			case 200:
                			this.open(
                  				this.$t('profile.nvm.messages.request.success.title'),
                  				this.$t('profile.nvm.messages.request.success.message'),
                  				"success"
                			)
                			this.hasRequested=true;
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
			console.log(response.data.additional_information);
			switch(response.data.additional_information.status) {
				case 'expired':
					this.isExpired = true;
					break;
				case 'active':
					this.isNVM = true;
					break;
				case 'inactive':
					this.canApply = true;
					break;
				case 'denied':
				default:
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

</style>
