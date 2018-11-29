<template>
    <div class="column">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "VcAColumn"
    }
</script>

<style scoped lang="less">
    .column {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 30%;
        height: 100%;

        &:not(:first-child) {
            margin-left: 3em;
        }
    }
</style>