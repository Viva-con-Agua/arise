<template>
    <div id="arise">
        <WidgetTopNavigation />
        <div id="content">
            <router-view/>
        </div>
        <WidgetBottomNavigation />
    </div>
</template>

<script>
    import { WidgetTopNavigation, WidgetBottomNavigation } from 'vca-widget-navigation';
    import 'element-ui/lib/theme-chalk/index.css';
    // import "@/assets/css/general.css";

    export default {
        name: 'Arise',
        components: { WidgetTopNavigation, WidgetBottomNavigation }
    }
</script>

<style lang="less">
    @import "assets/less/form";

    #arise {
        /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: min-content;
    }
    #content {
        display: block;
        overflow: overlay;
    }
</style>
