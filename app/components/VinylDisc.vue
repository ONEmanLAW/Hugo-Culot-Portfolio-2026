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
    <div class="vinyl-disc">
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

    <div class="vinyl-light vinyl-light-1"></div>
    <div class="vinyl-light vinyl-light-2"></div>
    <div class="vinyl-reflection-soft"></div>
    <div class="vinyl-reflection-arc"></div>
    <div class="vinyl-vignette"></div>
  </div>
</template>

<style scoped>
.vinyl {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform-origin: center center;
}

.vinyl-disc {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  overflow: hidden;
  will-change: transform;
  background:
    repeating-radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.028) 0 1px,
      rgba(0, 0, 0, 0.12) 1px 4px
    ),
    repeating-radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.012) 0 2px,
      rgba(0, 0, 0, 0) 2px 7px
    ),
    radial-gradient(circle at center, #161616 0%, #090909 58%, #020202 82%, #000000 100%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.06),
    inset 0 0 28px rgba(255, 255, 255, 0.025),
    inset 0 -18px 30px rgba(0, 0, 0, 0.35),
    0 18px 40px rgba(0, 0, 0, 0.25);
}

.vinyl-disc::before {
  content: "";
  position: absolute;
  inset: 5.5%;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.vinyl-disc::after {
  content: "";
  position: absolute;
  inset: 14%;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.035);
}

.vinyl-ring {
  position: absolute;
  inset: 30.5%;
  border-radius: 50%;
  z-index: 2;
  background:
    radial-gradient(
      circle at center,
      rgba(0, 0, 0, 0.08) 0 58%,
      rgba(0, 0, 0, 0.85) 59% 100%
    );
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.035),
    inset 0 0 12px rgba(255, 255, 255, 0.02);
}

.vinyl-center {
  position: absolute;
  inset: 34.5%;
  border-radius: 50%;
  overflow: hidden;
  z-index: 3;
  background: #111;
  box-shadow:
    0 0 0 2px rgba(0, 0, 0, 0.35),
    inset 0 0 12px rgba(255, 255, 255, 0.04);
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.vinyl-light,
.vinyl-reflection-soft,
.vinyl-reflection-arc,
.vinyl-vignette {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
}

.vinyl-light {
  z-index: 5;
  mix-blend-mode: screen;
}

.vinyl-light-1 {
  top: 7%;
  bottom: 7%;
  left: 15%;
  width: 6.5%;
  border-radius: 999px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.14),
    rgba(255, 255, 255, 0.24),
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0)
  );
  filter: blur(1.6px);
  opacity: 0.7;
  transform: rotate(24deg);
}

.vinyl-light-2 {
  top: 13%;
  bottom: 13%;
  right: 22%;
  width: 3%;
  border-radius: 999px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.18),
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0)
  );
  filter: blur(1px);
  opacity: 0.35;
  transform: rotate(28deg);
}

.vinyl-reflection-soft {
  inset: 0;
  z-index: 4;
  background:
    radial-gradient(circle at 32% 24%, rgba(255, 255, 255, 0.08), transparent 14%),
    radial-gradient(circle at 64% 68%, rgba(255, 255, 255, 0.03), transparent 20%);
}

.vinyl-reflection-arc {
  inset: 2%;
  z-index: 4;
  background: conic-gradient(
    from 210deg,
    transparent 0deg,
    transparent 110deg,
    rgba(255, 255, 255, 0.055) 138deg,
    rgba(255, 255, 255, 0.015) 152deg,
    transparent 170deg,
    transparent 360deg
  );
  filter: blur(5px);
  opacity: 0.55;
}

.vinyl-vignette {
  inset: 0;
  z-index: 6;
  background:
    radial-gradient(circle at center, transparent 58%, rgba(255, 255, 255, 0.025) 72%, transparent 78%),
    radial-gradient(circle at center, transparent 72%, rgba(0, 0, 0, 0.16) 100%);
}
</style>