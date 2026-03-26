<template>
  <main class="projects-page">
    <nav>
      <NuxtLink to="/">Accueil</NuxtLink>
      <NuxtLink to="/projects">Projets</NuxtLink>
    </nav>
    
    <AppNavbar />
    <section class="projects-hero">
      <h1>Projets</h1>
      <p>Page en construction</p>
    </section>
  </main>
</template>

<style scoped>
.projects-page {
  min-height: 100vh;
  background: black;
  color: white;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
}

.projects-hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
}

.projects-hero h1 {
  font-size: 128px;
  font-family: var(--font-primary);
}

.projects-hero p {
  font-size: 24px;
  font-family: var(--font-secondary);
}
</style>