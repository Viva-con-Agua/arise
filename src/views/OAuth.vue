<template>
    <div id="OAuth">
        <el-form
                :model="OAuth"
                :rules="rules"
                ref="OAuth">
            <el-form-item
                    label="ID:"
                    prop="id">
                <el-input
                        v-model="OAuth.id">
                </el-input>
            </el-form-item>
            <el-form-item
                    label="Secret:"
                    prop="secret">
                <el-input
                        v-model="OAuth.secret">
                </el-input>
            </el-form-item>
            <el-form-item
                label="Redirect URI:"
                prop="redirectURI">
            <el-input
                    v-model="OAuth.redirectURI">
            </el-input>
            </el-form-item>
            <el-form-item
                label="grantTypes:"
                prop="grantTypes">
            <el-input
                    v-model="OAuth.grantTypes"
                    :disabled="true">
            </el-input>
            </el-form-item>
            <el-button
                    type="primary"
                    @click.prevent="resetForm"
                    icon="el-icon-close">Reset</el-button>
            <el-button
                    type="primary"
                    @click.prevent="submitForm"
                    icon="el-icon-arrow-right">Sign Up</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {

        name: "OAuth",
        components: {

        },

        data() {
            return {
                OAuth: {
                    id: '',
                    secret: '',
                    redirectURI: '',
                    grantTypes: 'Authorization Code',
                },

                rules: {
                    id: [
                        {required: true, message: 'Please input a Title', trigger: 'blur'}
                    ],
                    secret: [
                        {required: true, message: 'Please input a Title', trigger: 'blur'}
                    ],
                    redirectURI: [
                        {required: true, message: 'Please input a Title', trigger: 'blur'}
                    ],
                    grantTypes: [
                        {required: true, message: 'Please input a Title', trigger: 'blur'}
                    ],
                }
            }
        },

        methods: {

            submitForm(OAuth) {
                this.$refs[OAuth].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            resetForm(OAuth) {
                this.$refs[OAuth].resetFields();
            },
        }
    }
</script>

<style scoped>

</style>