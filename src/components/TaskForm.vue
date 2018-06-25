<template>
    <div id="TaskForm">
        <el-form
                :model="TaskForm"
                :rules="rules"
                ref="TaskForm"
                status-icon>
            <el-form-item
                    label="Title:"
                    prop="taskTitle">
                <el-input
                        v-model="TaskForm.taskTitle"></el-input>
            </el-form-item>
            <el-form-item
                    label="Description:">
                <el-input
                    v-model="TaskForm.description"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    placeholder="Please input a description">
                </el-input>
            </el-form-item>
            <el-form-item
                    label="Deadline:">
                <div id="deadline">
                <el-date-picker
                    v-model="TaskForm.deadline"
                    tapye="date"
                    placeholder="Pick a deadline">
                </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item
                label="Supportercounter:">
                <div id="counter">
                <el-input-number
                    v-model="TaskForm.counter"
                    @change="handleChange"
                    :min="1">
                </el-input-number>
                </div>
            </el-form-item>
            <el-button
                    type="primary"
                    @click.prevent="resetForm"
                    icon="el-icon-close">Reset</el-button>
            <el-button
                    type="primary"
                    @click.prevent="submitForm"
                    icon="el-icon-arrow-right">Hinzufügen</el-button>
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
                        {required: true, message: 'Please give your Task a title.', trigger: 'blur'},
                        {pattern:/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, message: 'Use a Title like: Lager aufräumen', trigger: 'blur'}
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