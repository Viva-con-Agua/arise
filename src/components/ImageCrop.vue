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

        <Upload v-on:vca-images="bind"/>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueCroppie from 'vue-croppie'
    import Upload from '@/components/Upload.vue'

    Vue.use(VueCroppie);

    export default {
        name: "ImageCrop",
        components: { Upload },
        mounted() {
            // Upon mounting of the component, we accessed the .bind({...})
            // function to put an initial image on the canvas.
            this.$refs.croppieRef.bind({
                url: this.images[0],
            })
        },
        data() {
            var options = {
                "boundary": { "width": 200, "height": 200},
                "viewport": { "width": 100, "height": 100 },
                "enableResize": false,
                "enableOrientation": true,
                "mouseWheelZoom":true,
                "enableExif": true
            }
            return {
                cropped: "",
                options: options
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
                // Here we are getting the result via callback function
                // and set the result to this.cropped which is being
                // used to display the result above.
                let options = {
                    format: 'jpeg',
                    circle: true
                }
                this.$refs.croppieRef.result(options, (output) => {
                    this.cropped = output;
                });
            },
            // EVENT USAGE
            // cropViaEvent() {
            //     this.$refs.croppieRef.result(options);
            // },
            result(output) {
                this.cropped = output;
            },
            update(val) {
                // console.log(val);
            },
            // rotate(rotationAngle) {
            //     // Rotates the image
            //     this.$refs.croppieRef.rotate(rotationAngle);
            // }
        }
    }
</script>

<style scoped>

    .image-container {
        width: 100%;
    }

</style>