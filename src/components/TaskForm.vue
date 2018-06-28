<template>
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
                <el-input
                    v-model="TaskForm.description"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    v-bind:placeholder="$t('taskform.descriptionPlaceholder')">
                </el-input>
            </el-form-item>
            <!--<el-form-item
                    label="Deadline:">
                <div id="deadline">
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
    export default {

        name: "TaskForm",
        components: {

        },

        data() {
            return {
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
                }
            }
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
        }
    }
</script>

<style scoped>

    #deadline{
        clear: both;
        float: left;
    }

    #counter{
        clear: both;
        float: left;
    }
</style>