# Example: Vue + Vite Project

This example shows how to integrate the BabaThings Central Styling plugin into a Vue 3 + Vite project.

## Project Structure

```
my-vue-app/
├── src/
│   ├── main.js          # Plugin installation here
│   ├── App.vue          # Use components here
│   └── ...
├── package.json
└── vite.config.js
```

## Installation

```bash
npm install @babathings/central-styling
```

## main.js

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import BabaThingsPlugin from '@babathings/central-styling';
import '@babathings/central-styling/style.css';

const app = createApp(App);

// Install the plugin with default configuration
app.use(BabaThingsPlugin);

// Or with custom configuration
// app.use(BabaThingsPlugin, {
//   apps: customAppsArray,
//   tagline: 'My Custom Tagline'
// });

app.mount('#app');
```

## App.vue

```vue
<template>
  <div id="app">
    <!-- Navigation component with all BabaThings apps -->
    <BabaThingsNav />
    
    <!-- Your main content -->
    <main>
      <div class="container">
        <h1>Welcome to My App</h1>
        <p>This is my BabaThings subdomain project!</p>
      </div>
    </main>
    
    <footer class="footer">
      <p>&copy; 2025 BabaThings</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/* Your custom styles */
</style>
```

## With Vue Router

If you're using Vue Router, add the navigation to your layout:

```vue
<!-- src/layouts/MainLayout.vue -->
<template>
  <div>
    <BabaThingsNav :current-url="$route.path" />
    <router-view />
  </div>
</template>
```

## Custom Apps Configuration

```javascript
// src/config/apps.js
export const myApps = [
  {
    id: 'my-app-1',
    name: 'My First App',
    description: 'Description of my app',
    url: 'https://app1.babathings.com',
    icon: '🚀',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    status: 'new'
  },
  {
    id: 'my-app-2',
    name: 'My Second App',
    description: 'Another cool app',
    url: 'https://app2.babathings.com',
    icon: '⚡',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  }
];
```

```javascript
// main.js
import { myApps } from './config/apps';

app.use(BabaThingsPlugin, {
  apps: myApps
});
```

## TypeScript Support

Create a `shims-vue.d.ts` file:

```typescript
declare module '@babathings/central-styling' {
  import { Plugin } from 'vue';
  
  const BabaThingsPlugin: Plugin;
  export default BabaThingsPlugin;
  
  export interface BabaThingsApp {
    id: string;
    name: string;
    description: string;
    url: string;
    icon: string;
    color: string;
    status?: 'new' | 'beta' | 'coming-soon' | null;
  }
  
  export const BabaThingsNav: any;
  export const BabaThingsAppCard: any;
  export const defaultApps: BabaThingsApp[];
}
```

## Custom Styling

Override CSS variables in your App.vue or global CSS:

```css
:root {
  --primary-color: #ff6b6b;
  --secondary-color: #4ecdc4;
}
```

## That's It!

Your Vue app now has:
- ✅ BabaThings branding and navigation
- ✅ Consistent styling across all subdomains
- ✅ Responsive design
- ✅ Dark mode support
- ✅ SEO-optimized links

## Running the Project

```bash
npm run dev     # Development server
npm run build   # Production build
```

## Need Help?

Check the main [README](../../README.md) and [Usage Guide](../../docs/USAGE.md).
