<template>
    <picture>
      <source :srcset="source.srcset" :media="source.media" v-for="source in sources">
      <img :src="src" alt="" v-if="src">
    </picture>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        filename: { type: String, default: null }
        sizes: { type: Array, default: [] }
        resizeOptions: { type: Object, default: () => { return {} } }
    },
    data() {
        return {
            sources: [],
            src: null,
        }
    },
    watch: {
        filename() {
            this.refresh();
        },
    },
    methods: {
        refresh() {
        this.sources = this.sizes.filter(size => size.media).map(size => {
            let sizeOption = {
                secure: true,
                width: size.px,
                height: size.px,
            };
            return {
                media: size.media,
                srcset: this.$cloudinary.url(this.filename, Object.assign(sizeOption, this.resizeOptions)),
            }
        });
        const px = this.sizes.find(size => !size.media).px;
        this.src = this.$cloudinary.url(this.filename, Object.assign({ secure: true, width: px, height: px }, this.resizeOptions));
        },
    },
    created() {
        this.refresh();
    }
</script>
