<template xmlns:v-quill="http://www.w3.org/1999/xhtml">
  <div id="TaskForm">
    <el-form
      ref="TaskForm"
      :model="TaskForm"
      :rules="rules"
      status-icon>
      <el-form-item
        :label="$t('taskform.label.title')"
        prop="taskTitle">
        <el-input
          v-model="TaskForm.taskTitle"/>
      </el-form-item>
      <el-form-item
        :label="$t('taskform.label.description')">
        <quill-editor
          theme="vca"
          @change="onEditorChange($event)"/>
      </el-form-item>
      <el-form-item
        :label="$t('taskform.label.accessrights')">
        <div class="clear">
          <Transfer v-model="rights"/>
        </div>
      </el-form-item>
      <!--

       ***Implementierte felder für Deadline und Supportercounter
      -->

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
                <div id="counter">2
                <el-input-number
                    v-model="TaskForm.counter"
                    @change="handleChange"
                    :min="1">
                </el-input-number>
                </div>
            </el-form-item>-->
      <el-button
        type="text"
        icon="el-icon-close"
        @click.prevent="resetForm">{{ $t('options.reset') }}</el-button>
      <el-button
        type="primary"
        icon="el-icon-arrow-right"
        @click.prevent="submitForm">{{ $t('options.submit') }}</el-button>
    </el-form>
  </div>
</template>

<script>
    import Vue from 'vue'
//    import treeTransfer from 'el-tree-transfer'
    import Transfer from '@/components/transfer'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import VueQuillEditor from 'vue-quill-editor'

    Vue.use(VueAxios, axios, VueQuillEditor);

    export default {
        name: "TaskForm",
        components: {
            Transfer,
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
            submitForm() {
                this.$refs.TaskForm.validate((valid) => {
                    if (valid) {
                        alert('submit!');
                      this.axios
                        .post('http://localhost:3000/test', {
                          data: this.TaskForm,
                        })
                        .catch(error => {
                          console.log(error)
                          this.errored = true
                        })
                        .finally(() => this.loading = false)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            resetForm() {
                this.$refs.TaskForm.resetFields();
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