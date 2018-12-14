<template>
    <div class="crew-list">
    <TableCrews :crews="crews" v-on:select-crew="selectCrew"/>
    </div>
</template>

<script>
    import axios from 'axios'
    import TableCrews from './TableCrews'

    export default {
        name: "CrewListWorkaround",
        components: {
            'TableCrews': TableCrews
        },
        data () {
            return {
                crews: []//,
                // query: { 'query': '', 'values': {} },
            }
        },
        created () {
            this.$options.sockets.onmessage = (data) => this.getData();
            this.getData()
        },
        methods: {
            selectCrew: function (event) {
                this.$emit('select-crew', event)
            },
            getData() {
                axios.post('/drops/webapp/crew/list', {})
                    .then(response => {
                        switch (response.status) {
                            case 200:
                                this.crews = response.data.additional_information
                                break
                        }
                    }).catch(error => {
                        // TODO
                })
            }
        }
    }
</script>

<style scoped lang="less">

    @import './assets/general.less';
    .crew-list {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        &.error {
            align-items: center;
            text-align: center;
            span {
                .colorProfileThirdly();
                border-radius: @radius;
                height: 2em;
                box-shadow: #shadow[primary];
                line-height: 2em;
            }
        }
    }
</style>