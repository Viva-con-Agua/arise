<template>
    <VcAFrame>
        <VcAColumn size="90%">
            <VcABox :first="true" :title="$t('users.title')">
                <div v-if="!isIE()" class="users-wrapper">
                    <WidgetUserList :options="options" />
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
        },
        methods: {
            isIE() {
                return (new IEDetector()).isIE()
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