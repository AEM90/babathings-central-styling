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
          <h1 class="demo-title">BabaThings Plugin Demo</h1>
          <p class="demo-subtitle">
            This demonstrates the BabaThings Central Styling plugin with navigation and app cards.
          </p>
        </header>
        
        <section class="demo-section">
          <h2>All Apps</h2>
          <div class="apps-grid">
            <BabaThingsAppCard
              v-for="app in apps"
              :key="app.id"
              :app="app"
              @click="handleAppClick"
            />
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
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.demo-title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.demo-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 3rem;
}

.demo-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
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
  
  .container {
    padding: 0 1rem;
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
}
</style>
