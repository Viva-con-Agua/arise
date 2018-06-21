<template>
  <div id="CrewList">
    <div id="ListMenu">
      <el-radio-group
      v-model="tableSize"
      size="small">
      <el-radio-button label="medium" value="medium">medium</el-radio-button>
      <el-radio-button label="small" value="small" >small</el-radio-button>
      <el-radio-button label="mini" value="mini" ><i class="el-icon-minus"></i></el-radio-button>
    </el-radio-group>
      <el-button size="small" icon="el-icon-search">Search</el-button>
    </div>
    <el-table
      ref="crewdata"
      :size="tableSize"
      :data="value"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        witdh="55">
      </el-table-column>
      <el-table-column
        sortable
        label="Name"
        prop="crewname">
      </el-table-column>
      <el-table-column
        sortable
        label="City/Cities"
        prop="cities">
      </el-table-column>
      <el-table-column
        sortable
        label="Country"
        prop="country">
      </el-table-column>
      <el-table-column
                label="Operations">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
            </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      layout="prev, pager, next"
      :total="50">
    </el-pagination>
  </div>
</template>

<script>
    export default {
      name: "CrewList",
      props: ['value'],
      data() {
        return {
          multipleSelection: [],
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
        },*/

        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
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
