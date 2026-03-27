<script setup lang="ts">
import VinylDisc from "~/components/VinylDisc.vue";

interface TagItem {
  title?: string | null;
}

const props = defineProps<{
  image?: any;
  title?: string | null;
  year?: string | number | null;
  tags?: TagItem[] | null;
  indexLabel?: string;
  primaryColor?: string | null;
  secondaryColor?: string | null;
}>();

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

const sectionStyles = computed(() => {
  return {
    "--project-primary": props.primaryColor || "var(--color-primary)",
    "--project-secondary": props.secondaryColor || "var(--color-secondary)",
  };
});
</script>

<template>
  <section class="next-section" :style="sectionStyles">
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
        <VinylDisc :image="image" :title="title" />
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
  background-color: var(--project-primary);
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
  background: var(--project-secondary);
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
  font-family: var(--font-primary);
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
  font-family: var(--font-primary);
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

.project-bottom {
  position: absolute;
  left: 34px;
  bottom: 54px;
  z-index: 3;
}

.project-title {
  font-size: clamp(58px, 5.2vw, 86px);
  line-height: 0.88;
  font-family: var(--font-primary);
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
  font-family: var(--font-primary);
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