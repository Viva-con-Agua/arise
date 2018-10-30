<template>
    <div>
        <WidgetUserList :options="options" />
    </div>
</template>

<script>
    import Vue from 'vue'
    import { WidgetUser, WidgetUserList } from 'vca-widget-user'
    import 'vca-widget-user/dist/vca-widget-user.css'

    export default {
        name: "users",
        components: { WidgetUser, WidgetUserList },
        data () {
            return {
                options: {
                    'type': { 'menue': true, 'value': 'table' },
                    'sorting': { 'menue': { 'field': 'Supporter_firstName', 'dir': 'ASC' } },
                    'lang': 'de'
                }
            }
        }
    }
</script>

<style scoped>

</style>