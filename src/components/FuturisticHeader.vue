<template>
  <header class="futuristic-header" :class="{ 'header-scrolled': isScrolled }">
    <div class="header-bg"></div>
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <router-link to="/" class="logo">
          <div class="logo-icon">
            <span class="logo-glow"></span>
            <span class="logo-text">BT</span>
          </div>
          <span class="logo-name">BabaThings</span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="main-nav" :class="{ 'nav-open': mobileMenuOpen }">
          <ul class="nav-list">
            <li v-for="item in navItems" :key="item.path" class="nav-item">
              <router-link 
                :to="item.path" 
                class="nav-link"
                :class="{ 'nav-link-active': isActivePath(item.path) }"
              >
                <span class="nav-icon">{{ item.icon }}</span>
                <span class="nav-text">{{ item.label }}</span>
              </router-link>
            </li>
          </ul>
        </nav>

        <!-- CTA Button -->
        <div class="header-actions">
          <button class="btn btn-neon btn-sm">Get Started</button>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
          <span class="menu-icon" :class="{ 'menu-icon-active': mobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'FuturisticHeader',
  props: {
    navItems: {
      type: Array,
      default: () => [
        { path: '/', label: 'Home', icon: '🏠' },
        { path: '/tools', label: 'Tools', icon: '🛠️' },
        { path: '/about', label: 'About', icon: '💡' },
        { path: '/contact', label: 'Contact', icon: '📧' }
      ]
    }
  },
  data() {
    return {
      isScrolled: false,
      mobileMenuOpen: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    isActivePath(path) {
      return this.$route && this.$route.path === path;
    }
  }
};
</script>

<style scoped>
.futuristic-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: var(--z-fixed);
  transition: var(--transition-base);
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--surface-glass);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border-bottom: 1px solid transparent;
  transition: var(--transition-base);
}

.header-scrolled .header-bg {
  backdrop-filter: var(--blur-md);
  -webkit-backdrop-filter: var(--blur-md);
  border-bottom-color: var(--border-glass);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.header-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) 0;
  gap: var(--space-lg);
}

/* Logo Styles */
.logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  text-decoration: none;
  z-index: 2;
}

.logo-icon {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-gradient);
  border-radius: var(--radius-md);
  box-shadow: var(--glow-primary);
  transition: var(--transition-base);
}

.logo-glow {
  position: absolute;
  inset: -4px;
  background: var(--primary-gradient);
  border-radius: var(--radius-md);
  opacity: 0.3;
  filter: blur(12px);
  animation: pulse 2s ease-in-out infinite;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  position: relative;
  z-index: 1;
}

.logo-name {
  font-size: 1.25rem;
  font-weight: 700;
  background: var(--text-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo:hover .logo-icon {
  transform: scale(1.05) rotate(-5deg);
  box-shadow: 0 0 40px var(--primary-glow);
}

/* Navigation */
.main-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: var(--transition-fast);
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--surface-glass);
  opacity: 0;
  transition: var(--transition-fast);
  border-radius: var(--radius-full);
}

.nav-link:hover::before,
.nav-link-active::before {
  opacity: 1;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link-active {
  color: var(--primary-color);
}

.nav-icon {
  font-size: 1.1rem;
  position: relative;
  z-index: 1;
}

.nav-text {
  position: relative;
  z-index: 1;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;
}

.menu-icon {
  position: relative;
  width: 24px;
  height: 18px;
}

.menu-icon span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: var(--transition-base);
}

.menu-icon span:nth-child(1) {
  top: 0;
}

.menu-icon span:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.menu-icon span:nth-child(3) {
  bottom: 0;
}

.menu-icon-active span:nth-child(1) {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.menu-icon-active span:nth-child(2) {
  opacity: 0;
}

.menu-icon-active span:nth-child(3) {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .nav-text {
    display: none;
  }
  
  .nav-link {
    padding: var(--space-xs);
  }
}

@media (max-width: 768px) {
  .header-actions {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .main-nav {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: var(--surface-solid);
    backdrop-filter: var(--blur-lg);
    -webkit-backdrop-filter: var(--blur-lg);
    border-bottom: 1px solid var(--border-glass);
    padding: var(--space-lg);
    transform: translateY(-100%);
    opacity: 0;
    transition: var(--transition-base);
    pointer-events: none;
  }
  
  .main-nav.nav-open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  
  .nav-list {
    flex-direction: column;
    gap: var(--space-sm);
    width: 100%;
  }
  
  .nav-link {
    width: 100%;
    justify-content: flex-start;
    padding: var(--space-md);
  }
  
  .nav-text {
    display: inline;
  }
  
  .logo-name {
    display: none;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: var(--space-sm) 0;
  }
  
  .logo-icon {
    width: 40px;
    height: 40px;
  }
  
  .logo-text {
    font-size: 1.25rem;
  }
}
</style>
