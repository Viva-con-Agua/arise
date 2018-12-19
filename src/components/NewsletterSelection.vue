<template>
    <v-select
            :value="selection"
            :options="options"
            :placeholder="$t('profile.newsletter.none')"
            :clearable="false"
            :searchable="false"
            v-on:input="handleClick"
    >
    </v-select>
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
        name: "NewsletterSelection",
        components: {
            'v-select': vSelect
        },
        data() {
            return {
                default: {'label': this.$t('profile.newsletter.none'),'value':'none'},
                selection: {'label': this.$t('profile.newsletter.none'),'value':'none'},
                options: [
                    {'label': this.$t('profile.newsletter.none'),'value':'none'},
                    {'label': this.$t('profile.newsletter.all'),'value':'all'},
                    {'label': this.$t('profile.newsletter.regional'),'value':'regional'},
                    {'label': this.$t('profile.newsletter.global'),'value':'global'}
                ]
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
                axios.post('/drops/webapp/profile/newsletter/' + this.selection.value, {}).then(response => {
                    switch(response.status) {
                        case 200:
                            this.open(
                                this.$t('profile.newsletter.notification.success.title'),
                                this.$t('profile.newsletter.notification.success.msg'),
                                "success"
                            )
                            break;
                    }
                }).catch(error => {
                    this.selection = this.default
                    this.open(
                        this.$t('profile.newsletter.notification.error.title'),
                        this.$t('profile.newsletter.notification.error.msg'),
                        "error"
                    )
                })
            },
            init() {
                axios.get('/drops/webapp/profile/newsletter').then(response => {
                    switch(response.status) {
                        case 200:
                            var setting = response.data.additional_information.setting
                            var entry = this.options.find(opt => opt.value === setting)
                            if(typeof entry === "undefined" || entry === null) {
                                entry = this.default
                            }
                            this.selection = entry
                            break;
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