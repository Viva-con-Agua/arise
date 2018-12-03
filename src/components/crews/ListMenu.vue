<template>
  <ul class="listMenu">
    <li v-if="config.hasSortingSelect() || this.hasSortingDirButton()" class="sorting">
      <v-select v-if="config.hasSortingSelect()" v-model="sorting.getCurrentField()" @input="fireFieldSelection" :options="sorting.getFields()" :clearable="false"></v-select>
      <button v-if="config.hasSortingDirButton()" v-bind:value="sorting.sortDir" @click="fireSortDirSelection" :title="$t('crewlist.sorting.dirButton.' + sorting.sortDir)">
        <div v-if="sorting.is('ASC')" v-html="require('./images/sort-alpha-down.svg')" />
        </div>
        <div v-if="sorting.is('DESC')" v-html="require('./images/sort-alpha-up.svg')">
          </div>
      </button>
    </li>
  </ul>
</template>

<script>
  // import Vue from 'vue'
  import vSelect from 'vue-select'
  export default {
    name: 'ListMenu',
    props: ['type', 'sorting', 'config'],
    components: {
      'v-select': vSelect
    },
    data () {
      var types = [
        {
          'label': this.$vcaI18n.t('label.typeSelection.large'),
          'value': 'large'
        },
        {
          'label': this.$vcaI18n.t('label.typeSelection.medium'),
          'value': 'medium'
        },
        {
          'label': this.$vcaI18n.t('label.typeSelection.small'),
          'value': 'small'
        },
        {
          'label': this.$vcaI18n.t('label.typeSelection.table'),
          'value': 'tableRow'
        }
      ]
      return {
        'typeData': types.filter((t) => t.value === this.type).pop(),
        'types': types
      }
    },
    methods: {
      fireTypeSelection: function () {
        this.$emit('typeSelect', this.typeData.value)
      },
      fireFieldSelection: function (event) {
        this.sorting.setField(event.value)
        this.$emit('sortFieldSelect', event.value)
      },
      fireSortDirSelection: function (event) {
        if (event.target.value === 'ASC') {
          this.sorting.setDir('DESC')
        } else {
          this.sorting.setDir('ASC')
        }
        this.$emit('sortDirSelect', this.sorting.sortDir)
      }
    }
  }
</script>
<style scoped lang="less">
  @import "./assets/general";
  @import "./assets/responsive";
  .listMenu {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0;
    list-style-type: none;
    @media @phone-down {
      flex-direction: column;
      justify-content: flex-start;
    }
  }
  .listMenu li {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    &:not(:first-child) {
      margin-left: 1em;
      @media @phone-down {
        margin-top: 0.5em;
        margin-left: 0em;
      }
    }
  }
  .listMenu li .v-select {
    min-width: 10em;
    @media @phone-down {
      flex-grow: 1;
    }
  }
  .listMenu li button {
    .svgButton()
    
  }
</style>
