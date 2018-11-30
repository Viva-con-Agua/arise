<template>
    <div class="errorState">
        <VcAFrame>
            <VcAColumn>
                <VcABox :first="true" :title="getTitle()">
                    <span>{{ $t('errorState.status', { 'code': this.errorCode }) }}</span>
                </VcABox>
            </VcAColumn>
        </VcAFrame>
        <Freak :message="$t('errorState.header')"></Freak>
    </div>
</template>

<script>
    import Freak from './Freak.vue'
    import VcAFrame from '@/components/page/VcAFrame.vue';
    import VcAColumn from '@/components/page/VcAColumn.vue';
    import VcABox from '@/components/page/VcABox.vue';

    export default {
        name: "ErrorState",
        components: { Freak, VcAFrame, VcAColumn, VcABox },
        props: ['code'],
        data () {
            var errorCode = this.code
            if((typeof errorCode === "undefined") || errorCode === null) {
                errorCode = this.$route.params.code
            }
            return {
                "errorCode": parseInt(errorCode)
            }
        },
        methods: {
            knownCode() {
                return Array.from([401, 403, 404, 500]).some((code) => code === this.errorCode)
            },
            getTitle() {
                var res = this.$t('errorState.message.default')
                console.log(this.knownCode())
                if(this.knownCode()) {
                    res = this.$t('errorState.message.' + this.errorCode)
                }
                return res
            }
        }
    }
</script>

<style scoped>
    .errorState {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .freak {
        left: 1em;
        width: 10%;
    }

</style>