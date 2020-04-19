<template>
    <div id="upload">
        <!--UPLOAD-->
        <form enctype="multipart/form-data" novalidate>
            <div class="dropbox">
                <input type="file" :name="uploadFieldName" :disabled="isTrue" @change="filesChange"
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
    import {
        Notification
    } from 'element-ui'

    Vue.use(Notification);

    const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

    const maxFileSize = 5242880;

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
            isTrue () {
              return true
            },
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
        methods: {
            reset() {
                // reset form to initial state
                this.currentStatus = STATUS_INITIAL;
                this.uploadedFiles = [];
                this.uploadError = null;
            },
            filesChange(event) {
                if(this.checkFileSize(event.target)) {
                    var next = (formData) => this.save(formData, (newImg) => this.$emit('vca-images', newImg))
                    this.transform(event.target.name, event.target.files, next)
                }
            },
            checkFileSize(inputField) {
                var fine = true
                for(var i = 0; i < inputField.files.length; i++) {
                    if(inputField.files[i].size > maxFileSize) {
                        inputField.value = ""
                        fine = false
                        this.open(this.$t("upload.maxLength.title"), this.$t("upload.maxLength.max"), "error")
                    }
                }
                return fine
            },
            transform(fieldName, fileList, next) {
                var caller = (id, file) => {
                    const formData = new FormData()
                    formData.append("image", file, id)
                    next(formData)
                }
                for(var i = 0; i < fileList.length; i++) {
                    var file = fileList[i]
                    caller(file.name, file)
                }
            },

            save(formData, callback) {
                var errorCallback = err => {
                    switch(err.response.status) {
                        case 500:
                            this.open(this.$t("error.ajax.serverError.title"), this.$t("error.ajax.serverError.msg"), "error")
                            break
                        case 403:
                            this.open(this.$t("error.ajax.forbidden.title"), this.$t("error.ajax.forbidden.msg"), "error")
                            break
                        case 401:
                            this.open(this.$t("error.ajax.unAuthorized.title"), this.$t("error.ajax.unAuthorized.msg"), "error")
                            break
                        default:
                            this.open(this.$t("error.ajax.default.title"), this.$t("error.ajax.default.msg"), "error")
                            break
                    }
                }

                var successCallback = response => {
                    if(response.status === 200) {
                        callback(response.data.additional_information)
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
