<template>
    <div class="thumbnails">
        <div v-for="avatar in filteredAvatars" :key="avatar.id" class="avatar">
            <button class="select">
                <img :src="avatar.preview.url" class="preview" />
            </button>
            <div class="actions">
                <button class="delete vca-button-warn">
                    {{ $t('upload.label.delete')}}
                </button>
                <button class="edit vca-button-primary">
                    {{ $t('upload.label.edit')}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Thumbs",
        props: ["avatars"],
        computed: {
            filteredAvatars() {
                var finder = (thumb, size) => thumb.width === size && thumb.height === size
                var preview = (thumb) => finder(thumb, 85)
                var filter = (avatar) => (typeof avatar.thumbnails.find(preview) !== "undefined")
                return this.avatars
                    .filter(filter)
                    .map((avatar) => {
                        avatar.preview = avatar.thumbnails.find(preview)
                        return avatar
                    })
            }
        }
    }
</script>

<style scoped lang="less">

    @shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    @shadowInvert: 0 -2px 4px 0 rgba(0, 0, 0, 0.2), 0 -3px 10px 0 rgba(0, 0, 0, 0.19);

    @radius: 5px;

    .border-radius(@localRadius: @radius) {
        -webkit-border-radius: @localRadius;
        -moz-border-radius: @localRadius;
        border-radius: @localRadius;
    }

    .box-shadow(@localShadow: @shadow) {
        box-shadow: @localShadow;
        -moz-box-shadow: @localShadow;
        -webkit-box-shadow: @localShadow;
    }

    .thumbnails {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .avatar {
        display: flex;
        flex-direction: row;
        .border-radius(@radius);
        margin: 5px 5px 10px;

        .select {
            border: 0;
            background-color: transparent;
            padding: 0;
        }

        .actions {
            display: none;
            flex-direction: column;
            justify-content: center;
            padding: 0.5em;

            button {
                padding-left: 0.3em;
                padding-right: 0.3em;
            }

            .edit {
                margin-top: 0.3em;
            }
        }

        &:hover, &:active {
            .box-shadow(@shadow);
            .actions {
                display: flex;
            }
        }
    }
</style>