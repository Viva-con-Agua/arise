<template>
    <div class="frame">
        <h1 v-if="hasTitle" class="pageTitle">{{ title }}</h1>
        <div id="columns" :class="!hasColumnsContainer() ? 'columns-container' : ''">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VcAFrame",
        props: [ 'title', 'hasContainer' ],
        methods: {
           hasTitle: function() {
               return (typeof this.title !== "undefined") && this.title !== null && this.title !== ""
           },
           hasColumnsContainer: function() {
               return (typeof this.hasContainer !== "undefined") && this.hasContainer
           }
        }
    }
</script>

<style scoped lang="less">
    .frame {
        flex: 1;
        padding-bottom: 1em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    }
    .pageTitle {
        align-self: center;
        padding: 0 0.2em;
    }

    .columns-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        height: 100%;
    }
    #columns /deep/ .columns-container {
        .columns-container();
    }
</style>