<template>
    <WidgetUserList :options="options" />
</template>

<script>
    import Vue from 'vue'
    import WidgetUserList from 'vca-widget-user'
    import 'vca-widget-user/dist/vca-widget-user.css'

    export default {
        name: "users",
        components: { WidgetUserList },
        data () {
            return {
                options: {
                    'type': { 'menue': true, 'value': 'table' },
                    'sorting': { 'menue': { 'field': 'Supporter_firstName', 'dir': 'ASC' } },
                    'lang': this.$i18n.locale //'de-DE'
                }
            }
        }
    }
</script>

<style scoped>

</style>