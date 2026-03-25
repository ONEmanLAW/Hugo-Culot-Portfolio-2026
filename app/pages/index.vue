<script setup lang="ts">
import { asImageSrc } from "@prismicio/client";
import { components } from "~/slices";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { client } = usePrismic();
const { data: page } = await useAsyncData("home", () =>
  client.getSingle("home")
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

// Exemple
// page?.data.highlighted_projects[0]?.projects?.data.title

</script>

<template>

  <link rel="stylesheet" href="">
  <main>
    <nav>
      <NuxtLink to="/">Accueil</NuxtLink>
      <NuxtLink to="/projects">Projets</NuxtLink>
    </nav>

    <section class="hero">
      <div class="hero-content">
        <h1 class="home-title">{{ page?.data.title }}</h1>
      </div>
    </section>

    
    <SliceZone :slices="page?.data.slices ?? []" :components="components" />
  </main>
</template>

<style>

  /* General styling */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    overflow-x: hidden;
    background-color: black;
  }

  /* Nav */
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    padding: 16px 24px;
  }

  /* Home page */
  .hero {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* .bg-image {
    position: absolute;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  } */

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
  }

  .home-title {
    font-size: 128px;
    font-family: 'Bebas Neue', sans-serif;
    font-weight: bold;
    color: var(--color-white);
  }
</style>