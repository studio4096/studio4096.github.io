import Vue from 'vue'
declare module 'vue/types/vue' {
  interface Vue {
    $config: any; // TODO 暫時対応
    $api: any;
    $cloudinary: any;
  }
}
