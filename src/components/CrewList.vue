<template>
  <div id="CrewList">
    <!--    <div id="ListMenu">
      <el-radio-group
      v-model="tableSize"
      size="small">
      <el-radio-button label="medium" value="medium">medium</el-radio-button>
      <el-radio-button label="small" value="small" >small</el-radio-button>
      <el-radio-button label="mini" value="mini" ><i class="el-icon-minus"></i></el-radio-button>
    </el-radio-group>
      <el-button size="small" icon="el-icon-search">Search</el-button>
    </div>-->
    <el-table
      :size="tableSize"
      :data="value"
      style="width: 100%">
      <!--      <el-table-column
        type="selection"
        fixed="left">
      </el-table-column>-->
      <el-table-column
        :label="$t('crewlist.label.crewname')"
        sortable
        prop="crewname"
        align="left"/>
      <el-table-column
        :label="$t('crewlist.label.cities')"
        sortable
        prop="cities"
        align="left"/>
      <el-table-column
        :label="$t('crewlist.label.country')"
        sortable
        prop="country"
        align="left"/>
      <el-table-column
        :label="$t('crewlist.label.operations')"
        align="left">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"/></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"/></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Table,
    TableColumn
  } from 'element-ui'


  Vue.use(Table);
  Vue.use(TableColumn);


    export default {
      name: "CrewList",
      props: ['value'],
      data() {
        return {
          // multipleSelection: [],
            tableSize: "medium",

          /*crewdata: [{
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
          }],*/
        }
      },

      methods: {
/*        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.crewdata.toggleRowSelection(row);
            });
          } else {
            this.$refs.crewdata.clearSelection();
          }
        },

        handleSelectionChange(val) {
          this.multipleSelection = val;
        },*/
        handleEdit(index, row) {
              console.log(index, row);
          },
        handleDelete(index, row) {
              console.log(index, row);
          }
      },


    }
</script>

<style scoped>
    #ListMenu {
        float: right;
    }
</style>
