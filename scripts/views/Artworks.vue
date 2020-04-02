<template>
<div>
  <section class="brand">
    <picture>
      <img :src="mainImg" alt="">
    </picture>
    <h1>studio<br>4096</h1>
  </section>

  <article class="contents-media">
    <ul class="artwork-list layout-grid">
      <li class="artwork-panel" v-for="(artwork, index) in artworks" @click="showPreview(index)">
        <artwork-picture :filename="artwork.key" :sizes="$config.cloudinary.thumb.sizes" :resize-options="$config.cloudinary.thumb.options">
        </artwork-picture>
      </li>
    </ul>
  </article>

  <div class="preview" v-if="preview" @click="hidePreview" v-touch:swipe="move">
    <artwork-picture :filename="current.key" :sizes="$config.cloudinary.preview.sizes" :resize-options="$config.cloudinary.preview.options">
    </artwork-picture>
  </div>

</div>
</template>
<script lang="ts">
import Vue from 'vue'
import ArtworkPicture from '~/scripts/components/ArtworkPicture.vue'

export default Vue.extend({
    data() {
        return {
            preview: false,
            artworks: [],
            currentIndex: 0,
            current: '',
            mainImg: null,
        }
    },
    components: {
        ArtworkPicture,
    },
    methods: {
        showPreview(index) {
            this.preview = true;
            this.currentIndex = index;
            this.current = this.artworks[index];
        },
        hidePreview() {
            this.preview = false;
        },
        move(direction, ev) {
            let nextIndex;
            if (direction === 'left') {
                nextIndex = this.currentIndex + 1;
            } else if (direction === 'right') {
                nextIndex = this.currentIndex - 1;
            } else {
                return;
            }
            if (nextIndex < 0 || nextIndex >= this.artworks.length ) {
                return;
            }
            this.showPreview(nextIndex);
        },
    },
    async created() {
        let data = null;
        try {
            data = JSON.parse(sessionStorage.getItem('artworks'));
        } catch(e) {
            console.error(e)
        }
        if (!data) {
            data = await this.$api.get(this.$cloudinary.url('artworks.json', {resource_type: 'raw'})).then(response => {
                return response.data
            });
            sessionStorage.setItem('artworks', JSON.stringify(data));
        }

        this.mainImg = this.$cloudinary.url(data.main_visual.key)
        this.artworks = data.list;
    },
})
</script>
<style>
.brand {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: gray;
    min-height: var(--contents-height);
    height: var(--contents-height);
    font-family: 'Poiret One', sans-serif;
}
.brand picture,
.brand picture img {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
}
.brand h1 {
    position: absolute;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
    color: white;
    font-size: 8vw;
    line-height: 8vw;
    text-align: center;
}
@media all and (max-width: 640px) {
    .brand h1 {
        font-size: 15vw;
        line-height: 15vw;
    }
}

.preview {
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    width: 100vw;
    height: 100vh;
}
.preview picture source,
.preview picture img {
    position: absolute;
    object-fit: contain;
    width: 100%;
    height: 100%;
}

</style>
