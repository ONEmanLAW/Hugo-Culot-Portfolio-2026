<script setup lang="ts">
import VinylSleeve from "~/components/VinylSleeve.vue";

defineProps<{
  projects: any[];
}>();
</script>

<template>
  <section class="projects-grid-section">
    <div class="projects-grid">
      <div
        v-for="(project, i) in projects"
        :key="project.id"
        class="grid-item"
        :class="`grid-col-${(i % 3) + 1}`"
      >
        <VinylSleeve
          :image="project.data.image"
          :title="project.data.title"
          :year="project.data.year"
          :tags="project.data.tags"
          :primary-color="project.data.main_color"
          :secondary-color="project.data.secondary_color"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-grid-section {
  background: #c9bfb0;
  padding: 160px 0 120px;
  overflow-x: hidden;
}

.projects-grid {
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 clamp(40px, 6vw, 120px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: clamp(60px, 8vw, 160px);
  row-gap: clamp(80px, 10vw, 180px);
}

.grid-item {
  width: 100%;
  max-width: clamp(280px, 22vw, 480px);
  justify-self: center;
}

.grid-col-1 { transform: translateY(0); }
.grid-col-2 { transform: translateY(clamp(80px, 10vw, 180px)); }
.grid-col-3 { transform: translateY(0); }

@media (max-width: 1100px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    column-gap: clamp(100px, 14vw, 180px);
    row-gap: clamp(60px, 8vw, 120px);
  }

  .grid-item {
    max-width: clamp(220px, 28vw, 340px);
  }

  .grid-item:nth-child(odd)  { transform: translateY(0); }
  .grid-item:nth-child(even) { transform: translateY(clamp(60px, 8vw, 120px)); }
}

@media (max-width: 640px) {
  .projects-grid-section {
    padding: 100px 0 80px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    padding: 0 24px;
    row-gap: 60px;
  }

  .grid-item {
    max-width: 65%;
    justify-self: start;
    transform: none !important;
  }
}
</style>