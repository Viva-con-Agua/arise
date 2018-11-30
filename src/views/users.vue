<template>
    <VcAFrame>
        <VcAColumn size="90%">
            <VcABox :first="true" title="Supporter">
                <div class="users-wrapper"></div>
                <WidgetUserList :options="options" />
            </VcABox>
        </VcAColumn>
    </VcAFrame>
</template>

<script>
    import Vue from 'vue'
    import VcAFrame from '@/components/page/VcAFrame.vue';
    import VcAColumn from '@/components/page/VcAColumn.vue';
    import VcABox from '@/components/page/VcABox.vue';
    import WidgetUserList from 'vca-widget-user'
    import 'vca-widget-user/dist/vca-widget-user.css'

    export default {
        name: "users",
        components: { WidgetUserList, VcAFrame, VcAColumn, VcABox },
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

    .users-wrapper /deep/ th {
        text-align: center;
        padding: 0 0.2em;
    }

    .users-wrapper /deep/ .row:after {
        display: none;
        content: "";
    }

</style>