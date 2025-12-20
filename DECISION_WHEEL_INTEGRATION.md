# Decision Wheel Integration Guide

## Quick Integration for Plain HTML/JS Projects

Since your Decision Wheel is a plain HTML/JS project, here's how to integrate the BabaThings styling via CDN (no local files needed!):

### Integration Steps

1. **In your Decision Wheel HTML file, add these to the `<head>`:**
   ```html
   <!-- BabaThings Central Styling from GitHub Pages CDN -->
   <link rel="stylesheet" href="https://aem90.github.io/babathings-central-styling/style.css">
   ```

2. **Before your closing `</body>` tag, add:**
   ```html
   <!-- Load Vue 3 from CDN -->
   <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
   
   <!-- Load BabaThings Plugin from GitHub Pages CDN -->
   <script src="https://aem90.github.io/babathings-central-styling/babathings-central-styling.umd.js"></script>
   
   <!-- Initialize -->
   <script>
     const { createApp } = Vue;
     const BabaThingsPlugin = BabaThingsCentralStyling.default;

     const app = createApp({
       data() {
         return {
           // Your existing data
         };
       }
     });

     app.use(BabaThingsPlugin);
     app.mount('#app');
   </script>
   ```

3. **Add the navigation component in your HTML:**
   ```html
   <div id="app">
     <babathings-nav></babathings-nav>
     
     <main>
       <!-- Your Decision Wheel content -->
     </main>
   </div>
   ```

### What You Get

✅ **Automatic Navigation** - Links to all your BabaThings apps  
✅ **Consistent Styling** - Same look and feel across all apps  
✅ **Responsive Design** - Works on mobile, tablet, desktop  
✅ **Dark Mode** - Automatic based on system preference  
✅ **No Build Step** - Just HTML files, no compilation needed

### Customization

If you want to customize which apps appear in the nav:

```javascript
const app = createApp({ /*...*/ });

app.use(BabaThingsPlugin, {
  apps: [
    {
      id: 'decision-wheel',
      name: 'Decision Wheel',
      description: 'Spin the wheel to make decisions',
      url: '/decision-wheel',
      icon: '🎡',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    // Add your other apps
  ]
});
```

### Next Steps

1. Copy the `INTEGRATION_TEMPLATE.html` structure to your Decision Wheel
2. Paste your existing Decision Wheel HTML/CSS/JS into the template
3. Test it by opening the HTML file in a browser
4. Repeat for your other apps (AtomWatch, MoneyBurn, etc.)

### Need Help?

If you run into issues:
- Check browser console for errors
- Make sure paths are correct (../ for relative paths)
- Ensure the central styling is built (`npm run build`)
- Verify Vue is loading (check Network tab in DevTools)
