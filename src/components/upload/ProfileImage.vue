<template>
    <div class="profileImage">
        <Thumbs
                v-if="isUpload"
                :avatars="avatars"
                :rest="imageUpload"
                v-on:vca-images-delete="remove"
                v-on:vca-images-edit="load"
                v-on:vca-images-selected="select"
        />
        <Upload v-on:vca-images="bindFromUpload" v-if="isUpload" :upload="imageUpload" />
        <ImageCrop v-if="isCrop" :id="profileImage.id" :imageUrl="profileImage.imageUrl" :upload="imageUpload" v-on:vca-images-cropped="bindThumbs" />
    </div>
</template>

<script>
    import axios from 'axios'
    import Upload from '@/components/upload/Upload.vue'
    import ImageCrop from '@/components/upload/ImageCrop.vue'
    import ImageUpload from '@/components/upload/ImageUpload'
    import Thumbs from '@/components/upload/Thumbs'
    import Vue from 'vue'
    import {
        Notification
    } from 'element-ui'

    Vue.use(Notification);

    Notification.closeAll();

    const STATE_UPLOAD = 1, STATE_CROP = 2;

    export default {
        name: "ProfileImage",
        components: { Upload, ImageCrop, Thumbs },
        data() {
            return {
                "state": STATE_UPLOAD,
                "profileImage": {
                    "imageUrl": null,
                    "id": null,
                    "selected": false,
                    "thumbnails": []
                },
                "avatars": [],
                "imageUpload": null
            }
        },
        computed: {
            isUpload() {
                return this.state === STATE_UPLOAD
            },
            isCrop() {
                return this.state === STATE_CROP
            }
        },
        created () {
            this.imageUpload = new ImageUpload()
            this.init()
        },
        methods: {
            init() {
                axios.get("/drops/webapp/avatar/get")
                    .then(response => {
                        if(response.status === 200) {
                            this.avatars = response.data.additional_information
                        }
                    }).catch(err => {
                        switch (err.response.status) {
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
                    })
            },
            bindFromUpload(event) {
                this.bindOriginal(event)
            },
            bindOriginal(original) {
                this.profileImage.imageUrl = original.url
                this.profileImage.id = original.id
                this.profileImage.selected = original.selected
                this.state = STATE_CROP
            },
            bindThumbs(event) {
                this.profileImage.thumbnails = event
                // clone the current profileImage
                var copy = {}
                for (var attr in this.profileImage) {
                    if (this.profileImage.hasOwnProperty(attr)) copy[attr] = this.profileImage[attr];
                }
                this.reset()
                var found = false
                this.avatars.map((avatar) => {
                    var res = avatar
                    if(avatar.id === copy.id) {
                        res = copy
                        found = true
                    } else {
                        res.selected = false
                    }
                    return res
                })
                if(!found) {
                    this.avatars.push(copy)
                }
                this.state = STATE_UPLOAD
            },
            load(event) {
                var id = event
                var selected = this.avatars.find((avatar) => avatar.id === id)
                if(typeof selected !== "undefined") {
                    this.reset()
                    this.bindOriginal(selected)
                    this.state = STATE_CROP
                } else {
                    this.open(this.$t("upload.error.edit.title"), this.$t("upload.error.edit.msg"), "error")
                }
            },
            reset() {
                // reset the current profileImage
                this.profileImage.imageUrl = null
                this.profileImage.id = null
                this.profileImage.thumbnails = []
            },
            remove(event) {
                // this.avatars = this.avatars.filter((avatar) => avatar.id !== event.id)
                this.init()
            },
            select(event) {
                this.init()
            },
            open(title, message, type) {
                Notification({
                    title:  title,
                    message: message,
                    type: type
                });
            }
        }
    }
</script>

<style scoped>

</style>