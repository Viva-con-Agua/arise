<template>
    <div class="profileImage">
        <div class="thumbnails" v-if="isUpload">
            <img
                    v-for="avatar in avatars"
                    v-if="(typeof avatar.thumbnails.find((thumb) => thumb.width === 75 && thumb.height === 75) !== 'undefined')"
                    :key="avatar.id"
                    :src="avatar.thumbnails.find((thumb) => thumb.width === 75 && thumb.height === 75).url"
            />
        </div>
        <Upload v-on:vca-images="bindOriginal" v-if="isUpload" :upload="imageUpload" />
        <ImageCrop v-if="isCrop" :id="profileImage.id" :imageUrl="profileImage.imageUrl" :upload="imageUpload" v-on:vca-images-cropped="bindThumbs" />
    </div>
</template>

<script>
    import Upload from '@/components/upload/Upload.vue'
    import ImageCrop from '@/components/upload/ImageCrop.vue'
    import ImageUpload from '@/components/upload/ImageUpload'

    const STATE_UPLOAD = 1, STATE_CROP = 2;

    export default {
        name: "ProfileImage",
        components: { Upload, ImageCrop },
        data() {
            return {
                "state": STATE_UPLOAD,
                "profileImage": {
                    "imageUrl": null,
                    "id": null,
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
        },
        methods: {
            bindOriginal(event) {
                this.profileImage.imageUrl = event.url
                this.profileImage.id = event.id
                this.state = STATE_CROP
            },
            bindThumbs(event) {
                console.log(event)
                this.profileImage.thumbnails = event
                // clone the current profileImage
                var copy = {}
                for (var attr in this.profileImage) {
                    if (this.profileImage.hasOwnProperty(attr)) copy[attr] = this.profileImage[attr];
                }
                // reset the current profileImage
                this.profileImage.imageUrl = null
                this.profileImage.id = null
                this.profileImage.thumbnails = []

                this.avatars.push(copy)
                this.state = STATE_UPLOAD
            }
        }
    }
</script>

<style scoped>

</style>