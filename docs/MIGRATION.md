# Migration Guide: From Static Template to Vue Plugin

This guide helps you migrate from the old static HTML/CSS/JS template to the new Vue.js plugin architecture.

## What Changed?

### Before (Static Template)
- Plain HTML, CSS, and JavaScript files
- Manual script tag loading
- Apps configured in `js/config.js`
- Direct DOM manipulation in `js/app.js`

### After (Vue Plugin)
- Vue 3 plugin with components
- npm package distribution
- CDN available for static sites
- Reusable Vue components
- Better TypeScript support
- Tree-shakeable imports

## Migration Paths

### Path 1: Keep Your Static Site (No Migration Needed)

If you want to keep using the static approach, the old files still work:
- `index.html` → Still functional
- `css/styles.css` → Still functional  
- `js/config.js` and `js/app.js` → Still functional

**You don't need to migrate if you're happy with the static approach.**

### Path 2: Migrate to Vue Plugin (Recommended for Vue Projects)

If your subdomain projects use Vue 3, you should migrate to use the plugin.

#### Step 1: Install the Plugin

```bash
npm install @babathings/central-styling
```

#### Step 2: Update Your main.js

**Before:**
```javascript
// No central styling integration
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

**After:**
```javascript
import { createApp } from 'vue';
import App from './App.vue';
import BabaThingsPlugin from '@babathings/central-styling';
import '@babathings/central-styling/style.css';

const app = createApp(App);
app.use(BabaThingsPlugin);
app.mount('#app');
```

#### Step 3: Add Navigation to Your App

**In your App.vue or Layout component:**

```vue
<template>
  <div>
    <BabaThingsNav />
    <router-view />
  </div>
</template>
```

#### Step 4: Remove Old Integration (If Any)

If you were manually including styles:

**Before:**
```html
<link rel="stylesheet" href="https://babathings.com/css/styles.css">
```

**After:**
```javascript
// Already included via plugin
import '@babathings/central-styling/style.css';
```

### Path 3: Use CDN for Static Sites

If you have a static site but want the new components:

**Add to your HTML:**

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://aem90.github.io/babathings-central-styling/dist/style.css">
</head>
<body>
  <div id="app">
    <babathings-nav></babathings-nav>
    <!-- Your content -->
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

## Component Migration

### Old: App Cards (JavaScript)

**Before:**
```javascript
// In js/config.js
const appsConfig = [
  {
    id: 'my-app',
    name: 'My App',
    // ...
  }
];

// In js/app.js
function renderApps() {
  appsConfig.forEach(app => {
    const card = createAppCard(app);
    appsGrid.appendChild(card);
  });
}
```

**After (Vue Component):**
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
```

## Configuration Migration

### Old Configuration

**Before (`js/config.js`):**
```javascript
const appsConfig = [
  {
    id: 'decision-wheel',
    name: 'Decision Wheel',
    description: 'Spin the wheel',
    url: 'https://decision-wheel.babathings.com',
    icon: '🎡',
    color: 'linear-gradient(...)',
    status: 'new'
  }
];
```

### New Configuration

**After (Plugin options):**
```javascript
// main.js
import { createApp } from 'vue';
import BabaThingsPlugin from '@babathings/central-styling';

const customApps = [
  {
    id: 'decision-wheel',
    name: 'Decision Wheel',
    description: 'Spin the wheel',
    url: 'https://decision-wheel.babathings.com',
    icon: '🎡',
    color: 'linear-gradient(...)',
    status: 'new'
  }
];

const app = createApp(App);
app.use(BabaThingsPlugin, {
  apps: customApps  // Or use defaultApps
});
```

## CSS Migration

### CSS Variables (No Change Needed)

The CSS variables remain the same:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #10b981;
  /* ... same variables */
}
```

Your existing CSS customizations will still work!

### Class Names (Updated)

Some class names changed to be more component-specific:

**Before:**
```css
.app-card { }
.app-icon { }
.app-title { }
```

**After:**
```css
.babathings-app-card { }
.babathings-app-card__icon { }
.babathings-app-card__title { }
```

If you have custom CSS targeting these classes, update them.

## Breaking Changes

### 1. Class Name Prefixes

All CSS classes now have the `babathings-` prefix to avoid conflicts.

**Migration:** Update your custom CSS selectors.

### 2. Global Functions Removed

The old `BabaThings.filterApps()` etc. are no longer available.

**Migration:** Use Vue component props and methods instead.

### 3. Direct DOM Manipulation

The old approach used `document.getElementById('appsGrid')`.

**Migration:** Use Vue components and data binding.

## Testing Your Migration

### Checklist

- [ ] Install the plugin via npm or load from CDN
- [ ] Import and use the plugin in your app
- [ ] Import the CSS stylesheet
- [ ] Add `<BabaThingsNav />` to your layout
- [ ] Test on desktop, tablet, and mobile
- [ ] Test in light and dark mode
- [ ] Verify all links work
- [ ] Check that custom styling still applies

### Common Issues

#### Components Don't Render
**Problem:** Components appear as undefined or don't render.

**Solution:** Make sure you've called `app.use(BabaThingsPlugin)`.

#### Styles Don't Apply
**Problem:** Components render but are unstyled.

**Solution:** Import the CSS: `import '@babathings/central-styling/style.css'`

#### Old Styles Conflict
**Problem:** Your old styles conflict with new ones.

**Solution:** 
1. Remove old `styles.css` import
2. Use CSS variables to customize instead
3. Update class selectors to new naming

## Rollback Plan

If you need to rollback:

1. Keep the old files (`index.html`, `css/`, `js/`) in your repo
2. Don't delete them until migration is stable
3. You can always switch back to the static approach

## Support

Need help with migration?
- Open an issue: https://github.com/AEM90/babathings-central-styling/issues
- Email: support@babathings.com
- Check the [Usage Guide](./USAGE.md)

## FAQ

### Do I have to migrate?
No, the old static approach still works fine.

### Can I use both?
It's not recommended, but technically possible. Choose one approach.

### Will my custom styling break?
Most CSS customizations will work, but you may need to update class selectors.

### Can I still use the old config.js?
Yes, but import it into your Vue app and pass to the plugin.

### What if I don't use Vue?
Use the CDN approach or stick with the static template.

---

**Questions? Open an issue on GitHub!**
