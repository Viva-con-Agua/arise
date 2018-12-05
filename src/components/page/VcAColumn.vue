<template>
    <div class="column" :style="calcSize()">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "VcAColumn",
        props: {
            'size': {
                'required': false
            }
        },
        methods: {
            calcSize: function() {
                var res = ""
                if((typeof this.size !== "undefined") && this.size !== null) {
                    res = "width: " + this.size
                }
                return res
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/responsive.less";

    .column {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 30%;
        height: 100%;

        &:not(:first-child) {
            margin-left: 3em;
        }

        @media @desktop-down {
            width: 98%;
            align-items: center;

            &:not(:first-child) {
                margin-left: 0em;
                margin-top: 2em;
            }
        }
    }
</style>