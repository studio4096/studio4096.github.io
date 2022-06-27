<template>
  <article class="contents-text">
    <h2>studio4096</h2>
    <p>東京で活動中のイラストレーター／プログラマーです。</p>

    <h2>Contact</h2>
    <form action="" class="contact-form grid-d-3" @submit.prevent="send">
      <div
        class="form-field"
        :key="f.id"
        :class="{ 'col-d-3': f.type == 'PARAGRAPH_TEXT' }"
        v-for="f in fields"
      >
        <input
          v-if="f.type == 'TEXT'"
          :type="f.title.toLowerCase().match(/mail/) ? 'email' : 'text'"
          :id="'field-' + f.id"
          placeholder=" "
          :required="f.required"
          v-model="values[f.id]"
        />
        <textarea
          v-if="f.type == 'PARAGRAPH_TEXT'"
          :id="'field-' + f.id"
          placeholder=" "
          :required="f.required"
          v-model="values[f.id]"
        />
        <label class="label" :for="'field-' + f.id"
          >{{ f.title }}{{ f.required ? "(*)" : null }}</label
        >
      </div>
      <div class="form-buttons col-d-3">
        <input type="submit" value="Send Message"/>
      </div>
    </form>

  </article>
</template>
<script setup lang="ts">
import { ref, inject } from "vue";
import type Config from "@/config";
import type { Axios } from "axios";
import type { GoogleFormField } from "@/config";

const $config = inject<typeof Config>("$config") as typeof Config;
const $api = inject<Axios>("$axios") as Axios;

const fields = ref<GoogleFormField[]>([]);
const values = ref<Record<number, string>>({});

const send = () => {
  let items = fields.value.map(f => {
    return {
      id: f.id,
      value: values.value[f.id],
      // values: // 選択式フィールドには未対応
    };
  });

  $api
    .post($config.contactForm.url, { id: $config.contactForm.id, items })
    .then((res) => {
      return res.data;
    })
    .then((res) => {
      if (res.status > 0) {
        console.error(res);
        throw new Error(res.data && res.data.message ? res.data.message : null);
      }
      alert("送信しました。");
    })
    .catch((ex) => {
      alert("送信に失敗しました。");
      console.error(ex);
    });
};

fields.value = $config.contactForm.items;
</script>
<style>
.contact-form {
}
</style>
