<script setup lang="ts">
import { ref, inject } from "vue";
import ArtworkPicture from "@/components/ArtworkPicture.vue";
import type Config from "@/config";
import type { Axios } from "axios";
import type { Cloudinary } from "@cloudinary/url-gen";

const $config = inject<typeof Config>("$config") as typeof Config;
const $api = inject<Axios>("$axios") as Axios;
const $cloudinary = inject<Cloudinary>("$cloudinary") as Cloudinary;

type ArtworkData = {
  key: string;
  column: number;
  row: number;
};

type ArtworksData = {
  main_visual: { key: string };
  list: ArtworkData[];
};

const preview = ref(false);
const currentIndex = ref(0);
const current = ref<ArtworkData>({ key: "", column: 1, row: 1 });
const artworks = ref<ArtworkData[]>([]);
const mainImg = ref<string | null>(null);

const showPreview = (index: number) => {
  preview.value = true;
  currentIndex.value = index;
  current.value = artworks.value[index];
};

const hidePreview = () => {
  preview.value = false;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const move = (direction: "left" | "right", ev: Event) => {
  let nextIndex;
  if (direction === "left") {
    nextIndex = currentIndex.value + 1;
  } else if (direction === "right") {
    nextIndex = currentIndex.value - 1;
  } else {
    return;
  }
  if (nextIndex < 0 || nextIndex >= artworks.value.length) {
    return;
  }
  showPreview(nextIndex);
};

(async () => {
  let data: ArtworksData | undefined;
  try {
    const contents = sessionStorage.getItem("artworks");
    if (contents) {
      data = JSON.parse(contents);
    }
  } catch (e) {
    console.error(e);
  }

  if (!data) {
    const url = $cloudinary.image("artworks.json").setAssetType("raw").toURL();
    data = await $api.get(url).then((response: { data: ArtworksData }) => {
      return response.data;
    });
    sessionStorage.setItem("artworks", JSON.stringify(data));
  }
  if (data) {
    mainImg.value = $cloudinary.image(data.main_visual.key).toURL();
    artworks.value = data.list;
  }
})();
</script>

<template>
  <div>
    <section class="brand">
      <picture>
        <img :src="mainImg" v-if="mainImg" alt="" />
      </picture>
      <h1>studio<br />4096</h1>
    </section>

    <article class="contents-media">
      <ul class="artwork-list layout-grid">
        <li
          class="artwork-panel"
          v-for="(artwork, index) in artworks"
          :key="index"
          @click="showPreview(index)"
        >
          <ArtworkPicture
            :filename="artwork.key"
            :sizes="$config.cloudinary.thumb.sizes"
            resize-action="fill"
          >
          </ArtworkPicture>
        </li>
      </ul>
    </article>

    <div
      class="preview"
      v-if="preview"
      @click="hidePreview"
      v-touch:swipe="move"
    >
      <ArtworkPicture
        :filename="current.key"
        :sizes="$config.cloudinary.preview.sizes"
        resize-action="limit"
      >
      </ArtworkPicture>
    </div>
  </div>
</template>

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
