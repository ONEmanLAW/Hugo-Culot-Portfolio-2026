<script setup lang="ts">
import { asImageSrc } from "@prismicio/client";
import { components } from "~/slices";

const { client } = usePrismic();
const { data: page } = await useAsyncData("[home]", () =>
  client.getSingle("home"),
);

useSeoMeta({
  title: page.value?.data.meta_title,
  ogTitle: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
  ogDescription: page.value?.data.meta_description,
  ogImage: computed(() => asImageSrc(page.value?.data.meta_image)),
});


console.log(page.value?.data.highlititedproject);
</script>

<template>
  <main>
    <h1>{{ page?.data.title }}</h1>
    <PrismicRichText :field="page?.data.description" />
    <section>
      <p>Project mis en avant:</p>
      <h1> {{ page?.data.highlititedproject.data.title }}</h1>
      <PrismicRichText :field="page?.data.highlititedproject.data.description" />
    </section>
    <SliceZone :slices="page?.data.slices ?? []" :components="components" />
  </main>
</template>