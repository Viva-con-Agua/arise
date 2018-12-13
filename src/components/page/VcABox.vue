<template>
    <el-card class="box-card" :class="getClasses()">
        <div
                slot="header"
                class="title">
            <h2>{{ title }}</h2>
        </div>
        <slot></slot>
    </el-card>
</template>

<script>
    import Vue from 'vue'
    import {
        Card
    } from 'element-ui'
    Vue.use(Card);

    export default {
        name: "VcABox",
        props: ['first', 'title', 'expand', 'className'],
        methods: {
            getClasses() {
                var classNames = this.first ? 'head' : 'tail'
                classNames += ((typeof this.expand !== "undefined") && this.expand !== null && this.expand) ? ' expand' : ' no-expand'
                classNames += ((typeof this.className !== "undefined" && this.className !== null && this.className !== "")) ? ' ' + this.className : ''
                return classNames
            }
        }
    }
</script>

<style scoped>
    .box-card {
        width: 100%;
    }

    .box-card.tail {
        margin-top: 2em;
    }

    .box-card.expand {
        flex-grow: 1;
    }

    .title > h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin: 0;
    }
</style>