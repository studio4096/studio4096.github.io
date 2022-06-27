<template>
  <picture>
    <source
      :srcset="source.srcset"
      :media="source.media"
      :key="i"
      v-for="(source, i) in sources"
    />
    <img :src="src" alt="" v-if="src" />
  </picture>
</template>
<script setup lang="ts">
import { ref, watch, inject } from "vue";
import { Cloudinary, CloudinaryImage, Qualifiers } from "@cloudinary/url-gen";
import { Resize, Rotate } from "@cloudinary/url-gen/actions";
import type { ResizeSimpleAction } from "@cloudinary/url-gen/actions/resize/ResizeSimpleAction";

type SizeConfig = {
  media?: string;
  px: number;
};

type ResizeAction =
  | "crop"
  | "fill"
  | "fill_pad"
  | "fit"
  | "imagga_crop"
  | "imagga_scale"
  | "lfill"
  | "limit"
  | "lpad"
  | "mfit"
  | "mpad"
  | "pad"
  | "scale"
  | "thumb";

const props = defineProps<{
  filename?: string;
  sizes: SizeConfig[];
  resizeAction: ResizeAction;
}>();

const $cloudinary = inject<Cloudinary>("$cloudinary");
if (!$cloudinary) {
  throw new Error(); // TODO
}

const sources = ref<{ media?: string; srcset: string }[]>([]);
const src = ref<string | null>(null);

const createCloudinaryImage = (filename?: string) => {
  return $cloudinary
    .image(filename)
    .rotate(Rotate.mode(Qualifiers.RotationMode.ignore()));
};

const resizeImage = (
  image: CloudinaryImage,
  action: ResizeAction,
  width?: number,
  height?: number
) => {
  let resize: ResizeSimpleAction | undefined;
  switch (action) {
    case "crop":
      resize = Resize.crop();
      break;
    case "fill":
      resize = Resize.fill();
      break;
    case "limit":
      resize = Resize.limitFit();
      break;
    default:
      // TODO 他のactionにも対応する
      break;
  }
  if (!resize) {
    return image;
  }
  if (width != undefined) {
    resize.width(width);
  }
  if (height != undefined) {
    resize.height(height);
  }
  return image.resize(resize);
};

const refresh = () => {
  sources.value = props.sizes
    .filter((size) => size.media)
    .map((size) => {
      return {
        media: size.media,
        srcset: resizeImage(
          createCloudinaryImage(props.filename),
          props.resizeAction,
          size.px,
          size.px
        ).toURL(),
      }
    });
  const px = props.sizes.find((size) => !size.media)?.px || 0;
  src.value = resizeImage(
    createCloudinaryImage(props.filename),
    props.resizeAction,
    px,
    px
  ).toURL();
};

watch(() => props.filename, refresh);

refresh();
</script>
