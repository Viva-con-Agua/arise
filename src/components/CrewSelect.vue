<template>
    <div class="crewSelect">
        <v-select
                :value="crew"
                :options="crews"
                label="name"
                :placeholder="$t('crews.select.placeholder')"
                :filterBy="filter"
                maxHeight="300px"
                v-on:input="handleClick"
        >
            <span slot="no-options">{{ $t("crews.select.noCrewsAvailable") }}</span>
            <template slot="option" slot-scope="option">
                <div class="crew">
                    <h3 class="crewName">{{ option.name }}</h3>
                    <ul class="crewCities">
                        <li v-for="city in getCities(option)" class="crewCity">{{ city }}</li>
                    </ul>
                </div>
            </template>
        </v-select>
    </div>
</template>

<script>
    import Vue from 'vue'
    import vSelect from 'vue-select'
    import axios from 'axios'
    import {
        Notification
    } from 'element-ui'

    Vue.use(Notification);
    Notification.closeAll();

    export default {
        name: "CrewSelect",
        components: {
            'v-select': vSelect
        },
        data() {
            return {
                crew: null,
                crews: []
            }
        },
        created() {
            this.init()
            this.getCurrent()
        },
        methods: {
            errorHandling(error) {
                switch (error.response.status) {
                    case 400:
                        this.open(this.$t("error.ajax.badRequest.title"), this.$t("error.ajax.badRequest.msg"), "error")
                        break;
                    case 401:
                        this.open(this.$t("error.ajax.unAuthorized.title"), this.$t("error.ajax.unAuthorized.msg"), "error")
                        break;
                    case 403:
                        this.open(this.$t("error.ajax.forbidden.title"), this.$t("error.ajax.forbidden.msg"), "error")
                        break;
                    case 404:
                        this.open(this.$t("error.ajax.notFound.title"), this.$t("error.ajax.notFound.msg"), "error")
                        break;
                    case 500:
                        this.open(this.$t("error.ajax.serverError.title"), this.$t("error.ajax.serverError.msg"), "error")
                        break;
                    default:
                        this.open(this.$t("error.ajax.default.title"), this.$t("error.ajax.default.msg"), "error")
                        break;
                }
            },
            handleClick(event) {
                if(this.crew === null || (typeof this.crew === "undefined")) {
                    // add a dummy value, otherwise JS will break. It evaluates the whole expression...
                    this.crew = { id: null }
                }
                if (event !== null && event.id !== this.crew.id) {
                    this.select(event)
                } else if(event === null) {
                    this.deselect()
                }
            },
            deselect(event) {
                this.axios.delete('/drops/webapp/profile/remove/crew')
                    .then(response => {
                        if (response.status === 200) {
                            this.crew = null
                            this.$emit("vca-select-crew")
                        }
                    }).catch(this.errorHandling)
            },
            getCurrent() {
                this.axios.get('/drops/webapp/identity')
                    .then((response) => {
                        if (response.status === 200) {
                            var profile = response.data.additional_information.profiles.find(p => p.primary)
                            if(typeof profile === "undefined") {
                                profile = response.data.additional_information.profiles[0]
                            }
                            this.crew = profile.supporter.crew
                        }
                    }).catch(this.errorHandling)
            },
            init() {
                this.axios.post('/drops/webapp/crew/list', {})
                    .then(response => {
                        if(response.status === 200) {
                            this.crews = response.data.additional_information.map(crew => this.transform(crew))
                        }
                    })
                    .catch(this.errorHandling)
            },
            select(event) {
                var url = "/drops/webapp/profile/assign/" + event.id
                this.axios.get(url)
                    .then(response => {
                        if(response.status === 200) {
                            this.crew = event
                            this.$emit("vca-select-crew")
                        }
                    })
                    .catch(error => {
                        this.crew = null
                        switch (error.response.status) {
                            case 400:
                                this.open(this.$t("error.ajax.badRequest.title"), this.$t("error.ajax.badRequest.msg"), "error")
                                break;
                            case 401:
                                this.open(this.$t("error.ajax.unAuthorized.title"), this.$t("error.ajax.unAuthorized.msg"), "error")
                                break;
                            case 403:
                                this.open(this.$t("error.ajax.forbidden.title"), this.$t("error.ajax.forbidden.msg"), "error")
                                break;
                            case 404:
                                this.open(this.$t("error.ajax.notFound.title"), this.$t("error.ajax.notFound.msg"), "error")
                                break;
                            case 500:
                                this.open(this.$t("error.ajax.serverError.title"), this.$t("error.ajax.serverError.msg"), "error")
                                break;
                            default:
                                this.open(this.$t("error.ajax.default.title"), this.$t("error.ajax.default.msg"), "error")
                                break;
                        }
                    })
            },
            transform(crew) {
                crew.filterLabel = this.getFilterableLabel(crew)
                return crew
            },
            getCities(crew) {
                return crew.cities.map(city => city.name)
            },
            getFilterableLabel(crew) {
                var separator = " "
                return [crew.name].concat(crew.cities.map(city => city.name)).join(separator)
            },
            filter(option, label, search) {
                return (option.filterLabel || '').toLowerCase().indexOf(search.toLowerCase()) > -1
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

<style scoped lang="less">
    @import "./crews/assets/general.less";

    .crewSelect {
        margin-bottom: 0.5em;
    }

    .crew {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
    }
    .crewName {
        font-size: 1.1em;
        font-weight: bold;
        font-style: italic;
        margin-right: 0.5em;
    }

    .crewCities {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: baseline;
        list-style-type: none;
        margin-left: 0;
        margin-bottom: 0.6em;
    }
    .crewCity:not(:last-child) {
        &::after {
            content: ',';
        }
        margin-right: 0.5em;
    }

    .crewSelect /deep/ .v-select .dropdown-menu > .highlight > a {
        /*
         * required to override bootstrap 3's
         * .dropdown-menu > li > a:hover {} styles
         */
        .colorProfilePrimary();
    }
    .crewSelect /deep/ .v-select li > a {
        color: #colors[primary];
    }
</style>