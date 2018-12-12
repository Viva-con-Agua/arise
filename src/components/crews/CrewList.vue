<template>
  <div v-if="hasError()" class="crew-list error">
    <span v-if="errorState === 401">{{ $t('error.notAuthenticated') }}</span>
    <span v-else-if="errorState === 403">{{ $t('error.forbidden') }}</span>
    <span v-else>{{ $t('error.unknown') }}</span>
  </div>
  <div v-else class="crew-list">
    <SearchField v-bind:query="query" v-on:newQuery="setQuery" />
    <ListMenu v-bind:type="type"
              v-bind:sorting="sorting"
              v-on:typeSelect="setType"
              v-on:sortDirSelect="setSortingDir"
              v-on:sortFieldSelect="setSortingField"
              v-if="config.hasMenue()"
              v-bind:config="config"
    />
    <button v-if="config.hasPagination() && page.hasPrevious()" v-on:click="removePage" class="paginate">
      {{ $t('crews.button.previous', page.howManyPrevious(), { 'number': page.howManyPrevious() }) }}
    </button>
    <TableCrews v-else :crews="crews" v-on:select-crew="selectCrew"/>
    <button v-if="config.hasPagination() && page.hasNext()" v-on:click="addPage" class="paginate">
      {{ $t('crews.button.next', page.howManyNext(), { 'number': page.howManyNext() }) }}
    </button>
  </div>

</template>

<script>
  import axios from 'axios'
  import Config from './utils/Config'
  import Page from './utils/Page'
  import Sorting from './utils/Sorting'
  import ListMenu from './ListMenu'
  import SearchField from './SearchField'
  import TableCrews from './TableCrews'
  export default {
    name: 'CrewList',
    props: ['options', 'webSocket'],
    components: {
      'ListMenu': ListMenu,
      'SearchField': SearchField,
      'TableCrews': TableCrews
    },
    data () {
      var config = new Config(this.options)
      var pageParams = config.getPage()
      return {
        config: config,
        type: config.getType(),
        crews: [],
        page: Page.apply(0, pageParams.sliding, pageParams.size),
        sorting: new Sorting(config.getType(), this.$vcaI18n, config.getSortingInit()),
        query: { 'query': '', 'values': {} },
        errorState: null
      }
    },
    created () {
      
      this.$options.sockets.onmessage = (data) => this.checkPageUpdates(data);
      this.sorting = new Sorting(this.config.getType(), this.$vcaI18n, this.config.getSortingInit())
      this.getCount()
      this.getPage()
    },
    methods: {
      selectCrew: function (event) {
          this.$emit('select-crew', event)
      },
      addPage: function () {
        if (this.page.hasNext()) {
          this.page = this.page.next()
          this.getPage()
        }
      },
      checkPageUpdates: function (data) {
          console.log(data)
          this.getPage()
      },
      removePage: function () {
        if (this.page.hasPrevious()) {
          this.page = this.page.previous()
          this.getPage()
        }
      },
      getPage: function () {
        var request = {
          'values': this.query.values,
          'sort': this.sorting.toJSONRequest(),
          'limit': this.page.getSize(),
          'offset': this.page.getOffset()
        }
        if(this.query.query !== null && (typeof this.query.query !== "undefined") && this.query.query !== "") {
          request['query'] = this.query.query
   }
        axios.post('/drops/webapp/crew/list', request)
              .then(response => {
                switch (response.status) {
                  case 200:
                    this.crews = response.data.additional_information
                    break
                }
              }).catch(error => {
                this.errorState = error.response.status
              })
      },
      getCount: function() {
        var request = {
          'values': this.query.values
        }
        if(this.query.query !== null && (typeof this.query.query !== "undefined") && this.query.query !== "") {
          request['query'] = this.query.query
        }
        axios.post('/drops/webapp/crew/count', request)
          .then(response => {
          switch (response.status) {
            case 200:
              this.page = Page.apply(response.data.additional_information.count, this.config.getPage().sliding, this.config.getPage().size)
              break
        }
        }).catch(error => {
            this.errorState = error.response.status
        })
      },
      setType: function (event) {
        this.type = event
        this.sorting.setType(this.type)
      },
      setSortingDir: function (event) {
        this.sorting.setDir(event)
        this.getPage()
      },
      setSortingField: function (event) {
        this.sorting.setField(event)
        this.getPage()
      },
      setQuery: function(event) {
        if(event.state === "success") {
          this.query = event
          this.getCount()
          this.getPage()
        }
      },
      hasError () {
        return this.errorState !== null && (typeof this.errorState !== 'undefined')
      }
    }
  }
</script>

<style scoped lang="less">
  @import './assets/general.less';
  .crew-list {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    &.error {
      align-items: center;
      text-align: center;
      span {
        .colorProfileThirdly();
        border-radius: @radius;
        height: 2em;
        box-shadow: #shadow[primary];
        line-height: 2em;
      }
    }
  }
  .paginate {
    height: 2.5em;
    .inputElement();
    cursor: pointer;
    background: none;
  }
</style>
