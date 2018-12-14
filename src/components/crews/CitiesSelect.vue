<template>
    <div class="selectedCities">
        <button v-for="city, index in cities" :key="index" class="city" :title="$t('crews.edit.removeCity')" @click="remove(city)">
            <span>{{city.name}}, {{city.country}}</span><span class="remove">X</span>
        </button>
    </div>
</template>

<script>
    export default {
        name: "CitiesSelect",
        props: ['cities'],
        methods: {
            remove(city) {
                this.$emit('vca-remove-city', city)
            }
        }
    }
</script>

<style scoped lang="less">
    @import './assets/general.less';

    .selectedCities {
        margin-left: 0.5em;
        margin-right: 0.5em;
        margin-top: 0.5em;
    }
    .city {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        background: transparent;
        border: 0;
        &:hover {
            .colorProfileThirdly();
        }
    }
</style>