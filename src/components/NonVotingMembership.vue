<template>
    	<div class="non-voting-membership">
		<div class="nvmTitle">{{ $t("profile.nvm.title") }}</div>
		
		<div class="nvm" v-if="isNVM">
		  <a class="vca-button-primary vca-full-width" @click.prevent="handleNVMRequest">{{ $t("profile.nvm.actions.active") }}</a>
		  <span>{{ $t("profile.nvm.status.end") }}</span>
		</div>

		<div class="nvm" v-if="isExpired">
		  <a class="vca-button-primary vca-full-width" @click.prevent="handleNVMRequest">{{ $t("profile.nvm.actions.renew") }}</a>
		  <span>{{ $t("profile.nvm.status.renew") }}</span>
		</div>

		<div class="nvm" v-if="canApply">
		  <a class="vca-button-primary vca-full-width" @click.prevent="handleNVMRequest">{{ $t("profile.nvm.actions.active") }}</a>
		  <span>{{ $t("profile.nvm.status.end") }}</span>
		</div>

		<div class="nvm" v-if="!canApply && !isExpired && !isNVM">
		  <a class="disabled vca-button-primary vca-full-width" >{{ $t("profile.nvm.actions.cannotApply") }}</a>
		  <span v-if="!hasAddress">{{ $t("profile.nvm.status.noAddress") }}</span>
		  <span v-if="!isActive">{{ $t("profile.nvm.status.inActive") }}</span>
		  <span v-if="!hasPrimaryCrew">{{ $t("profile.nvm.status.hasNoPrimaryCrew") }}</span>
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
