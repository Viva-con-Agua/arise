<template>
  <div class="searchWrapper">
    <div class="search">
      <input v-bind:value="keyword" :placeholder="$t('label.placeholder.search')"
             v-on:input="input" v-on:keyup.enter="clean" v-on:keyup.space="clean" />
      <button @click="clean" :title="$t('label.search.button.and')">
      </button>
    </div>
    <vue-scrollbar classes="tags-scroll" ref="VueScrollbar" :key="rerender">
      <div class="tags" ref="tags" :style="'width: ' + tagsWidth + 'px'">
        <template v-for="(q,k) in currentQueries">
          <div ref="tagQueries" class="tagQueries">
            <SearchTagQuery :query="q" :index="k" :key="k" v-on:changeQuery="updateQuery" />
            <div v-if="k !== (currentQueries.length - 1)" class="divider" />
          </div>
        </template>
      </div>
    </vue-scrollbar>
  </div>
</template>

<script>
  import FilterQuery from './utils/FilterQuery'
  import SearchTagQuery from './SearchTagQuery'
  import VueScrollbar from 'vue2-scrollbar'
    export default {
      name: "SearchField",
      components: {
        'SearchTagQuery': SearchTagQuery,
        VueScrollbar
      },
      props: ['query'], // Todo: Do something with that given query!
      data () {
        return {
          "keyword": "",
          "currentQueries": [],
          "pointer": 0,
          "rerender": false,
          "tagsWidth": 0,
        }
      },
      methods: {
        input: function (event) {
          this.keyword = event.target.value.trim()
          if(this.keyword !== "") {
            this.currentQueries.splice(this.pointer, 1, FilterQuery.apply(this.keyword))
          } else {
            this.currentQueries.splice(this.pointer, 1)
            this.clean()
          }
          this.calculateTagsWidth()
          this.issueRequest()
        },
        updateQuery (event) {
          this.currentQueries.splice(event.index, 1, event.query)
          if(event.query.isEmpty()) {
            this.currentQueries.splice(event.index, 1)
          }
          this.clean()
          this.calculateTagsWidth()
          this.issueRequest()
        },
        issueRequest () {
          var queries = this.currentQueries.slice(0)
          if(queries.length > 0) {
            var query = queries.pop()
            query = queries.reduce((acc, current) => acc.and(current), query)
            var res = {'state': 'error'}
            if (typeof query !== "undefined") {
              res = query.getQuery()
              res['state'] = query.status
            }
            this.$emit('newQuery', res)
          } else {
            this.$emit('newQuery', {
              'state': 'success',
              'query': "",
              'values': {}
            })
          }
        },
        clean () {
          this.keyword = ""
          this.pointer = this.currentQueries.length
        },
        calculateTagsWidth () {
          if(this.$refs.hasOwnProperty("tagQueries")) {
            this.tagsWidth = this.$refs.tagQueries.reduce((acc, div) => acc + div.clientWidth, 0)
            this.$refs.tags.style.width = this.tagsWidth + "px"
            this.rerender = !(this.rerender)
          }
        }
      }
    }
</script>

<style scoped lang="less">
  @import './assets/general.less';
  @import './assets/vue2-scrollbar.css';
  .searchWrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
  }
  .tags-scroll {
    width: 100%;
    min-width: 100%;
    max-height: 4em;
  }
  .tags, .tagQueries {
    display: flex;
    flex-direction: row;
  }
  .tags {
    min-width: 100%;
  }
  .search {
    display: flex;
    flex-direction: row;
    input {
      flex-grow: 1;
      .inputElement();
      padding: 0 0.25em;
    }
    button {
      .svgButton()
    }
  }
  .divider {
    margin: 0.2em;
    padding: 0.5em 0.8em;
    & /deep/ svg {
      width: 1.5em;
      fill: #colors[primaryDeactivated];
    }
  }
</style>

