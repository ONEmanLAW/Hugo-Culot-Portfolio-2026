<script setup lang="ts">
import { asImageSrc } from "@prismicio/client";
import { components } from "~/slices";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { client } = usePrismic();
const { data: page } = await useAsyncData("[Tanu's quest]", () =>
  client.getSingle("project"),
);

useSeoMeta({
  title: page.value?.data.meta_title,
  ogTitle: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
  ogDescription: page.value?.data.meta_description,
  ogImage: computed(() => asImageSrc(page.value?.data.meta_image)),
});

// For GSAP
// gsap.registerPlugin(ScrollTrigger);
// onMounted(() => {
  
// });

</script>

<template>
  <main>
    <h1>{{ page?.data.title }}</h1>
    <h2>{{ page?.data.year }}</h2>
    <h2>{{ page?.data.tags }}</h2>

    <PrismicImage :field="page?.data.image" />
    
    <SliceZone :slices="page?.data.slices ?? []" :components="components" />
  </main>
</template>

<style>

</style>