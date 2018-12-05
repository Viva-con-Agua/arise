<template>
    <p class="infoBox">
        <slot></slot>
    </p>
</template>

<script>
    export default {
        name: "VcAInfoBox"
    }
</script>

<style scoped>

    .infoBox {
        background-color: rgba(165, 119, 64, 0.6);
        border: 1px dashed rgba(165, 119, 64, 1);
        -webkit-border-radius: 0.3em;
        -moz-border-radius: 0.3em;
        border-radius: 0.3em;
        padding: 0.5em;
    }

</style>