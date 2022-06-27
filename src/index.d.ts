import config from "@/config";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";

declare module "vue" {
  interface ComponentCustomProperties {
    $config: typeof config; // TODO 暫時対応
    $api: typeof axios;
    $cloudinary: Cloudinary;
    // $translate: (key: string) => string
  }
}
