<script setup lang="ts">
import { asImageSrc } from "@prismicio/client";

const props = defineProps<{
  image?: any;
  title?: string | null;
}>();

const projectImage = computed(() => {
  return props.image ? asImageSrc(props.image) : "";
});
</script>

<template>
  <div class="vinyl">
    <div class="vinyl-shine vinyl-shine-1"></div>
    <div class="vinyl-shine vinyl-shine-2"></div>
    <div class="vinyl-shine vinyl-shine-3"></div>

    <div class="vinyl-ring"></div>

    <div class="vinyl-center">
      <img
        v-if="projectImage"
        :src="projectImage"
        :alt="title || 'Project image'"
        class="project-image"
      />
    </div>
  </div>
</template>

<style scoped>
.vinyl {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  transform-origin: center center;
  will-change: transform;
  background:
    repeating-radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.045) 0 2px,
      rgba(0, 0, 0, 0.08) 2px 7px
    ),
    radial-gradient(circle at 28% 30%, rgba(255, 255, 255, 0.12), transparent 20%),
    radial-gradient(circle at 68% 70%, rgba(255, 255, 255, 0.06), transparent 18%),
    radial-gradient(circle at center, #1a0506 0%, #090909 58%, #020202 78%, #000000 100%);
  box-shadow:
    inset 0 0 0 2px rgba(255, 255, 255, 0.06),
    inset 0 0 34px rgba(255, 255, 255, 0.05),
    0 18px 40px rgba(0, 0, 0, 0.25);
}

.vinyl::before {
  content: "";
  position: absolute;
  inset: 6%;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.vinyl::after {
  content: "";
  position: absolute;
  inset: 15%;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.vinyl-shine {
  position: absolute;
  top: 7%;
  bottom: 7%;
  width: 8%;
  border-radius: 999px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.02),
    rgba(255, 255, 255, 0.22),
    rgba(255, 255, 255, 0.03)
  );
  filter: blur(1px);
  opacity: 0.8;
}

.vinyl-shine-1 {
  left: 14%;
  transform: rotate(24deg);
}

.vinyl-shine-2 {
  right: 15%;
  transform: rotate(28deg);
}

.vinyl-shine-3 {
  right: 27%;
  width: 4%;
  opacity: 0.4;
  transform: rotate(28deg);
}

.vinyl-ring {
  position: absolute;
  inset: 31%;
  border-radius: 50%;
  background:
    radial-gradient(circle at center, rgba(0, 0, 0, 0.15) 0 64%, rgba(0, 0, 0, 0.88) 65% 100%);
  z-index: 2;
}

.vinyl-center {
  position: absolute;
  inset: 34.5%;
  border-radius: 50%;
  overflow: hidden;
  z-index: 3;
  background: #111;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>