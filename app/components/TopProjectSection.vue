<script setup lang="ts">
import { asImageSrc } from "@prismicio/client";

interface TagItem {
  title?: string | null;
}

const props = defineProps<{
  image?: any;
  title?: string | null;
  year?: string | number | null;
  tags?: TagItem[] | null;
  indexLabel?: string;
}>();

const projectImage = computed(() => {
  return props.image ? asImageSrc(props.image) : "";
});

const projectTags = computed<string[]>(() => {
  return (props.tags ?? [])
    .map((item) => item.title)
    .filter((tag): tag is string => typeof tag === "string" && tag.length > 0);
});
</script>

<template>
  <section class="next-section">
    <div class="project-card">
      <div class="project-top">
        <p class="project-count">{{ indexLabel }}</p>
        <p class="project-year">{{ year }}</p>
      </div>

      <div class="project-visual">
        <img
          v-if="projectImage"
          :src="projectImage"
          :alt="title || 'Project image'"
          class="project-image"
        />
      </div>

      <div class="project-bottom">
        <h2 class="project-title">{{ title }}</h2>

        <div class="project-tags">
          <span
            v-for="(tag, index) in projectTags"
            :key="`${tag}-${index}`"
            class="project-tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.next-section {
  min-height: 100vh;
  width: 100%;
  background-color: var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center center;
  transform: scaleX(0.5) scaleY(0.8);
  margin-top: -280px;
  padding: 40px;
}

.project-card {
  width: min(100%, 1100px);
  min-height: 760px;
  background: rgba(255, 94, 0, 0.55);
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
}

.project-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 28px 0;
}

.project-count {
  font-size: 88px;
  line-height: 0.9;
  font-family: "Bebas Neue", sans-serif;
  color: white;
}

.project-year {
  font-size: 72px;
  line-height: 0.9;
  font-family: "Bebas Neue", sans-serif;
  color: white;
  border: 3px solid white;
  padding: 8px 14px;
}

.project-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.project-image {
  width: min(100%, 560px);
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
}

.project-bottom {
  padding: 0 28px 28px;
}

.project-title {
  font-size: 84px;
  line-height: 0.9;
  font-family: "Bebas Neue", sans-serif;
  color: white;
  margin-bottom: 22px;
  text-transform: uppercase;
}

.project-tags {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.project-tag {
  border: 2px solid white;
  color: white;
  padding: 8px 16px;
  font-size: 32px;
  font-family: "Bebas Neue", sans-serif;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .project-count,
  .project-year,
  .project-title {
    font-size: 56px;
  }

  .project-tag {
    font-size: 22px;
  }
}
</style>