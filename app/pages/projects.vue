<script setup lang="ts">
import ProjectsGrid from "~/components/ProjectsGrid.vue";

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

    <ProjectsGrid :projects="projects ?? []" />
  </main>
</template>

<style scoped>
.projects-page {
  min-height: 100vh;
  background: #c9bfb0;
  padding-top: 80px;
}
</style>