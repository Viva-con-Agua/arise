<template>
    <div class="upload-container">
        <!-- Note that 'ref' is important here (value can be anything). read the description about `ref` below. -->
        <vue-croppie
                ref="croppieRef"
                class="image-container"
                :enableOrientation="options.enableOrientation"
                :enableResize="options.enableResize"
                :boundary="options.boundary"
                :viewport="options.viewport"
                :mouseWheelZoom="options.mouseWheelZoom"
                :enableExif="options.enableExif"
                @result="result"
                @update="update">
        </vue-croppie>
        <button class="vca-button-primary vca-full-width" @click="submit">{{ $t("upload.label.crop") }}</button>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueCroppie from 'vue-croppie'

    Vue.use(VueCroppie);

    export default {
        name: "ImageCrop",
        props: ["imageUrl", "upload", "id"],
        data () {
            var sizes = [
                { "width": 200, "height": 200, "cropped": null },
                { "width": 85, "height": 85, "cropped": null },
                { "width": 75, "height": 75, "cropped": null },
                { "width": 32, "height": 32, "cropped": null }
            ]
            var options = {
                "boundary": { "width": 400, "height": 400},
                "viewport": { "width": 200, "height": 200 },
                "enableResize": false,
                "enableOrientation": true,
                "mouseWheelZoom":true,
                "enableExif": true
            }
            return {
                options: options,
                sizes: sizes
            }
        },
        mounted () {
            if((typeof this.imageUrl !== "undefined") && this.imageUrl !== null) {
                this.bind(this.imageUrl)
            }
        },
        methods: {
            bind(event) {
                var url = event
                // Just like what we did with .bind({...}) on
                // the mounted() function above.
                this.$refs.croppieRef.bind({
                    url: url,
                });
            },
            // CALBACK USAGE
            crop() {
                this.sizes.forEach((size) => {
                    // Here we are getting the result via callback function
                    // and set the result to this.cropped which is being
                    // used to display the result above.
                    let options = {
                        type: "blob",
                        size: { "width": size.width, "height": size.height },
                        format: 'png',
                        circle: false
                    }
                    this.$refs.croppieRef.result(options, (output) => {
                        size.cropped = output;
                    });
                })
            },
            // EVENT USAGE
            // cropViaEvent() {
            //     this.$refs.croppieRef.result(options);
            // },
            result(output) {
                this.crop()
                // this.$emit('vca-images-cropped', this.sizes)
            },
            update(val) {
                this.crop()
                // console.log(val);
            },
            submit() {
                this.crop()
                // this.$emit('vca-images-cropped', this.sizes)
                this.save()
            },
            // rotate(rotationAngle) {
            //     // Rotates the image
            //     this.$refs.croppieRef.rotate(rotationAngle);
            // }
            save() {

                var createFormData = (id, thumbs) => {
                    const formData = new FormData()
                    var getName = (thumb) => id + "_" + thumb.width + "x" + thumb.height
                    thumbs.forEach((thumb) => {
                        formData.append(getName(thumb), thumb.cropped, getName(thumb))
                    })
                    return formData
                }

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
                        var thumbs = response.data.additional_information
                        this.$emit('vca-images-cropped', thumbs)
                    }
                }
                // upload data to the server
                var formData = createFormData(this.id, this.sizes)
                this.upload.thumbnail(formData, successCallback, errorCallback, this.id)
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

    .image-container {
        width: 100%;
    }

</style>