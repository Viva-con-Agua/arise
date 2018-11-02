<template>
    <div class="errorState">
        <Freak :message="$t('errorState.header')"></Freak>
        <div class="message">
            <h3 v-if="knownCode">{{ $t('errorState.message.' + code) }}</h3>
            <h3 v-else>{{ $t('errorState.message.default') }}</h3>
            <h6>{{ $t('errorState.status', { 'code': code }) }}</h6>
        </div>
    </div>
</template>

<script>
    import Freak from './Freak.vue'

    export default {
        name: "ErrorState",
        components: {Freak},
        props: ['code'],
        methods: {
            knownCode() {
                return Array.from([401, 403, 404, 500]).contains(code)
            }
        }
    }
</script>

<style scoped>
    .errorState {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

</style>