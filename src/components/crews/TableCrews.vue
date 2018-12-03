<template>
    <table class="crews-table">
      <thead>
        <TableRow type="header" />
      </thead>
      <tbody>
        <TableRow v-for="(crew, i) of crews" :crew="crew" :key="crew.id" v-on:select-crew="selectCrew" />
      </tbody>
    </table>
</template>

<script>
    import TableRow from './TableRow'
    export default {
      name: 'TableCrews',
      components: { TableRow },
      props: ['crews'],
      data () {
        return {
          selected: ''
        }
      },
      methods:{
        selectCrew: function (event) {
          this.$emit('select-crew', event)
        },
      }
    }
</script>
<style scoped lang="less">
  @import "./assets/general.less";
  .crews-table {
    border: 0.3em;
    border-color: #colors[primary];
    border-spacing: 0.5rem;
    border-collapse: collapse;
    overflow-y: auto;
  }
</style>
