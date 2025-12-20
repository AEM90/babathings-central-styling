<template>
  <div id="app" class="app-wrapper">
    <FuturisticHeader :nav-items="navItems" />
    
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <FuturisticFooter />
  </div>
</template>

<script>
import FuturisticHeader from './components/FuturisticHeader.vue';
import FuturisticFooter from './components/FuturisticFooter.vue';

export default {
  name: 'App',
  components: {
    FuturisticHeader,
    FuturisticFooter
  },
  data() {
    return {
      navItems: [
        { path: '/', label: 'Home', icon: '🏠' },
        { path: '/tools', label: 'Tools', icon: '🛠️' },
        { path: '/about', label: 'About', icon: '💡' },
        { path: '/contact', label: 'Contact', icon: '📧' }
      ]
    };
  }
};
</script>

<style>
/* Import futuristic theme */
@import './styles/theme.css';

/* App Wrapper */
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
