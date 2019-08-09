<template>
    <VcAFrame>
        <VcAColumn size="90%">
            <VcABox :first="true" :title="$t('users.title')">
                <div v-if="!isIE()" class="users-wrapper">
                    <WidgetUserList :crewName="crewName" :activeFlag="activeFlag" :options="options"/>
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
    import IEDetector from '@/utils/IEDetector.js'
    import { VcAFrame, VcAColumn, VcABox } from 'vca-widget-base'
    import 'vca-widget-base/dist/vca-widget-base.css'
    import WidgetUserList from 'vca-widget-user'
    import 'vca-widget-user/dist/vca-widget-user.css'
    import axios from 'axios'

    export default {
        name: "users",
        components: { WidgetUserList, VcAFrame, VcAColumn, VcABox },
        data () {
            return {
                options: {
                    'type': { 'menue': true, 'value': 'table' },
                    'sorting': { 'menue': { 'field': 'Supporter_firstName', 'dir': 'ASC' } },
		    'buttons': [ 'active' ],
		    'filter': {},
		    //'filter': { 'query': '(supporterCrew.name.1.LIKE)', 'values' : { 'supporterCrew' : { 'name' : { '1': '%Hamburg%' } } } },
		    //'filter': { 'query': '(supporterCrew.active.1.=)', 'values' : { 'supporterCrew' : { 'active' : { '1': 'requested' } } } },
                    'lang': this.$i18n.locale //'de-DE'
                },
		crewName: null,
		activeFlag: "requested",
            }
        },
	created () {
	    this.init();
	},
        methods: {
            isIE() {
                return (new IEDetector()).isIE()
            },
	    init() {
		axios.get('/drops/webapp/identity').then((response) => {
			if (response.status === 200) {
				// Check if admin or employee, then show full list of active requested users
				var userRoles = response.data.additional_information.roles.map((role) => role.role)

				if (userRoles.includes('employee') || userRoles.includes('admin')) {
					this.options.filter = {
						'query': '(supporterCrew.active.1.=)', 
					    	'values' : {
							'supporterCrew' : { 
								'active' : { '1': 'requested' } 
							} 
						}
		    			}
				} else {
					console.log(this.crewName);
					this.crewName = response.data.additional_information.profiles[0].supporter.crew.name;
					console.log(this.crewName);					
					this.options.filter = {
						'query': '(supporterCrew.active.1.=_AND_supporterCrew.name.1.LIKE)', 
					    	'values' : {
							'supporterCrew' : { 
								'active' : { '1': 'requested' },
								'name' : { '1': this.crewName } 
							} 
						}
		    			}
				}
			}
      		})
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
