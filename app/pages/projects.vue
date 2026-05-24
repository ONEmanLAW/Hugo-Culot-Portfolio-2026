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
          :class="`grid-item-${(i % 6) + 1}`"
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
  padding: 160px 80px 120px;
}

.projects-grid-section {
  max-width: 1400px;
  margin: 0 auto;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 100px;
  row-gap: 120px;
}

.grid-item {
  width: 100%;
  max-width: 320px;
  justify-self: center;
}

/* Décalages verticaux pour effet asymétrique */
.grid-item-1 { transform: translateY(0); }
.grid-item-2 { transform: translateY(80px); }
.grid-item-3 { transform: translateY(0); }
.grid-item-4 { transform: translateY(40px); }
.grid-item-5 { transform: translateY(120px); }
.grid-item-6 { transform: translateY(40px); }

@media (max-width: 1200px) {
  .projects-grid {
    column-gap: 60px;
  }
}

@media (max-width: 900px) {
  .projects-page {
    padding: 100px 24px 80px;
  }

  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 40px;
    row-gap: 80px;
  }

  .grid-item {
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