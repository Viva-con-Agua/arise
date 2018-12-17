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
    import vSelect from 'vue-select'

    export default {
        name: "NewsletterSelection",
        components: {
            'v-select': vSelect
        },
        data() {
            return {
                selection: {'label': this.$t('profile.newsletter.none'),'value':'none'},
                options: [
                    {'label': this.$t('profile.newsletter.none'),'value':'none'},
                    {'label': this.$t('profile.newsletter.all'),'value':'all'},
                    {'label': this.$t('profile.newsletter.regional'),'value':'regional'},
                    {'label': this.$t('profile.newsletter.global'),'value':'global'}
                ]
            }
        },
        methods: {
            handleClick(event) {
                if(event.label !== this.selection.label || event.value !== this.selection.value) {
                    this.selection = event
                    this.submit()
                }
            },
            submit() {
                console.log(this.selection)
                // TODO: Submit to Pool 1!
            }
        }
    }
</script>

<style scoped>

</style>