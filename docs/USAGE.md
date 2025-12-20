# Usage Guide - BabaThings Central Styling Plugin

This guide provides detailed instructions for integrating the BabaThings Central Styling plugin into your Vue.js projects.

## Table of Contents

1. [Installation Methods](#installation-methods)
2. [Basic Integration](#basic-integration)
3. [Component Usage](#component-usage)
4. [Configuration Options](#configuration-options)
5. [Styling & Theming](#styling--theming)
6. [Advanced Usage](#advanced-usage)
7. [Troubleshooting](#troubleshooting)

## Installation Methods

### Method 1: NPM/Yarn (Recommended for Vue Projects)

```bash
npm install @babathings/central-styling
# or
yarn add @babathings/central-styling
```

**Best for:**
- Vue 3 projects with a build system (Vite, Webpack, etc.)
- Projects that need tree-shaking
- TypeScript projects

### Method 2: CDN (No Build Required)

```html
<link rel="stylesheet" href="https://aem90.github.io/babathings-central-styling/dist/style.css">
<script src="https://aem90.github.io/babathings-central-styling/dist/babathings-central-styling.umd.js"></script>
```

**Best for:**
- Quick prototypes
- Static HTML pages with Vue
- Projects without build tools

### Method 3: Direct Download

Download the `dist` folder from the [GitHub repository](https://github.com/AEM90/babathings-central-styling) and include it in your project.

## Basic Integration

### Full Plugin Setup (Recommended)

This gives you global access to all components and styles:

```javascript
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import BabaThingsPlugin from '@babathings/central-styling';
import '@babathings/central-styling/style.css';

const app = createApp(App);
app.use(BabaThingsPlugin);
app.mount('#app');
```

Now use components anywhere:

```vue
<!-- App.vue or any component -->
<template>
  <div>
    <BabaThingsNav />
    <main>
      <h1>My App</h1>
    </main>
  </div>
</template>
```

### CSS-Only Integration

If you only need the styling system without components:

```javascript
// main.js
import '@babathings/central-styling/style.css';
```

This gives you access to:
- CSS custom properties (variables)
- Base styles and resets
- Utility classes
- Dark mode support

### Component-Only Integration

Import specific components without global registration:

```vue
<script>
import { BabaThingsNav } from '@babathings/central-styling';
import '@babathings/central-styling/style.css';

export default {
  components: {
    BabaThingsNav
  }
};
</script>
```

## Component Usage

### BabaThingsNav Component

#### Basic Usage

```vue
<template>
  <BabaThingsNav />
</template>
```

This uses default configuration with all BabaThings apps.

#### With Custom Apps

```vue
<template>
  <BabaThingsNav :apps="myApps" />
</template>

<script>
export default {
  data() {
    return {
      myApps: [
        {
          id: 'my-app',
          name: 'My App',
          description: 'My awesome app',
          url: 'https://my-app.example.com',
          icon: '🚀',
          color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          status: 'new' // optional: 'new', 'beta', 'coming-soon'
        }
      ]
    };
  }
};
</script>
```

#### Full Configuration

```vue
<template>
  <BabaThingsNav 
    :apps="apps"
    :show-branding="true"
    :show-tagline="true"
    tagline="My Custom Tagline"
    logo-aria-label="Home - Return to dashboard"
    :vertical="false"
    :current-url="currentUrl"
  />
</template>

<script>
export default {
  computed: {
    currentUrl() {
      return window.location.href;
    }
  }
};
</script>
```

#### Custom Logo Slot

```vue
<template>
  <BabaThingsNav :apps="apps">
    <template #logo>
      <img src="/my-logo.svg" alt="My Brand" />
    </template>
  </BabaThingsNav>
</template>
```

### BabaThingsAppCard Component

#### Basic Grid Layout

```vue
<template>
  <div class="apps-grid">
    <BabaThingsAppCard
      v-for="app in apps"
      :key="app.id"
      :app="app"
    />
  </div>
</template>

<script>
import { defaultApps } from '@babathings/central-styling';

export default {
  data() {
    return {
      apps: defaultApps
    };
  }
};
</script>

<style>
.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem;
}
</style>
```

#### With Click Handler

```vue
<template>
  <BabaThingsAppCard
    :app="app"
    @click="handleAppClick"
  />
</template>

<script>
export default {
  methods: {
    handleAppClick(app) {
      console.log('Clicked:', app.name);
      // Add analytics tracking, etc.
    }
  }
};
</script>
```

## Configuration Options

### Plugin Configuration

When installing the plugin, you can pass configuration options:

```javascript
app.use(BabaThingsPlugin, {
  // Custom apps list
  apps: myCustomApps,
  
  // Branding options
  showBranding: true,
  tagline: 'My Custom Tagline',
  
  // Any other custom options
  // These will be available via inject('babaThingsConfig')
});
```

### Accessing Configuration in Components

```vue
<script>
import { inject } from 'vue';

export default {
  setup() {
    const apps = inject('babaThingsApps');
    const config = inject('babaThingsConfig');
    
    return { apps, config };
  }
};
</script>
```

### App Object Structure

Each app in the apps array should follow this structure:

```javascript
{
  // Required fields
  id: 'unique-identifier',           // Unique ID (lowercase, hyphenated)
  name: 'App Display Name',          // Human-readable name
  description: 'Short description',   // Brief description (1-2 sentences)
  url: 'https://app.example.com',    // Full URL to the app
  icon: '🚀',                        // Emoji or HTML icon
  color: 'linear-gradient(...)',     // CSS background for icon
  
  // Optional fields
  status: 'new',                     // 'new', 'beta', 'coming-soon', or null
}
```

## Styling & Theming

### CSS Variables

The plugin provides CSS custom properties that you can override:

```css
/* In your global CSS or App.vue */
:root {
  /* Colors */
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --primary-light: #818cf8;
  --secondary-color: #10b981;
  
  /* Backgrounds */
  --background-color: #f9fafb;
  --surface-color: #ffffff;
  
  /* Text */
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  
  /* Borders */
  --border-color: #e5e7eb;
  --border-radius: 12px;
  --border-radius-lg: 16px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Custom Theme Example

```css
/* Override for your brand colors */
:root {
  --primary-color: #ff6b6b;
  --secondary-color: #4ecdc4;
  --border-radius: 8px;
}
```

### Dark Mode

Dark mode is automatically applied based on system preference. Customize it:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #0f172a;
    --surface-color: #1e293b;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --border-color: #334155;
  }
}
```

### Utility Classes

The plugin includes utility classes you can use:

```html
<div class="text-center">Centered text</div>
<div class="mt-2">Margin top</div>
<div class="mb-3">Margin bottom</div>
```

Available margins: `mt-1`, `mt-2`, `mt-3`, `mt-4`, `mb-1`, `mb-2`, `mb-3`, `mb-4`

## Advanced Usage

### Custom Apps from API

Load apps dynamically from an API:

```vue
<template>
  <BabaThingsNav v-if="apps.length" :apps="apps" />
</template>

<script>
export default {
  data() {
    return {
      apps: []
    };
  },
  async mounted() {
    const response = await fetch('/api/apps');
    this.apps = await response.json();
  }
};
</script>
```

### Filtered Apps

Show only specific apps:

```vue
<template>
  <BabaThingsNav :apps="filteredApps" />
</template>

<script>
import { defaultApps } from '@babathings/central-styling';

export default {
  computed: {
    filteredApps() {
      return defaultApps.filter(app => 
        app.status !== 'coming-soon'
      );
    }
  }
};
</script>
```

### With Vue Router

Highlight active app based on current route:

```vue
<template>
  <BabaThingsNav 
    :apps="apps" 
    :current-url="$route.path"
  />
</template>
```

### Multiple Navigation Instances

You can have different navigation for different sections:

```vue
<template>
  <div>
    <!-- Main navigation with all apps -->
    <BabaThingsNav :apps="allApps" />
    
    <!-- Sidebar with featured apps only -->
    <aside>
      <BabaThingsNav 
        :apps="featuredApps"
        :show-branding="false"
        :vertical="true"
      />
    </aside>
  </div>
</template>
```

### Custom App Card Styling

Override component styles with CSS:

```vue
<style>
/* Make cards larger */
.babathings-app-card {
  min-height: 220px !important;
}

/* Change icon size */
.babathings-app-card__icon {
  width: 100px !important;
  height: 100px !important;
  font-size: 3rem !important;
}
</style>
```

## Troubleshooting

### Components Not Rendering

**Problem**: Components don't appear or show as undefined.

**Solution**: Make sure you've installed the plugin:

```javascript
import BabaThingsPlugin from '@babathings/central-styling';
app.use(BabaThingsPlugin);
```

### Styles Not Applied

**Problem**: Components appear but are unstyled.

**Solution**: Import the CSS file:

```javascript
import '@babathings/central-styling/style.css';
```

### CSS Variables Not Working

**Problem**: Custom CSS variables aren't taking effect.

**Solution**: Make sure your CSS is loaded after the plugin's CSS, or use `!important`:

```css
:root {
  --primary-color: #ff0000 !important;
}
```

### TypeScript Errors

**Problem**: TypeScript complains about component types.

**Solution**: Create a `shims-vue.d.ts` file:

```typescript
declare module '@babathings/central-styling' {
  import { Plugin } from 'vue';
  const plugin: Plugin;
  export default plugin;
  export const BabaThingsNav: any;
  export const BabaThingsAppCard: any;
  export const defaultApps: any[];
}
```

### Build Errors

**Problem**: Build fails with module resolution errors.

**Solution**: Make sure peer dependencies are installed:

```bash
npm install vue@^3.0.0
```

### Dark Mode Not Working

**Problem**: Dark mode doesn't apply.

**Solution**: The plugin uses system preference. Test with:

```css
/* Force dark mode for testing */
@media (prefers-color-scheme: light) {
  /* Remove light mode if testing dark */
}
```

Or use browser DevTools to simulate dark mode.

## Best Practices

1. **Always import CSS**: Don't forget to import the stylesheet
2. **Use semantic apps data**: Provide complete app objects with all required fields
3. **Customize CSS variables**: Override CSS variables instead of component styles
4. **Handle click events**: Track analytics on app card clicks
5. **Lazy load if needed**: If you have many apps, consider lazy loading
6. **Test responsive**: Always test on mobile, tablet, and desktop
7. **Accessibility**: Keep ARIA labels descriptive and meaningful

## Need More Help?

- Check the [main README](../README.md) for additional information
- Open an issue on [GitHub](https://github.com/AEM90/babathings-central-styling/issues)
- Contact support: support@babathings.com

---

**Happy coding! 🚀**
