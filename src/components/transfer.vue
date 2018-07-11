<template>
    <div class="transfer">
        <div class="transferSource">
    <h2> available rights</h2>
    <el-table
            :ref="sourceTable"
            :data="value"
            :disabled="onSourceCheckedChange"
            @selection-change="onSourceCheckedChange">
        <el-table-column
            type="selection"
            fixed="left"
            width="30">
        </el-table-column>
        <el-table-column
                label="Name"
                prop="name">
        </el-table-column>
        <el-table-column
                label="Description"
                prop="description">
        </el-table-column>
        <el-table-column
                prop="tag"
                label="Tag"
                width="100"
                :filters="[{ text: 'write', value: 'write' }, { text: 'read', value: 'read' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag
                        :type="scope.row.tag === 'write' ? 'primary' : 'success'"
                        disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
        </el-table-column>
<!--        <el-table-column type="expand">
            <template slot-scope="props">
                <p>Uri: {{  }}</p>
                <p>Method: {{  }}</p>
                <p>Service: {{  }}</p>
            </template>
        </el-table-column>-->
    </el-table>
        </div>
        <div class="transfer-buttons">
            <el-button
                    type="primary"
                    :class="['el-transfer__button']"
                    @click.native="addToRight"
                    :disabled="leftChecked.length === 0">
                <i class="el-icon-arrow-right"></i>
            </el-button>
            <el-button
                    type="primary"
                    :class="['el-transfer__button']"
                    @click.native="addToLeft"
                    :disabled="rightChecked.length === 0">
                <i class="el-icon-arrow-left"></i>
            </el-button>
        </div>
        <div class="transferTarget">
            <h2>user rights</h2>
    <el-table
            :data="multipleSelection"
            @selection-change="onTargetCheckedChange">
        <el-table-column
                type="selection"
                fixed="left"
                width="30">
        </el-table-column>
        <el-table-column
                label="Name"
                prop="name"
                width="120">
        </el-table-column>
        <el-table-column
                prop="tag"
                label="Tag"
                width="100"
                :filters="[{ text: 'write', value: 'write' }, { text: 'read', value: 'read' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag
                        :type="scope.row.tag === 'write' ? 'primary' : 'success'"
                        disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
                label="Operations">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
    </div>
</template>

<script>
    import ElButton from 'element-ui/packages/button';

    export default {
        name: "transfer",
        props: ['value','value2'],
        components: {
            ElButton,
        },

        data() {
            return {
                multipleSelection: [],
                leftChecked: [],
                rightChecked: []

            }
        },


        methods: {
/*            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.value.toggleRowSelection(row);
                    });
                }
                else {
                    this.$refs.value.clearSelection();
                }
            },*/

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.sourceTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.sourceTable.clearSelection();
                }
            },

            onSourceCheckedChange(val, movedKeys) {
                this.leftChecked = val;
                if (movedKeys === undefined) return;
                this.$emit('left-check-change', val, movedKeys);
            },

            onTargetCheckedChange(val, movedKeys) {
                this.rightChecked = val;
                if (movedKeys === undefined) return;
                this.$emit('right-check-change', val, movedKeys);
            },

            filterTag(value, row) {
                return row.tag === value;
            },

            tableRowDisable({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'disabledRow'
                }
                return '';

            },

            addToLeft() {
            //     let currentValue = this.value.slice();
            //     this.rightChecked.forEach(item => {
            //         const index = currentValue.indexOf(item);
            //         if (index > -1) {
            //             currentValue.splice(index, 1);
            //         }
            //     });
            //     this.$emit('input', currentValue);
            //     this.$emit('change', currentValue, 'left', this.rightChecked);
             },

            addToRight() {
                // let currentValue = this.value.slice();
                // const itemsToBeMoved = [];
                // const key = this.props.key;
                // this.data.forEach(item => {
                //     const itemKey = item[key];
                //     if (
                //         this.leftChecked.indexOf(itemKey) > -1 &&
                //         this.value.indexOf(itemKey) === -1
                //     ) {
                //         itemsToBeMoved.push(itemKey);
                //
                //     }
                // });
                // currentValue = this.targetOrder === 'unshift'
                //     ? itemsToBeMoved.concat(currentValue)
                //     : currentValue.concat(itemsToBeMoved);
                // this.$emit('input', currentValue);
                // this.$emit('change', currentValue, 'right', this.leftChecked);
                var i;
                var len = this.leftChecked.length;
                for (i=0; i < len; i++) {
                    this.multipleSelection.push(this.leftChecked[i]);
                    onSourceCheckedChange.cleanSelection();
                }
            },

        }
    }
</script>

<style scoped>
    el.table .disableRow {
        background: #ccc;
    }

    .transfer {
        display: flex;
    }
    .transferSource {
             width: 48%;
    }
    .transfer-buttons {
        margin: 10% auto;
        position: relative;
    }
    .transferTarget {
        width: 48%;
    }
</style>