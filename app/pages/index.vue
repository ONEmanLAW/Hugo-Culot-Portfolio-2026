<script setup lang="ts">
import { asImageSrc, isFilled } from "@prismicio/client";
import { components } from "~/slices";
import TopProjectSection from "~/components/TopProjectSection.vue";
import PageReveal from "~/components/PageReveal.vue";
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

const secondHighlightedProject = computed(() => {
  const secondItem = highlightedProjects.value[1];

  if (!secondItem) return null;

  if (isFilled.contentRelationship(secondItem.projects)) {
    return secondItem.projects.data;
  }

  return null;
});

gsap.registerPlugin(ScrollTrigger);

let ctx: gsap.Context | null = null;

const initScrollAnimations = () => {
  ctx?.revert();

  ctx = gsap.context(() => {
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "+=260%",
        scrub: 1.5,
        pin: true,
      },
    });

    heroTl.to(".home-title", {
      opacity: 0,
      y: -50,
      duration: 1,
    });

    heroTl.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 },
      ">0.25"
    );

    heroTl.to(
      ".hero-subtitle",
      {
        opacity: 0,
        y: -50,
        duration: 1,
      },
      "+=0.8"
    );

    gsap.fromTo(
      ".project-one-section",
      { scaleX: 0.5, scaleY: 0.8 },
      {
        scaleX: 1,
        scaleY: 1,
        scrollTrigger: {
          trigger: ".projects-stage",
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        },
      }
    );

    gsap.fromTo(
      ".project-one-section .vinyl",
      { rotation: 0 },
      {
        rotation: 600,
        scrollTrigger: {
          trigger: ".projects-stage",
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        },
      }
    );

    gsap.fromTo(
      ".project-one-section .vinyl",
      { rotation: 600 },
      {
        rotation: 1680,
        immediateRender: false,
        scrollTrigger: {
          trigger: ".projects-stage",
          start: "top top",
          end: "top -260%",
          scrub: 1.5,
        },
      }
    );

    if (secondHighlightedProject.value) {
      gsap.set(".project-two-section", {
        xPercent: -100,
        scaleX: 1,
        scaleY: 1,
      });

      gsap.to(".project-two-section", {
        xPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".projects-stage",
          start: "top -60%",
          end: "top -260%",
          scrub: 1.5,
        },
      });

      gsap.fromTo(
        ".project-two-section .vinyl",
        { rotation: 0 },
        {
          rotation: 720,
          scrollTrigger: {
            trigger: ".projects-stage",
            start: "top -60%",
            end: "top -260%",
            scrub: 1.5,
          },
        }
      );
    }
  });

  ScrollTrigger.refresh();
};

const handleRevealDone = () => {
  initScrollAnimations();
};

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <main>
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
          index-label="01/04"
        />

        <TopProjectSection
          class="project-two-section"
          :image="secondHighlightedProject.image"
          :title="secondHighlightedProject.title"
          :year="secondHighlightedProject.year"
          :tags="secondHighlightedProject.tags"
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