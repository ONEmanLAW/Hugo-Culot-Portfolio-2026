<script setup lang="ts">
const route = useRoute();

const links = [
  { label: "HOME", to: "/" },
  { label: "PROJECTS", to: "/projects" },
];

const isActive = (to: string) => {
  if (to === "/") {
    return route.path === "/";
  }

  return route.path.startsWith(to);
};
</script>

<template>
  <header class="site-header">
    <nav class="site-nav" aria-label="Navigation principale">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="site-nav-link"
        :class="{ 'is-active': isActive(link.to) }"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 200;
  padding: 28px 28px 0;
  pointer-events: none;
}

.site-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.site-nav-link {
  pointer-events: auto;
  min-width: 168px;
  height: 58px;
  padding: 0 28px;
  border: 2px solid white;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  background: transparent;
  font-family: var(--font-primary);
  font-size: clamp(20px, 1.6vw, 28px);
  line-height: 1;
  text-transform: uppercase;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease,
    opacity 0.2s ease;
}

.site-nav-link:hover {
  background: white;
  color: var(--color-primary);
  transform: translateY(-2px);
}

.site-nav-link.is-active {
  background: rgba(255, 255, 255, 0.12);
}

@media (max-width: 768px) {
  .site-header {
    padding: 18px 16px 0;
  }

  .site-nav-link {
    min-width: 132px;
    height: 50px;
    padding: 0 18px;
    font-size: 18px;
  }
}

@media (max-width: 520px) {
  .site-nav-link {
    min-width: 110px;
    height: 46px;
    font-size: 16px;
  }
}
</style>