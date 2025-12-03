import BabaThingsNav from './components/BabaThingsNav.vue';
import BabaThingsAppCard from './components/BabaThingsAppCard.vue';
import { defaultApps } from './config/apps.js';
import './styles/babathings.css';

/**
 * BabaThings Central Styling Plugin
 * 
 * A Vue.js plugin that provides central, passive styling for all BabaThings subdomain projects.
 * Includes reusable components, global CSS, and SEO-optimized navigation.
 * 
 * @example
 * // In your main.js/main.ts
 * import { createApp } from 'vue';
 * import BabaThingsPlugin from '@babathings/central-styling';
 * import '@babathings/central-styling/style.css';
 * 
 * const app = createApp(App);
 * app.use(BabaThingsPlugin);
 */

const BabaThingsPlugin = {
  install(app, options = {}) {
    // Register global components
    app.component('BabaThingsNav', BabaThingsNav);
    app.component('BabaThingsAppCard', BabaThingsAppCard);
    
    // Provide default apps configuration
    const apps = options.apps || defaultApps;
    app.provide('babaThingsApps', apps);
    
    // Provide global config
    const config = {
      apps,
      showBranding: options.showBranding !== false,
      tagline: options.tagline || 'Your productivity & fun toolkit',
      ...options
    };
    app.provide('babaThingsConfig', config);
    
    // Add global properties (Vue 3)
    app.config.globalProperties.$babaThings = {
      apps,
      config
    };
  }
};

// Export components and plugin
export default BabaThingsPlugin;
export { BabaThingsNav, BabaThingsAppCard, defaultApps };

// Auto-install when used via CDN (Vue 3)
if (typeof window !== 'undefined' && window.Vue) {
  const app = window.Vue.createApp({});
  app.use(BabaThingsPlugin);
}
