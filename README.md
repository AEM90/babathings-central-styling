# BabaThings - Productivity Mini-Apps

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)

> A modern single-page application featuring a collection of productivity mini-apps built with Vue 3, Vite, and cutting-edge web technologies.

## 🚀 Live Demo

**[Visit BabaThings](https://aem90.github.io/babathings-central-styling/)**

## 🎯 Featured Apps

- **🎡 Decision Wheel**: Spin the wheel to make tough decisions. Customizable options with smooth animations.
- **⏱️ AtomWatch**: Atomic precision clock with countdown timer mode. Perfect for events like New Year's Eve or sports matches.
- **💰 MoneyBurn**: Real-time meeting cost calculator. Track how much money meetings are costing your organization.
- **💱 Currency Watch**: Live currency exchange rates with conversion tools, historical data, and popular pairs.
- **🎵 Soundboard**: Agile meeting soundboard (coming soon)
- **💡 Brainstorm**: Collaborative idea board (coming soon)

## ✨ Features

- **🎨 Modern UI**: Futuristic design with glass-morphism effects and smooth animations
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **⚡ Lightning Fast**: Built with Vite for instant hot module replacement
- **🌙 Dark Mode**: Beautiful dark theme throughout all apps
- **🔧 Modular Architecture**: Each app is independently developed and lazy-loaded
- **♿ Accessible**: ARIA labels and semantic HTML for screen readers
- **🌐 Real-time Data**: Currency rates and time synchronization

## 💻 Development

### Prerequisites

- Node.js 16+ and npm/yarn
- Git

### Local Setup

```bash
# Clone the repository
git clone https://github.com/AEM90/babathings-central-styling.git
cd babathings-central-styling

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
babathings-central-styling/
├── src/
│   ├── components/          # Shared components
│   │   ├── BabaThingsNav.vue
│   │   ├── LandingPage.vue
│   │   └── ...
│   ├── views/
│   │   └── apps/           # Mini-app components
│   │       ├── DecisionWheelApp.vue
│   │       ├── AtomWatchApp.vue
│   │       ├── MoneyBurnApp.vue
│   │       ├── CurrencyWatchApp.vue
│   │       └── ...
│   ├── router/             # Vue Router configuration
│   ├── config/             # App configurations
│   └── styles/             # Global styles
├── docs/                   # Documentation
└── public/                 # Static assets
```

### Adding New Apps

See [HOW_TO_ADD_APPS.md](./HOW_TO_ADD_APPS.md) for detailed instructions on adding new mini-apps to the platform.

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vue Router 4** - Official router for Vue.js
- **Vite 5** - Next generation frontend tooling
- **Modern CSS** - Grid, Flexbox, Custom Properties, Animations
- **External APIs** - Exchange Rate API for currency data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

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
