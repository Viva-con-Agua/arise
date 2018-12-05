<template>
    <el-card class="box-card" :class="first ? 'head' : 'tail'">
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
        props: ['first', 'title']
    }
</script>

<style scoped>
    .box-card {
        width: 100%;
    }

    .box-card.tail {
        margin-top: 2em;
    }

    .title > h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin: 0;
    }
</style>