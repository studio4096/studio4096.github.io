import Config from "@/config";
import { describe, it, expect } from "vitest";

import { mount, config } from "@vue/test-utils";

import ArtworkPicture from "@/components/ArtworkPicture.vue";
import { Cloudinary } from "@cloudinary/url-gen";

describe("ArtworkPicture", () => {
  it("renders properly", () => {
    const cloudinary = new Cloudinary(Config.cloudinary.options);
    // config.global.mocks = {
    //   $config: Config,
    //   $cloudinary: cloudinary,
    // };
    config.global.provide["$cloudinary"] = cloudinary;
    const filename = "some-picture.jpg";
    const sizes = [
      { media: "(max-width:640px)", px: 320 },
      { media: "(max-width:1200px)", px: 600 },
    ];

    const wrapper = mount(ArtworkPicture, {
      props: { filename, sizes, resizeAction: "fill" },
    });

    // console.log("html", wrapper.html());
    // console.log("text", wrapper.text());
    // console.log("att", wrapper.attributes());
    for (const size of sizes) {
      const selector = `source[srcset="https://res.cloudinary.com/studio4096/image/upload/a_ignore/c_fill,h_${size.px},w_${size.px}/${filename}?_a=ATAMhAA0"][media="${size.media}"]`;
      console.log(selector);
      expect(wrapper.find(selector).exists(), selector).toBe(true);
    }
    // expect(wrapper.html()).toContain("/some-picture.jpg");
  });
});
