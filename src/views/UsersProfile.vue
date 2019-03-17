<template>
    <VcAFrame>
        <VcAColumn size="70%">
            <VcABox v-if="hasUser" :first="true" :title="getName()">
                <template slot="header">
                    <VcARole v-for="role in user.roles.map(role => role.role).filter((role) => role !== 'supporter')" :name="role" :key="role" />
                    <span v-if="!getProfile().confirmed" class="notConfirmed">{{ $t('profile.view.labels.notConfirmed') }}</span>
                </template>
                <div class="user">
                    <Avatar :user="user" type="profile" />
                    <div class="vca-profile">
                        <ul class="crew">
                            <li>
                                <span class="vca-user-label">{{ $t('profile.view.labels.crew') }}:</span>
                                <span class="vca-user-value" v-if="hasCrew()">{{ getProfile().supporter.crew.name }}</span>
                                <span class="vca-user-value" v-else>-</span>
                                <div class="roles">
                                    <VcARole v-for="role in getProfile().supporter.roles"
                                             :role="role.name"
                                             :pillar="role.pillar.pillar"
                                             :key="role.crew.name + role.name + role.pillar.pillar"
                                    />
                                </div>
                                <div class="roleButtons">
                                    <button class="vca-button-primary vca-button-select-crew" v-for="assignable in getRoleSetter()" @click="setRole(assignable.pillar.pillar)">
                                        {{ $t('profile.actions.assignRole.' + assignable.pillar.pillar) }}
                                    </button>
                                </div>
                            </li>
                            <li>
                                <span class="vca-user-label">{{ $t('profile.view.labels.since') }}:</span>
                                <span class="vca-user-value">{{ getSince() }}</span>
                            </li>
                        </ul>
                        <ul class="contact">
                            <li>
                                <span class="vca-user-label">{{ $t('profile.view.labels.email') }}:</span>
                                <span class="vca-user-value">{{ getProfile().email }}</span>
                            </li>
                            <li>
                                <span class="vca-user-label">{{ $t('profile.view.labels.mobilePhone') }}:</span>
                                <span class="vca-user-value" v-if="hasMobile()">{{ getProfile().supporter.mobilePhone }}</span>
                                <span class="vca-user-value" v-else>-</span>
                            </li>
                            <li>
                                <span class="vca-user-label">{{ $t('profile.view.labels.placeOfResidence') }}:</span>
                                <span class="vca-user-value" v-if="hasResidence()">{{ getProfile().supporter.placeOfResidence }}</span>
                                <span class="vca-user-value" v-else>-</span>
                            </li>
                        </ul>

                        <ul class="demographics">
                            <li>
                                <span class="vca-user-label">{{ $t('profile.view.labels.age') }}:</span>
                                <span class="vca-user-value">{{ getAge() }}</span>
                            </li>
                            <li>
                                <span class="vca-user-label">{{ $t('profile.view.labels.gender') }}:</span>
                                <span class="vca-user-value">{{ $t('profile.view.value.gender.' + getGender()) }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </VcABox>
            <VcABox v-else :first="true" :title="$t('profile.error.title')">
                {{ $t('profile.error.title') }}
            </VcABox>
        </VcAColumn>
    </VcAFrame>
</template>

<script>
    import axios from 'axios'
    import { VcAFrame, VcAColumn, VcABox } from 'vca-widget-base'
    import 'vca-widget-base/dist/vca-widget-base.css'
    import { Avatar, VcARole } from 'vca-widget-user'

    export default {
        name: "UsersProfile",
        components: { VcAFrame, VcAColumn, VcABox, VcARole, Avatar },
        data() {
            return {
                uuid: this.$route.params.id,
                user: null,
                currentUser: null
            }
        },
        computed: {
            hasUser() {
                return this.user !== null && (typeof this.user !== "undefined") && this.user.hasOwnProperty("id")
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.initCurrentUser()
                this.initVisitedUser()
            },
            initCurrentUser() {
                axios.get('/drops/webapp/identity')
                    .then(response => {
                        if(response.status === 200) {
                            this.currentUser = response.data.additional_information
                        }
                    })
            },
            initVisitedUser() {
                axios.get('/drops/webapp/user/' + this.uuid, {})
                    .then(response => {
                        if(response.status === 200) {
                            this.user = response.data.additional_information
                        }
                    })
                    .catch(error => {
                        this.$router.push({path: '/error/' + error.response.status})
                    })
            },
            hasCrew() {
				        return (this.getProfile().supporter.hasOwnProperty("crew"))
			      },
            hasMobile() {
				        return (this.getProfile().supporter.hasOwnProperty("mobilePhone"))
			      },
            hasResidence() {
				        return (this.getProfile().supporter.hasOwnProperty("placeOfResidence"))
			      },
            setRole(pillar) {
                var call = "/drops/webapp/profile/role/" + this.user.id + "/" + pillar
                axios.get(call).then(response => {
                    if(response.status === 200) {
                        this.initVisitedUser()
                    }
                })
            },
            getRoleSetter() {
                var visitedRoles = this.getProfile().supporter.roles
                return this.getProfile(true).supporter.roles.filter(role => {
                    var visitedCrew = this.getCrew()
                     return (visitedCrew !== null && visitedCrew.id === role.crew.id &&
                         !visitedRoles.some(r => r.name === role.name && r.crew.id === role.crew.id && r.pillar.pillar === role.pillar.pillar))
                })
            },
            getProfile(currentUser = false) {
                var user = this.user
                if(currentUser) {
                    user = this.currentUser
                }
                var profile = user.profiles.find(p => p.primary)
                if(typeof profile === "undefined") {
                    profile = user.profiles[0]
                }
                return profile
            },
	    getGender() {
	    	var gender = this.getProfile().supporter.sex;
            if(typeof gender === "undefined" || gender === null || gender === "") {
                gender = "undefined"
            }
            return gender;
            },
            getCrew() {
                var res = null
                var supporter = this.getProfile().supporter
                if(supporter.hasOwnProperty("crew")) {
                    res = supporter.crew
                }
                return res
            },
            getName() {
                var name = this.getProfile().supporter.fullName
                if(typeof name === "undefined" || name === null || name === " " || name === "") {
                    name = this.$t('profile.view.value.name.fallback')
                }
                return name
            },
	    getAge: function () {
            var age = this.calcAge()
            var res = this.$t('profile.view.value.age.notAvailable')
            if(age >= 0) {
              res = age
            }
            return res;
	    },
	    calcAge: function () {
	      var birthday = this.user.profiles[0].supporter.birthday
	      var res = -1
	      if(typeof birthday !== "undefined" && birthday !== null) {
	         var today = new Date()
             var birthDate = new Date(this.getProfile().supporter.birthday)
             var age = today.getFullYear() - birthDate.getFullYear()
             var m = today.getMonth() - birthDate.getMonth()
             if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
               age = age - 1
             }
             res = age
	       }
	       return res
	    },
            getSince: function () {
                var created = new Date(this.user.created)
                return created.getUTCFullYear()
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../assets/less/responsive.less';

    .vca-button-select-crew {
        padding-left: 0.5em;
        padding-right: 0.5em;
    }

    .user {
        display: flex;
        justify-content: flex-start;
        align-item: flex-start;
        align-content: flex-start;

        @media @phone-down {
            flex-direction: column;
        }
    }

    .notConfirmed {
        color: white;
        background-color: rgba(213, 0, 0, 1);
        padding: 0.3em;
        font-size: 0.9em;
        border-radius: 0.5em;
        margin: 0.2em;
    }

    .roles {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: flex-start;
        & /deep/ .role:not(:first-child) {
            margin-left: 0.2em;
        }
    }
    .roleButtons {
        margin-bottom: 0.5em;
        button {
            margin-top: 0.5em;
            &:not(:last-child) {
                margin-right: 0.5em;
            }
        }
    }

    .vca-profile {
        margin-left: 2em;
        list-style: none;
        flex-grow: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;


        @media @phone-down {
            margin-left: 0;
        }

        ul {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 0;
            padding: 0;
            li {
                display: flex;
                flex-direction: column;
            }

            &.crew {
                align-items: flex-start;
            }

            &.contact {
                flex-direction: column;
            }

            &.demographics {
                justify-content: flex-end;
                li {
                    margin-left: 2em;
                    flex-direction: row;
                    align-items: baseline;

                    .vca-user-value {
                        margin-left: 0.3em;
                    }
                }
            }
        }
    }

    .vca-user-label {
        /*font-style: italic;*/
        font-weight: bold;
    }
    .vca-user-value {
        font-size: 1.4em;
    }

</style>
