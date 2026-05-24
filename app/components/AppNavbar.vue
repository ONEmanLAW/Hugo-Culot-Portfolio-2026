<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const replayHomeReveal = inject<(() => void) | null>("replayHomeReveal", null);
const replayHomeRevealAndScroll = inject<((id: string) => void) | null>(
  "replayHomeRevealAndScroll",
  null
);

const links = [
  { label: "HOME", to: "/", action: "replay" as const },
  { label: "PROJECTS", to: "/", action: "scroll" as const, scrollTo: "projects-section" },
];

const isActive = (link: { to: string; action: string }) => {
  if (link.action === "scroll") return false;
  if (link.to === "/") return route.path === "/";
  return route.path.startsWith(link.to);
};

const handleClick = async (
  e: MouseEvent,
  link: { to: string; action: string; scrollTo?: string }
) => {
  e.preventDefault();

  if (link.action === "replay") {
    if (route.path !== "/") {
      await router.push("/");
      return;
    }
    replayHomeReveal?.();
    return;
  }

  if (link.action === "scroll" && link.scrollTo) {
    if (route.path !== link.to) {
      await router.push(link.to);
      // après navigation, attendre que le reveal initial soit fini puis scroll
      setTimeout(() => {
        document.getElementById(link.scrollTo!)?.scrollIntoView({ behavior: "smooth" });
      }, 1800);
      return;
    }
    replayHomeRevealAndScroll?.(link.scrollTo);
  }
};
</script>

<template>
  <header class="site-header">
    <nav class="site-nav" aria-label="Navigation principale">
      <NuxtLink
        v-for="link in links"
        :key="link.label"
        :to="link.to"
        class="site-nav-link"
        :class="{ 'is-active': isActive(link) }"
        @click="handleClick($event, link)"
      >
        <span class="site-nav-link-text">{{ link.label }}</span>
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
  position: relative;
  overflow: hidden;
  min-width: 168px;
  height: 58px;
  padding: 0 28px;
  border: 1.5px solid rgba(255, 255, 255, 0.72);
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(4px);
  font-family: var(--font-primary);
  font-size: clamp(20px, 1.6vw, 28px);
  line-height: 1;
  text-transform: uppercase;
  transition:
    transform 0.85s ease,
    background-color 0.85s ease,
    border-color 0.85s ease,
    color 0.85s ease,
    box-shadow 0.85s ease;
}

.site-nav-link::before {
  content: "";
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 10px;
  height: 1.5px;
  background: white;
  transform: scaleX(0);
  transform-origin: left center;
  opacity: 0.9;
  transition:
    transform 0.85s ease,
    opacity 0.85s ease;
}

.site-nav-link::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: translateX(-120%);
  transition: transform 0.85s ease;
}

.site-nav-link-text {
  position: relative;
  z-index: 1;
  transform: translateY(0);
  transition: transform 0.85s ease;
}

.site-nav-link:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: white;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
  transition-duration: 0.15s;
}

.site-nav-link:hover::before {
  transform: scaleX(1);
  opacity: 1;
  transition-duration: 0.15s;
}

.site-nav-link:hover::after {
  transform: translateX(120%);
  transition-duration: 0.15s;
}

.site-nav-link:hover .site-nav-link-text {
  transform: translateY(-1px);
  transition-duration: 0.15s;
}

.site-nav-link.is-active {
  background: rgba(255, 255, 255, 0.08);
  border-color: white;
}

.site-nav-link.is-active::before {
  transform: scaleX(1);
  opacity: 1;
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

  .site-nav-link::before {
    left: 14px;
    right: 14px;
    bottom: 9px;
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