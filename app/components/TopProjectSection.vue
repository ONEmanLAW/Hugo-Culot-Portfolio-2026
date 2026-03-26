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

const countParts = computed(() => {
  const raw = props.indexLabel ?? "01/04";
  const [current = "01", total = "04"] = raw.split("/");

  return {
    current,
    total,
  };
});
</script>

<template>
  <section class="next-section">
    <div class="project-card">
      <div class="project-bg"></div>

      <div class="project-top">
        <p class="project-count">
          <span class="project-count-current">{{ countParts.current }}</span>
          <span class="project-count-total">/{{ countParts.total }}</span>
        </p>

        <p class="project-year">{{ year }}</p>
      </div>

      <div class="project-visual">
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
  overflow: hidden;
}

.project-card {
  width: min(100%, 1180px);
  min-height: 820px;
  position: relative;
}

.project-bg {
  position: absolute;
  top: 110px;
  left: 78px;
  right: 78px;
  bottom: 138px;
  background: rgba(255, 94, 0, 0.52);
}

.project-top {
  position: absolute;
  top: 86px;
  left: 58px;
  right: 58px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 3;
}

.project-count {
  display: flex;
  align-items: flex-start;
  line-height: 0.82;
  font-family: "Bebas Neue", sans-serif;
  color: white;
}

.project-count-current {
  font-size: clamp(92px, 8vw, 126px);
}

.project-count-total {
  font-size: clamp(40px, 3.6vw, 66px);
  transform: translateY(-2px);
}

.project-year {
  font-size: clamp(48px, 4vw, 76px);
  line-height: 0.88;
  font-family: "Bebas Neue", sans-serif;
  color: white;
  border: 4px solid white;
  padding: 8px 14px 4px;
}

.project-visual {
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(56vw, 620px);
  aspect-ratio: 1 / 1;
  transform: translate(-50%, -50%);
  z-index: 2;
}

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

.project-bottom {
  position: absolute;
  left: 34px;
  bottom: 54px;
  z-index: 3;
}

.project-title {
  font-size: clamp(58px, 5.2vw, 86px);
  line-height: 0.88;
  font-family: "Bebas Neue", sans-serif;
  color: white;
  margin-bottom: 20px;
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
  font-size: clamp(24px, 2vw, 34px);
  line-height: 1;
  font-family: "Bebas Neue", sans-serif;
  text-transform: uppercase;
}

@media (max-width: 1100px) {
  .project-card {
    min-height: 720px;
  }

  .project-bg {
    left: 30px;
    right: 30px;
    top: 116px;
    bottom: 130px;
  }

  .project-top {
    left: 20px;
    right: 20px;
  }

  .project-bottom {
    left: 14px;
  }

  .project-visual {
    width: min(62vw, 540px);
  }
}

@media (max-width: 780px) {
  .next-section {
    margin-top: -180px;
    padding: 24px 16px;
  }

  .project-card {
    min-height: 700px;
  }

  .project-bg {
    left: 0;
    right: 0;
    top: 110px;
    bottom: 150px;
  }

  .project-top {
    top: 70px;
    left: 0;
    right: 0;
  }

  .project-year {
    padding: 6px 10px 3px;
  }

  .project-visual {
    width: min(84vw, 420px);
    top: 47%;
  }

  .project-bottom {
    left: 0;
    right: 0;
    bottom: 40px;
  }

  .project-tags {
    gap: 10px;
  }

  .project-tag {
    padding: 8px 12px;
  }
}
</style>