<template>
    <div id="upload">
        <!--UPLOAD-->
        <form enctype="multipart/form-data" novalidate>
            <div class="dropbox">
                <input type="file" :name="uploadFieldName" :disabled="isSaving || isFailed" @change="filesChange"
                       accept="image/*" class="input-file">
                <p v-if="isInitial" v-html="$t('upload.initial')"></p>
                <p v-if="isSaving" v-html="$t('upload.saving')"></p>
                <p v-if="isFailed" v-html="$t('upload.failure')"></p>
                <p v-if="isSuccess" v-html="$t('upload.success')"></p>
            </div>
        </form>
    </div>
</template>

<!-- Javascript -->
<script>
    import Vue from 'vue'
    import axios from 'axios'
    import {
        Notification
    } from 'element-ui'

    Vue.use(Notification);

    const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

    Notification.closeAll();

    export default {
        name: "Upload",
        props: ["upload"],
        data() {
            return {
                csrf: null,
                uploadedFiles: [],
                uploadError: null,
                currentStatus: null,
                uploadFieldName: 'avatar'
            }
        },
        computed: {
            isInitial() {
                return this.currentStatus === STATUS_INITIAL;
            },
            isSaving() {
                return this.currentStatus === STATUS_SAVING;
            },
            isSuccess() {
                return this.currentStatus === STATUS_SUCCESS;
            },
            isFailed() {
                return this.currentStatus === STATUS_FAILED;
            }
        },
        created: function() {
            // this.getCSRF()
        },
        methods: {
            // getCSRF() {
            //    axios.get('/drops/webapp/avatar/csrf')
            //        .then(response => {
            //            if(response.status === 200) {
            //                this.csrf = response.data.additional_information.token
            //            } else {
            //                this.currentStatus = STATUS_FAILED
            //            }
            //        }).catch(error => this.currentStatus = STATUS_FAILED)
            // },
            reset() {
                // reset form to initial state
                this.currentStatus = STATUS_INITIAL;
                this.uploadedFiles = [];
                this.uploadError = null;
            },
            filesChange(event) {
                var formData = this.createFormData(event.target.name, event.target.files)
                var imageGetURL = "/drops/webapp/avatar/get/"
                this.save(formData, (fileName) => this.$emit('vca-images', {
                    "url": imageGetURL + fileName,
                    "id": fileName
                }))
            },
            createFormData(fieldName, fileList) {
                // handle file changes
                const formData = new FormData();

                if (!fileList.length) return;

                // append the files to FormData
                Array
                    .from(Array(fileList.length).keys())
                    .map(x => {
                        formData.append(fieldName, fileList[x], fileList[x].name);
                    });
                return formData
            },
            // save(formData, callback) {
            //     // upload data to the server
            //     this.currentStatus = STATUS_SAVING;
            //     axios.post('/drops/webapp/avatar/upload?csrfToken=' + this.csrf, formData, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data'
            //         }
            //     })
            //         .then(response => {
            //             if(response.status === 200) {
            //                 callback(response.data.additional_information.fileName)
            //                 this.uploadedFiles = this.uploadedFiles.concat(response.data.additional_information.fileName);
            //                 this.currentStatus = STATUS_SUCCESS;
            //             }
            //         })
            //         .catch(err => {
            //             switch(err.response.status) {
            //                 case 500:
            //                     this.open($t("error.ajax.serverError.title"), $t("error.ajax.serverError.msg"), "error")
            //                     break
            //                 case 403:
            //                     this.open($t("error.ajax.forbidden.title"), $t("error.ajax.forbidden.msg"), "error")
            //                     break
            //                 case 401:
            //                     this.open($t("error.ajax.unAuthorized.title"), $t("error.ajax.unAuthorized.msg"), "error")
            //                     break
            //                 default:
            //                     this.open($t("error.ajax.default.title"), $t("error.ajax.default.msg"), "error")
            //                     break
            //             }
            //         });
            // },

            save(formData, callback) {
                var errorCallback = err => {
                    switch(err.response.status) {
                        case 500:
                            this.open($t("error.ajax.serverError.title"), $t("error.ajax.serverError.msg"), "error")
                            break
                        case 403:
                            this.open($t("error.ajax.forbidden.title"), $t("error.ajax.forbidden.msg"), "error")
                            break
                        case 401:
                            this.open($t("error.ajax.unAuthorized.title"), $t("error.ajax.unAuthorized.msg"), "error")
                            break
                        default:
                            this.open($t("error.ajax.default.title"), $t("error.ajax.default.msg"), "error")
                            break
                    }
                }

                var successCallback = response => {
                    if(response.status === 200) {
                        callback(response.data.additional_information.fileName)
                        this.uploadedFiles = this.uploadedFiles.concat(response.data.additional_information.fileName);
                        this.currentStatus = STATUS_SUCCESS;
                    }
                }
                // upload data to the server
                this.upload.image(formData, successCallback, errorCallback)
            },
            open(title, message, type) {
                Notification({
                    title:  title,
                    message: message,
                    type: type
                });
            }
        },
        mounted() {
            this.reset();
        },
    }
</script>

<!-- SASS styling -->
<style scoped lang="less">
    #colors() {
        primary: rgba(10, 107, 145, 1);
        primaryDeactivated: rgba(10, 107, 145, 0.5);
        secundary: #fff;
        thirdly: rgba(165, 119, 64, 0.6);
        thirdlyNoAlpha: rgb(199,170,137);
        thirdlyHover: rgba(165, 119, 64, 1);
    }

    @height: 10em;
    @padding: @height / 4;

    .dropbox {
        outline-width: 0.2em;
        outline-style: dashed; /* the dash box */
        outline-color: #colors[primary];
        outline-offset: -1em;
        background: #colors[secundary];
        color: #colors[primary];
        padding: 1em 1em;
        min-height: @height; /* minimum height */
        position: relative;
        cursor: pointer;
    }

    .input-file {
        opacity: 0; /* invisible but it's there! */
        width: 100%;
        height: @height;
        position: absolute;
        cursor: pointer;
    }

    .dropbox:hover {
        background: #colors[primaryDeactivated]; /* when mouse over to the drop zone, change color */
        outline-color: #colors[secundary];
        color: #colors[secundary];
    }

    .dropbox p {
        font-size: 1.2em;
        text-align: center;
        padding: @padding 0;
    }
</style>