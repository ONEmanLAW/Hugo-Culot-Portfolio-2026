<script setup lang="ts">
import { asImageSrc } from "@prismicio/client";
import { gsap } from "gsap";

interface TagItem {
  title?: string | null;
}

const props = defineProps<{
  image?: any;
  title?: string | null;
  year?: string | number | null;
  tags?: TagItem[] | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
}>();

const sleeve = ref<HTMLElement | null>(null);
const disc = ref<HTMLElement | null>(null);
const discInner = ref<HTMLElement | null>(null);

const projectImage = computed(() => {
  return props.image ? asImageSrc(props.image) : "";
});

const projectTags = computed<string[]>(() => {
  return (props.tags ?? [])
    .map((item) => item.title)
    .filter((tag): tag is string => typeof tag === "string" && tag.length > 0);
});

const sleeveStyles = computed(() => ({
  "--sleeve-primary": props.primaryColor || "var(--color-primary)",
  "--sleeve-secondary": props.secondaryColor || "var(--color-secondary)",
}));

let hoverTl: gsap.core.Timeline | null = null;

const handleEnter = () => {
  hoverTl?.kill();

  hoverTl = gsap.timeline();
  hoverTl
    .to(disc.value, {
      xPercent: 30,
      duration: 0.8,
      ease: "power3.out",
    })
    .to(
      discInner.value,
      {
        rotation: 360,
        duration: 1.6,
        ease: "none",
        repeat: -1,
      },
      0
    );
};

const handleLeave = () => {
  hoverTl?.kill();

  hoverTl = gsap.timeline();
  hoverTl
    .to(disc.value, {
      xPercent: 0,
      duration: 0.6,
      ease: "power3.inOut",
    })
    .to(
      discInner.value,
      {
        rotation: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      0
    );
};

onUnmounted(() => {
  hoverTl?.kill();
});
</script>

<template>
  <div
    ref="sleeve"
    class="vinyl-sleeve"
    :style="sleeveStyles"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
  >
    <div class="sleeve-wrapper">
      <div ref="disc" class="sleeve-disc">
        <div ref="discInner" class="sleeve-disc-inner">
          <div class="disc-center">
            <img
              v-if="projectImage"
              :src="projectImage"
              :alt="title || 'Project'"
            />
          </div>
        </div>
      </div>

      <div class="sleeve-card">
        <img
          v-if="projectImage"
          :src="projectImage"
          :alt="title || 'Project'"
          class="sleeve-image"
        />

        <p class="sleeve-year">{{ year }}</p>

        <div v-if="projectTags.length" class="sleeve-tags">
          <span
            v-for="(tag, i) in projectTags.slice(0, 2)"
            :key="`${tag}-${i}`"
            class="sleeve-tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <h3 class="sleeve-title">{{ title || "NAME" }}</h3>
  </div>
</template>

<style scoped>
.vinyl-sleeve {
  position: relative;
  width: 100%;
  cursor: pointer;
}

.sleeve-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
}

.sleeve-card {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
  z-index: 2;
}

.sleeve-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.sleeve-year {
  position: absolute;
  top: 16px;
  right: 16px;
  font-family: var(--font-primary);
  font-size: clamp(22px, 1.8vw, 30px);
  color: white;
  border: 2px solid white;
  padding: 6px 10px 3px;
  line-height: 1;
  z-index: 3;
}

.sleeve-tags {
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  gap: 6px;
  z-index: 3;
}

.sleeve-tag {
  font-family: var(--font-primary);
  font-size: 14px;
  color: white;
  background: rgba(0, 0, 0, 0.85);
  padding: 5px 10px 4px;
  line-height: 1;
  text-transform: uppercase;
}

.sleeve-title {
  margin-top: 18px;
  font-family: var(--font-primary);
  font-size: clamp(22px, 1.6vw, 30px);
  color: white;
  text-transform: uppercase;
  line-height: 1;
}

.sleeve-disc {
  position: absolute;
  top: 12%;
  left: 12%;
  width: 76%;
  height: 76%;
  z-index: 1;
  transform: translateX(0);
  will-change: transform;
}

.sleeve-disc-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background:
    repeating-radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.025) 0 1px,
      rgba(0, 0, 0, 0.18) 1px 4px
    ),
    radial-gradient(circle at center, #161616 0%, #050505 80%, #000 100%);
  position: relative;
  will-change: transform;
}

.disc-center {
  position: absolute;
  inset: 38%;
  border-radius: 50%;
  overflow: hidden;
  background: #111;
}

.disc-center img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>