<template>
  <div v-if="hasError()" class="crew-list error">
    <span v-if="errorState === 401">{{ $vcaI18n.t('error.notAuthenticated') }}</span>
    <span v-else-if="errorState === 403">{{ $vcaI18n.t('error.forbidden') }}</span>
    <span v-else>{{ $vcaI18n.t('error.unknown') }}</span>
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
      {{ $vcaI18n.tc('label.pagination.button.previous', page.howManyPrevious(), { 'number': page.howManyPrevious() }) }}
    </button>
    <WidgetUsers v-if="type !== 'tableRow'" :users="users" :type="type" />
    <TableUsers v-else :users="users" />
    <button v-if="config.hasPagination() && page.hasNext()" v-on:click="addPage" class="paginate">
      {{ $vcaI18n.tc('label.pagination.button.next', page.howManyNext(), { 'number': page.howManyNext() }) }}
    </button>
  </div>
</template>

<script>
  import Vue from 'vue'
  import CrewModel from './CrewModel'
  export default {
    name: "CrewList",
    props: ['value'],
    data() {
      return {
      limit: {
        pageSize: this.pageSize,
        offset: 0
      },
        // multipleSelection: [],
          tableSize: "medium",

        crewdata: [{
          crewname: 'Berlin',
          cities: 'Berlin',
          country: 'Deutschland'
        }, {
          crewname: 'Airfurt',
          cities: 'Erfurt, Weimar',
          country: 'Deutschland'
        },{
          crewname: 'Amsterdamm',
          cities: 'Amsterdamm',
          country: 'Niederlande'
        }],
      
    }
      },

      methods: {
        //getCrewList() {
        //  this.$options.sockets.onopen = () => this.$socket.send(JSON.stringify({operation: 'INSERT', query: [ { limit: this.limit.pageSize, offset: this.limit.offset }]}))
        //  this.$options.sockets.onmessage = (data) => console.log(data)
        //},
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        handleEdit(index, row) {
              console.log(index, row);
          },
        handleDelete(index, row) {
              console.log(index, row);
          }
      }
      //mounted() {
      //  this.getCrewList()
      //}


    }
</script>

<style scoped>
    #ListMenu {
        float: right;
    }
</style>
