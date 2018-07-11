<template xmlns:v-quill="http://www.w3.org/1999/xhtml">
    <div id="TaskForm">
        <el-form
                :model="TaskForm"
                :rules="rules"
                ref="TaskForm"
                status-icon>
            <el-form-item
                    v-bind:label="$t('taskform.label.title')"
                    prop="taskTitle">
                <el-input
                        v-model="TaskForm.taskTitle"></el-input>
            </el-form-item>
            <el-form-item
                    v-bind:label="$t('taskform.label.description')">
<!--                <el-input
                    v-model="TaskForm.description"
                    type="textarea"
                    :autosize="{ minRows: 8, maxRows: 16}"
                    v-bind:placeholder="$t('taskform.descriptionPlaceholder')">
                </el-input>-->
                <quill-editor
                              theme="vca"
                              @change="onEditorChange($event)">
                </quill-editor>
            </el-form-item>
            <el-form-item
                v-bind:label="$t('taskform.label.accessrights')">
                <div class="clear">
                    <Transfer v-model="this.rights"> </Transfer>
                </div>
            </el-form-item>
<!--            <el-form-item
                v-bind:label="$t('taskform.label.accessrights')">
                <div class="clear">
                    <tree-transfer
                        :title = "['dies', 'das']"
                        :from_data = 'formData'
                        :to_data = 'toData'
                        @addBtn='add'
                        @removeBtn='remove'>
                        </tree-transfer>
                </div>
            </el-form-item>-->
            <!--<el-form-item
                    label="Deadline:">
                <div class="clear">
                <el-date-picker
                    v-model="TaskForm.deadline"
                    tapye="date"
                    placeholder="Pick a deadline">
                </el-date-picker>
                </div>
            </el-form-item>-->
           <!-- <el-form-item
                label="Supportercounter:">
                <div id="counter">
                <el-input-number
                    v-model="TaskForm.counter"
                    @change="handleChange"
                    :min="1">
                </el-input-number>
                </div>
            </el-form-item>-->
            <el-button
                    type="text"
                    @click.prevent="resetForm"
                    icon="el-icon-close">{{ $t('options.reset') }}</el-button>
            <el-button
                    type="primary"
                    @click.prevent="submitForm"
                    icon="el-icon-arrow-right">{{ $t('options.submit') }}</el-button>
        </el-form>
    </div>
</template>

<script>
    import treeTransfer from 'el-tree-transfer'
    import Transfer from '@/components/transfer'

    export default {
        name: "TaskForm",
        components: {
            Transfer,
            treeTransfer,
        },

        data() {
            return {
                rights: [],

                TaskForm: {
                    taskTitle: '',
                    description: '',
                    deadline: '',
                    counter: 1,
                },

                rules: {
                    taskTitle: [
                        {required: true, message: this.$t('validationError.taskTitle'), trigger: 'blur'},
                        {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: this.$t('inputSample.taskTitle'), trigger: 'blur'}
                    ],
                },

                value: [],
                value2: [],



/*            filterMethod(query, item) {
                    return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                }*/

/*                formData: [
                    {
                        id: "1",
                        pid: 0,
                        lv: 0,
                        label: "microservice 1",
                        children: [
                            {
                                id: "1-1",
                                pid: "1",
                                label: "access right 1-1",
                                children: []
                            },
                            {
                                id: "1-2",
                                pid: "1",
                                label: "access right 1-2",
                                children: []
                            }
                        ],
                    },{
                            id: "2",
                            pid: 0,
                            lv: 0,
                            label: "microservice 2",
                            children: [
                                {
                                    id: "2-1",
                                    pid: "2",
                                    label: "access right 2-1",
                                    children: []
                                },
                                {
                                    id: "2-2",
                                    pid: "2",
                                    label: "access right 2-2",
                                    children:[]
                                }
                            ]
                        },
                    ],
                    toData: [],*/


            }
        },

        created() {
            this.axios
                .post('http://localhost:3000/access')
                .then(response => (this.rights = response.data))
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
        },

        beforeDestroy: function () {
            this.rights = null
        },

        methods: {
            submitForm(TaskForm) {
                this.$refs[TaskForm].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            resetForm(TaskForm) {
                this.$refs[TaskForm].resetFields();
            },

            handleChange(value) {
                console.log(value)
            },

            onEditorChange({ quill, html, text }) {
                console.log('editor change!', quill, html, text)
                this.content = html
            },

            // 监听穿梭框组件添加
            add(data){
                console.log(data)
            },
            // 监听穿梭框组件移除
            remove(data){
                console.log(data)
            }
        }
    }
</script>

<style scoped>

    .clear{
        clear: both;
    }

    #counter{
        clear: both;
        float: left;
    }
</style>