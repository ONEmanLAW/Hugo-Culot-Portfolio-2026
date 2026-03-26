<script setup lang="ts">
import { gsap } from "gsap";

const emit = defineEmits<{
  done: [];
}>();

const pageLoader = ref<HTMLElement | null>(null);
const pageLoaderLine = ref<HTMLElement | null>(null);

onMounted(async () => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  await nextTick();

  if (pageLoader.value) {
    gsap.set(pageLoader.value, { yPercent: 0, autoAlpha: 1 });
  }

  if (pageLoaderLine.value) {
    gsap.set(pageLoaderLine.value, {
      scaleX: 0,
      transformOrigin: "left center",
    });
  }

  window.scrollTo(0, 0);

  const tl = gsap.timeline({
    onComplete: () => {
      if (pageLoader.value) {
        gsap.set(pageLoader.value, { display: "none" });
      }

      emit("done");
    },
  });

  tl.to(pageLoaderLine.value, {
    scaleX: 1,
    duration: 0.45,
    ease: "power2.out",
  })
    .to(pageLoaderLine.value, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 0.35,
      ease: "power2.in",
    })
    .to(
      pageLoader.value,
      {
        yPercent: -100,
        duration: 0.9,
        ease: "expo.inOut",
      },
      "-=0.05"
    );
});
</script>

<template>
  <div ref="pageLoader" class="page-loader">
    <div ref="pageLoaderLine" class="page-loader-line"></div>
  </div>
</template>

<style scoped>
.page-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.page-loader-line {
  width: min(220px, 34vw);
  height: 2px;
  background: white;
}
</style>