<script setup lang="ts">
import { asImageSrc, isFilled } from "@prismicio/client";
import { components } from "~/slices";
import TopProjectSection from "~/components/TopProjectSection.vue";
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

const highlightedProjects = computed(() => {
  return page.value?.data.highlighted_projects ?? [];
});

const firstHighlightedProject = computed(() => {
  const firstItem = highlightedProjects.value[0];

  if (!firstItem) return null;

  if (isFilled.contentRelationship(firstItem.projects)) {
    return firstItem.projects.data;
  }

  return null;
});

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
    },
  });

  heroTl.to(".home-title", { opacity: 0, y: -50, duration: 1 });

  heroTl.fromTo(
    ".hero-subtitle",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1 },
    ">0.2"
  );

  heroTl.to(".hero-subtitle", { opacity: 0, y: -50, duration: 1 }, "+=0.5");

  gsap.fromTo(
    ".next-section",
    { scaleX: 0.5, scaleY: 0.8 },
    {
      scaleX: 1,
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".next-section",
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    ".vinyl",
    { rotation: 0 },
    {
      rotation: 600,
      ease: "none",
      scrollTrigger: {
        trigger: ".next-section",
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    ".vinyl",
    { rotation: 600 },
    {
      rotation: 1680,
      ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger: ".next-section",
        start: "top center",
        end: "top -140%",
        scrub: true,
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

    <TopProjectSection
      v-if="firstHighlightedProject"
      :image="firstHighlightedProject.image"
      :title="firstHighlightedProject.title"
      :year="firstHighlightedProject.year"
      :tags="firstHighlightedProject.tags"
      index-label="01/04"
    />

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
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-content {
  position: relative;
}

.home-title {
  font-size: 128px;
  font-family: "Bebas Neue", sans-serif;
  font-weight: bold;
  color: white;
}

.hero-subtitle {
  font-size: 128px;
  font-family: "Bebas Neue", sans-serif;
  font-weight: bold;
  color: white;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>