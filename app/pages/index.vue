<script setup lang="ts">
import { asImageSrc } from "@prismicio/client";
import { components } from "~/slices";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.square-list',
      markers: true,
      start: 'top center',
      end: 'bottom center',
      scrub: true
    }
  });

  tl.to('.square', {
    x: 200,
    duration: 1,
    rotation: 360,
    ease: 'expo-out',
    stagger: 0.1,
  });

  tl.to('.square', {
    y: -200,
    duration: 1,
    rotation: 360,
    ease: 'expo-out',
    stagger: 0.1,
  }, '-=0.3');
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

    <div class="square-list">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    
    <SliceZone :slices="page?.data.slices ?? []" :components="components" />
  </main>
</template>

<style>
  .square {
    width: 50px;
    height: 50px;
    background-color: red;
  }

  .square-list {
    margin: 50vh 0;
  }
</style>