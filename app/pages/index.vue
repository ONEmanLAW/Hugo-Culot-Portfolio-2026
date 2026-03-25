<script setup lang="ts">
import { asImageSrc } from "@prismicio/client";
import { components } from "~/slices";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const heroTrigger = ".hero";

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroTrigger,
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
    }
  });

  tl.to(".home-title", { opacity: 0, y: -50, duration: 1 });

  tl.fromTo(
    ".hero-subtitle",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1 },
    ">0"
  );

  tl.to(".hero-subtitle", { opacity: 0, y: -50, duration: 1 });

  gsap.fromTo(
    ".next-section",
    { scaleX: 0.5, transformOrigin: "center center" },
    {
      scaleX: 1,
      y: 0,
      scrollTrigger: {
        trigger: ".next-section",
        start: "top 80%",
        end: "top 30%",
        scrub: true,
        pin: true,
      },
    }
  );
});
</script>

<template>
  <main>
    <nav>
      <NuxtLink to="/">Accueil</NuxtLink>
      <NuxtLink to="/projects">Projets</NuxtLink>
    </nav>

    <section class="hero">
      <div class="hero-content">
        <h1 class="home-title">{{ page?.data.title }}</h1>
        <h2 class="hero-subtitle">Bienvenue sur mon portfolio</h2>
      </div>
    </section>

    <section class="next-section">
      <p class="home-title2">hello</p>
    </section>

    <SliceZone :slices="page?.data.slices ?? []" :components="components" />
  </main>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  overflow-y: auto;
  background-color: black;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
}

.hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.home-title {
  font-size: 128px;
  font-family: 'Bebas Neue', sans-serif;
  font-weight: bold;
  color: white;
}

.hero-subtitle {
  font-size: 128px;
  font-family: 'Bebas Neue', sans-serif;
  font-weight: bold;
  color: white;
  opacity: 0; 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.next-section {
  min-height: 100vh;
  width: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center center;
  scaleX: 0.5;
  y: 100px;
}

.home-title2 {
  font-size: 128px;
  font-family: 'Bebas Neue', sans-serif;
  font-weight: bold;
  color: black;
}
</style>