<script setup lang="ts">
import { asImageSrc, isFilled } from "@prismicio/client";
import { components } from "~/slices";
import TopProjectSection from "~/components/TopProjectSection.vue";
import PageReveal from "~/components/PageReveal.vue";
import { useHomeAnimations } from "~/composables/useHomeAnimations";

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

const homePage = ref<HTMLElement | null>(null);

const highlightedProjects = computed(() => {
  return page.value?.data.highlighted_projects ?? [];
});

const getHighlightedProject = (index: number) =>
  computed(() => {
    const item = highlightedProjects.value[index];

    if (!item) return null;

    if (isFilled.contentRelationship(item.projects)) {
      return item.projects.data;
    }

    return null;
  });

const firstHighlightedProject = getHighlightedProject(0);
const secondHighlightedProject = getHighlightedProject(1);

const hasSecondHighlightedProject = computed(() => {
  return !!secondHighlightedProject.value;
});

const { initHomeAnimations, destroyHomeAnimations } = useHomeAnimations(
  homePage,
  hasSecondHighlightedProject
);

const handleRevealDone = () => {
  initHomeAnimations();
};

onUnmounted(() => {
  destroyHomeAnimations();
});
</script>

<template>
  <main ref="homePage">
    <PageReveal @done="handleRevealDone" />

    <AppNavbar />

    <section class="hero">
      <div class="hero-content">
        <h1 class="home-title">{{ page?.data.title }}</h1>
        <h2 class="hero-subtitle">Bienvenue sur mon portfolio</h2>
      </div>
    </section>

    <section
      v-if="firstHighlightedProject && secondHighlightedProject"
      class="projects-stage"
    >
      <div class="projects-stage-sticky">
        <TopProjectSection
          class="project-one-section"
          :image="firstHighlightedProject.image"
          :title="firstHighlightedProject.title"
          :year="firstHighlightedProject.year"
          :tags="firstHighlightedProject.tags"
          :primary-color="firstHighlightedProject.main_color"
          :secondary-color="firstHighlightedProject.secondary_color"
          index-label="01/04"
        />

        <TopProjectSection
          class="project-two-section"
          :image="secondHighlightedProject.image"
          :title="secondHighlightedProject.title"
          :year="secondHighlightedProject.year"
          :tags="secondHighlightedProject.tags"
          :primary-color="secondHighlightedProject.main_color"
          :secondary-color="secondHighlightedProject.secondary_color"
          index-label="02/04"
        />
      </div>
    </section>

   <TopProjectSection
      v-else-if="firstHighlightedProject"
      :image="firstHighlightedProject.image"
      :title="firstHighlightedProject.title"
      :year="firstHighlightedProject.year"
      :tags="firstHighlightedProject.tags"
      :primary-color="firstHighlightedProject.main_color"
      :secondary-color="firstHighlightedProject.secondary_color"
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

html,
body {
  background-color: black;
}

body {
  overflow-y: auto;
}

main {
  min-height: 100vh;
  background: black;
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
  font-family: var(--font-primary);
  font-weight: bold;
  color: white;
}

.hero-subtitle {
  font-size: 128px;
  font-family: var(--font-primary);
  font-weight: bold;
  color: white;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  width: max-content;
  transform: translate(-50%, -50%);
}

.projects-stage {
  position: relative;
  height: 520vh;
}

.projects-stage-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}

.projects-stage .next-section {
  position: absolute;
  inset: 0;
  min-height: 100vh;
  margin-top: 0;
}

.projects-stage .project-one-section {
  z-index: 1;
}

.projects-stage .project-two-section {
  z-index: 2;
}

@media (max-width: 900px) {
  .home-title,
  .hero-subtitle {
    font-size: clamp(56px, 10vw, 96px);
  }
}
</style>