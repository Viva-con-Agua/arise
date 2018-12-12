<template>
  <div class="query-tags">
    <SearchTag v-for="(f,k) in query.getFields()" :field="f" :key="k" v-on:removeField="handleRemove" />
  </div>
</template>

<script>
  import SearchTag from './SearchTag'

  export default {
    name: "SearchTagQuery",
    components: {
      'SearchTag': SearchTag
    },
    props: ['query', 'index'],
    methods: {
      handleRemove (event) {
        this.query.removeField(event)
        this.$emit('changeQuery', {
          'query': this.query,
          'index': this.index
        })
      }
    }
  }
</script>

<style scoped>

  .query-tags {
    display: flex;
    flex-direction: row;
  }

</style>
