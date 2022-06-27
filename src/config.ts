import cloudinary from "@/configs/cloudinary.json";
import contactForm from "@/configs/contact-form.json";
import type ICloudinaryConfigurations from "@cloudinary/url-gen/config/interfaces/Config/ICloudinaryConfigurations";
const contactFormUrl = "https://script.google.com/macros/s/AKfycbxw9sD7LLXGzrr2-PdVcAeWzR_hLmg-rEYDOeBrO6OnbugUA6HB/exec";

export type GoogleFormField = {
  choices: string[];
  id: number;
  required: boolean;
  title: "Name" | "Mail Address" | "Company Name" | "Message";
  type: "TEXT" | "PARAGRAPH_TEXT";
};

export default {
  sitename: "studio4096",
  cloudinary: cloudinary as typeof cloudinary & {
    options: ICloudinaryConfigurations;
  },
  contactForm: {
    url: contactFormUrl,
    id: contactForm.id,
    items: contactForm.items as GoogleFormField[],
  },
};
