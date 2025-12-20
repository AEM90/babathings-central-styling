# 🚀 Quick Start - Add BabaThings to Your HTML Project

## Copy-Paste Integration (3 Steps)

### Step 1: Add CSS to `<head>`
```html
<link rel="stylesheet" href="https://aem90.github.io/babathings-central-styling/style.css">
```

### Step 2: Wrap your content
```html
<div id="app">
  <babathings-nav></babathings-nav>
  
  <main>
    <!-- Your existing content here -->
  </main>
</div>
```

### Step 3: Add scripts before `</body>`
```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://aem90.github.io/babathings-central-styling/babathings-central-styling.umd.js"></script>
<script>
  const { createApp } = Vue;
  const app = createApp({});
  app.use(BabaThingsCentralStyling.default);
  app.mount('#app');
</script>
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Decision Wheel - BabaThings</title>
  
  <!-- BabaThings Styling -->
  <link rel="stylesheet" href="https://aem90.github.io/babathings-central-styling/style.css">
</head>
<body>
  <div id="app">
    <!-- Navigation with links to all your apps -->
    <babathings-nav></babathings-nav>
    
    <!-- Your app content -->
    <main style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
      <h1>Decision Wheel</h1>
      <p>Your existing content goes here...</p>
    </main>
  </div>

  <!-- Required Scripts -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://aem90.github.io/babathings-central-styling/babathings-central-styling.umd.js"></script>
  <script>
    const { createApp } = Vue;
    const app = createApp({
      data() {
        return {
          // Your app data
        };
      },
      methods: {
        // Your app methods
      }
    });
    app.use(BabaThingsCentralStyling.default);
    app.mount('#app');
  </script>
</body>
</html>
```

## Next Steps

1. **Wait 2-3 minutes** for GitHub Actions to deploy (check: https://github.com/AEM90/babathings-central-styling/actions)
2. **Test the URLs** by visiting: https://aem90.github.io/babathings-central-styling/
3. **Add to your Decision Wheel** using the code above
4. **Repeat** for your other apps (AtomWatch, MoneyBurn, etc.)

## What You Get

✅ Professional navigation bar with links to all your apps  
✅ Consistent styling across all projects  
✅ Responsive design (mobile, tablet, desktop)  
✅ Dark mode support  
✅ No build step - just HTML files  
✅ Updates automatically when you update central styling

## Troubleshooting

**If it doesn't work:**
1. Check if GitHub Pages is live: https://aem90.github.io/babathings-central-styling/
2. Open browser DevTools Console for errors
3. Make sure all 3 scripts are loading (check Network tab)
4. Ensure you have `<div id="app">` wrapping your content
