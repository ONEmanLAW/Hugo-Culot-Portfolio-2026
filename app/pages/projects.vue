<script setup lang="ts">
import VinylSleeve from "~/components/VinylSleeve.vue";

const { client } = usePrismic();

const { data: projects } = await useAsyncData("all-projects", () =>
  client.getAllByType("project")
);

useSeoMeta({
  title: "Projets",
});
</script>

<template>
  <main class="projects-page">
    <PageReveal />
    <AppNavbar />

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
  </main>
</template>

<style scoped>
.projects-page {
  min-height: 100vh;
  background: #c9bfb0;
  padding: 160px 0 120px;
  overflow-x: hidden;
}

.projects-grid-section {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 120px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 120px;
  row-gap: 140px;
}

.grid-item {
  width: 100%;
  max-width: 420px;
  justify-self: center;
}

.grid-col-1 {
  transform: translateY(0);
}

.grid-col-2 {
  transform: translateY(160px);
}

.grid-col-3 {
  transform: translateY(0);
}

@media (max-width: 1300px) {
  .projects-grid-section {
    padding: 0 80px;
  }

  .projects-grid {
    column-gap: 80px;
  }

  .grid-item {
    max-width: 360px;
  }
}

@media (max-width: 900px) {
  .projects-page {
    padding: 100px 24px 80px;
  }

  .projects-grid-section {
    padding: 0;
  }

  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 60px;
    row-gap: 80px;
  }

  .grid-item {
    max-width: none;
    transform: none !important;
  }
}

@media (max-width: 560px) {
  .projects-grid {
    grid-template-columns: 1fr;
    row-gap: 60px;
  }
}
</style>