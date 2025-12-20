# @babathings/central-styling

[![npm version](https://img.shields.io/npm/v/@babathings/central-styling.svg)](https://www.npmjs.com/package/@babathings/central-styling)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Central styling and navigation system for BabaThings subdomain projects - A Vue.js plugin providing passive styling, reusable components, and SEO-optimized navigation.

## 🎯 Features

- **🔌 Easy Integration**: One-line plugin installation in any Vue 3 project
- **🎨 Passive Styling**: Global CSS that doesn't interfere with your app's styles
- **🧩 Reusable Components**: Pre-built Vue components for navigation and app cards
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **🌙 Dark Mode Support**: Automatic dark mode based on user preference
- **♿ SEO Optimized**: Semantic HTML with proper ARIA labels for accessibility
- **🚀 CDN Ready**: Serve via CDN or GitHub Pages without npm
- **📦 Tree-shakeable**: Import only what you need

## 📦 Installation

### Option 1: NPM/Yarn (Recommended)

```bash
npm install @babathings/central-styling
# or
yarn add @babathings/central-styling
```

### Option 2: CDN (No build step required)

```html
<!-- Load from CDN -->
<link rel="stylesheet" href="https://aem90.github.io/babathings-central-styling/dist/style.css">
<script src="https://aem90.github.io/babathings-central-styling/dist/babathings-central-styling.umd.js"></script>
```

## 🚀 Quick Start

### Full Plugin Installation (Recommended)

```javascript
// main.js or main.ts
import { createApp } from 'vue';
import App from './App.vue';
import BabaThingsPlugin from '@babathings/central-styling';
import '@babathings/central-styling/style.css';

const app = createApp(App);
app.use(BabaThingsPlugin);
app.mount('#app');
```

That's it! Now you can use the components anywhere in your app:

```vue
<template>
  <div>
    <BabaThingsNav />
    <main>
      <!-- Your app content -->
    </main>
  </div>
</template>
```

### Import Only CSS (Minimal Integration)

If you only want the styling without components:

```javascript
// main.js
import '@babathings/central-styling/style.css';
```

### Import Specific Components

```javascript
import { BabaThingsNav, BabaThingsAppCard } from '@babathings/central-styling';
import '@babathings/central-styling/style.css';

export default {
  components: {
    BabaThingsNav,
    BabaThingsAppCard
  }
};
```

## 📖 Components

### BabaThingsNav

A responsive navigation component with SEO-optimized links to all BabaThings apps.

```vue
<template>
  <BabaThingsNav 
    :apps="customApps"
    :show-branding="true"
    :show-tagline="true"
    tagline="Custom tagline"
    :vertical="false"
    :current-url="currentUrl"
  />
</template>

<script>
export default {
  data() {
    return {
      currentUrl: window.location.href,
      customApps: [
        {
          id: 'my-app',
          name: 'My App',
          description: 'My cool app',
          url: 'https://my-app.babathings.com',
          icon: '🚀',
          color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          status: 'new'
        }
      ]
    };
  }
};
</script>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apps` | Array | defaultApps | Array of app objects to display |
| `showBranding` | Boolean | true | Show BabaThings logo and branding |
| `showTagline` | Boolean | true | Show tagline below logo |
| `tagline` | String | 'Your productivity & fun toolkit' | Custom tagline text |
| `vertical` | Boolean | false | Vertical layout instead of horizontal |
| `currentUrl` | String | '' | Current URL to highlight active app |
| `logoAriaLabel` | String | 'BabaThings Home...' | ARIA label for logo link |

### BabaThingsAppCard

A card component for displaying individual apps in a grid layout.

```vue
<template>
  <div class="apps-grid">
    <BabaThingsAppCard
      v-for="app in apps"
      :key="app.id"
      :app="app"
      @click="handleAppClick"
    />
  </div>
</template>

<script>
export default {
  methods: {
    handleAppClick(app) {
      console.log('Clicked:', app.name);
    }
  }
};
</script>
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `app` | Object | Yes | App object with id, name, description, url, icon, color, status |

**Events:**

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | app object | Emitted when card is clicked |

**App Object Structure:**

```javascript
{
  id: 'unique-id',           // Unique identifier (required)
  name: 'App Name',          // Display name (required)
  description: 'Description', // Short description (required)
  url: 'https://app.url',    // App URL (required)
  icon: '🚀',                // Emoji or icon (required)
  color: 'gradient(...)',    // CSS background (required)
  status: 'new'              // Optional: 'new', 'beta', 'coming-soon'
}
```

## 🎨 Styling & Customization

### CSS Variables

The plugin uses CSS custom properties that you can override:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #10b981;
  --background-color: #f9fafb;
  --surface-color: #ffffff;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
  --border-radius: 12px;
  --border-radius-lg: 16px;
  /* ... and more */
}
```

### Custom Configuration

```javascript
app.use(BabaThingsPlugin, {
  apps: customAppsArray,      // Custom apps list
  showBranding: false,        // Hide default branding
  tagline: 'My Custom Tagline' // Custom tagline
});
```

### Dark Mode

Dark mode is automatically applied based on user's system preference. Override if needed:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #111827;
    --surface-color: #1f2937;
    --text-primary: #f9fafb;
  }
}
```

## 🌐 CDN / GitHub Pages Usage

### Using the CDN Build

For projects not using a build system:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://aem90.github.io/babathings-central-styling/dist/style.css">
</head>
<body>
  <div id="app">
    <!-- Your Vue app -->
  </div>
  
  <script src="https://unpkg.com/vue@3"></script>
  <script src="https://aem90.github.io/babathings-central-styling/dist/babathings-central-styling.umd.js"></script>
  <script>
    const { createApp } = Vue;
    const app = createApp({
      // Your app
    });
    app.use(BabaThingsCentralStyling.default);
    app.mount('#app');
  </script>
</body>
</html>
```

### Simple Link Tag Integration

Just want the styles? Add this to your HTML:

```html
<link rel="stylesheet" href="https://aem90.github.io/babathings-central-styling/dist/style.css">
```

## 📚 Examples

### Example 1: Vue 3 + Vite Project

```javascript
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import BabaThingsPlugin from '@babathings/central-styling';
import '@babathings/central-styling/style.css';

createApp(App)
  .use(BabaThingsPlugin)
  .mount('#app');
```

```vue
<!-- App.vue -->
<template>
  <BabaThingsNav />
  <router-view />
</template>
```

### Example 2: Custom Apps Configuration

```javascript
import BabaThingsPlugin from '@babathings/central-styling';

const myApps = [
  {
    id: 'app1',
    name: 'My First App',
    description: 'Does something cool',
    url: 'https://app1.example.com',
    icon: '🎨',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  // ... more apps
];

app.use(BabaThingsPlugin, {
  apps: myApps,
  tagline: 'My Awesome Apps'
});
```

### Example 3: Only Import Components (No Global Registration)

```vue
<template>
  <div>
    <BabaThingsNav :apps="apps" />
    <div class="grid">
      <BabaThingsAppCard 
        v-for="app in apps" 
        :key="app.id" 
        :app="app" 
      />
    </div>
  </div>
</template>

<script>
import { BabaThingsNav, BabaThingsAppCard, defaultApps } from '@babathings/central-styling';
import '@babathings/central-styling/style.css';

export default {
  components: {
    BabaThingsNav,
    BabaThingsAppCard
  },
  data() {
    return {
      apps: defaultApps
    };
  }
};
</script>
```

## 🏗️ Development

### Setup

```bash
# Clone the repository
git clone https://github.com/AEM90/babathings-central-styling.git
cd babathings-central-styling

# Install dependencies
npm install

# Run dev server with demo
npm run dev

# Build the library
npm run build
```

### Project Structure

```
babathings-central-styling/
├── src/
│   ├── components/
│   │   ├── BabaThingsNav.vue
│   │   └── BabaThingsAppCard.vue
│   ├── config/
│   │   └── apps.js
│   ├── styles/
│   │   └── babathings.css
│   └── index.js
├── demo/
│   ├── DemoApp.vue
│   └── main.js
├── dist/               # Built files (generated)
├── package.json
├── vite.config.js
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © BabaThings

## 🔗 Links

- [GitHub Repository](https://github.com/AEM90/babathings-central-styling)
- [npm Package](https://www.npmjs.com/package/@babathings/central-styling)
- [Demo](https://aem90.github.io/babathings-central-styling/)
- [BabaThings Main Site](https://babathings.com)

## 💬 Support

- 📧 Email: support@babathings.com
- 🐛 Issues: [GitHub Issues](https://github.com/AEM90/babathings-central-styling/issues)
- 💡 Feature Requests: [GitHub Discussions](https://github.com/AEM90/babathings-central-styling/discussions)

---

**Made with ❤️ by the BabaThings team**
