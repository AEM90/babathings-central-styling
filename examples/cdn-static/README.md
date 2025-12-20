# CDN Static HTML Example

This example demonstrates how to use the BabaThings Central Styling plugin in a static HTML page without any build tools.

## Features

- ✅ No npm or build tools required
- ✅ Direct CDN loading
- ✅ Pure HTML, CSS, and JavaScript
- ✅ Vue 3 components via CDN
- ✅ Full BabaThings styling and navigation

## Files

- `index.html` - Complete example page

## Usage

1. **Copy the HTML file** to your project
2. **Open in browser** - That's it!

No installation, no build step, no npm needed.

## Key Points

### Loading the Plugin

```html
<!-- 1. Load CSS -->
<link rel="stylesheet" href="https://aem90.github.io/babathings-central-styling/dist/style.css">

<!-- 2. Load Vue 3 -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- 3. Load BabaThings Plugin -->
<script src="https://aem90.github.io/babathings-central-styling/dist/babathings-central-styling.umd.js"></script>
```

### Using Components

```html
<div id="app">
  <babathings-nav></babathings-nav>
  <!-- Your content -->
</div>
```

### Initializing Vue

```javascript
const { createApp } = Vue;
const BabaThingsPlugin = BabaThingsCentralStyling.default;

const app = createApp({
  // Your app options
});

app.use(BabaThingsPlugin);
app.mount('#app');
```

## Customization

### Custom Apps

```javascript
const customApps = [
  {
    id: 'my-app',
    name: 'My App',
    description: 'My cool app',
    url: 'https://my-app.babathings.com',
    icon: '🚀',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }
];

app.use(BabaThingsPlugin, {
  apps: customApps
});
```

### Custom Styling

```html
<style>
  :root {
    --primary-color: #ff6b6b;
    --secondary-color: #4ecdc4;
  }
</style>
```

## Testing Locally

Simply open `index.html` in your web browser. No server needed!

For a local server (optional):

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Deployment

Deploy the HTML file to any static hosting:
- GitHub Pages
- Netlify
- Vercel
- Any web server

## When to Use This Approach

✅ **Use CDN approach when:**
- Building a simple static site
- Prototyping quickly
- No build tools in your workflow
- Learning or testing

❌ **Use npm approach when:**
- Building a Vue application
- Need tree-shaking
- Using TypeScript
- Want best performance

## Need Help?

Check the main [README](../../README.md) for more information.
