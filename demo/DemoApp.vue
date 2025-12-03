<template>
  <div class="demo-app">
    <BabaThingsNav 
      :apps="apps"
      :show-branding="true"
      :show-tagline="true"
    />
    
    <main class="demo-content">
      <div class="container">
        <header class="header">
          <h1 class="demo-title">BabaThings Central Styling Plugin</h1>
          <p class="demo-subtitle">
            A Vue.js plugin providing central styling, navigation, and reusable components for all BabaThings subdomain projects.
          </p>
          <div class="header-badges">
            <span class="badge">Vue 3</span>
            <span class="badge">TypeScript Ready</span>
            <span class="badge">Tree-shakeable</span>
            <span class="badge">CDN Ready</span>
          </div>
        </header>

        <section class="demo-section">
          <h2>📦 Installation</h2>
          <div class="code-block">
            <code>npm install @babathings/central-styling</code>
          </div>
        </section>

        <section class="demo-section">
          <h2>🚀 Quick Start</h2>
          <div class="code-block">
<pre>// main.js
import { createApp } from 'vue';
import BabaThingsPlugin from '@babathings/central-styling';
import '@babathings/central-styling/style.css';

const app = createApp(App);
app.use(BabaThingsPlugin);
app.mount('#app');</pre>
          </div>
        </section>
        
        <section class="demo-section">
          <h2>🎨 Navigation Component Demo</h2>
          <p class="demo-description">The navigation component above shows all BabaThings apps with SEO-optimized links.</p>
        </section>

        <section class="demo-section">
          <h2>🧩 App Cards Component Demo</h2>
          <p class="demo-description">Interactive cards for displaying all BabaThings applications:</p>
          <div class="apps-grid">
            <BabaThingsAppCard
              v-for="app in apps"
              :key="app.id"
              :app="app"
              @click="handleAppClick"
            />
          </div>
        </section>

        <section class="demo-section">
          <h2>✨ Features</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🔌</div>
              <h3>Easy Integration</h3>
              <p>One-line plugin installation in any Vue 3 project</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🎨</div>
              <h3>Passive Styling</h3>
              <p>Global CSS that doesn't interfere with your styles</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📱</div>
              <h3>Responsive</h3>
              <p>Works seamlessly on all devices</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🌙</div>
              <h3>Dark Mode</h3>
              <p>Automatic dark mode support</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">♿</div>
              <h3>SEO Optimized</h3>
              <p>Semantic HTML with ARIA labels</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📦</div>
              <h3>Tree-shakeable</h3>
              <p>Import only what you need</p>
            </div>
          </div>
        </section>

        <section class="demo-section">
          <h2>🔗 Links</h2>
          <div class="links">
            <a href="https://github.com/AEM90/babathings-central-styling" class="link-button" target="_blank">
              GitHub Repository
            </a>
            <a href="https://www.npmjs.com/package/@babathings/central-styling" class="link-button" target="_blank">
              npm Package
            </a>
          </div>
        </section>
      </div>
    </main>
    
    <footer class="footer">
      <p>&copy; 2025 BabaThings.com - All rights reserved</p>
    </footer>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  name: 'DemoApp',
  setup() {
    const apps = inject('babaThingsApps', []);
    
    const handleAppClick = (app) => {
      console.log('App clicked:', app.name);
    };
    
    return {
      apps,
      handleAppClick
    };
  }
};
</script>

<style scoped>
.demo-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.demo-content {
  flex: 1;
  padding: 2rem 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem 0;
}

.demo-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.demo-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
}

.header-badges {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.demo-section {
  margin-bottom: 4rem;
}

.demo-section h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.demo-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.code-block {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin: 1rem 0;
  overflow-x: auto;
}

.code-block code,
.code-block pre {
  font-family: 'Courier New', 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-primary);
  white-space: pre;
  margin: 0;
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  text-align: center;
  transition: var(--transition);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.feature-card p {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.link-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: var(--transition);
}

.link-button:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.footer {
  text-align: center;
  padding: 2rem 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
  border-top: 1px solid var(--border-color);
  margin-top: auto;
}

@media (max-width: 768px) {
  .demo-title {
    font-size: 2rem;
  }
  
  .demo-subtitle {
    font-size: 1rem;
  }
  
  .apps-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1.5rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .header {
    padding: 2rem 0;
    margin-bottom: 2rem;
  }
}

@media (max-width: 480px) {
  .demo-title {
    font-size: 1.75rem;
  }
  
  .apps-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  }
  
  .header-badges {
    gap: 0.5rem;
  }
  
  .badge {
    font-size: 0.8125rem;
    padding: 0.375rem 0.75rem;
  }
}
</style>
