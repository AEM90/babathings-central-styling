# Integration Guide

This guide explains how to integrate new subdomain applications into the BabaThings central dashboard.

## Quick Start

Adding a new app takes just 3 steps:

1. **Build your subdomain app** as a standalone project
2. **Add it to the configuration** in `js/config.js`
3. **Deploy** and it automatically appears on the dashboard!

## Detailed Integration Steps

### Step 1: Create Your Subdomain Application

Your subdomain app can be built with any technology:
- Plain HTML/CSS/JS
- React, Vue, Angular, Svelte
- Python Flask, Django
- Node.js Express
- Ruby on Rails
- Any other framework or technology

**Key Requirements:**
- Must be deployable as a standalone application
- Should have its own repository/project
- Must be accessible via a URL

### Step 2: Configure the App

Open `js/config.js` and add your app to the `appsConfig` array:

```javascript
{
    id: 'your-app-name',           // Unique ID (lowercase, hyphenated)
    name: 'Your App Name',         // Display name (shown on card)
    description: 'Brief description', // What does it do? (1-2 sentences)
    url: 'https://your-app.babathings.com', // Full URL to your app
    icon: '🚀',                    // Emoji or icon
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Icon bg
    status: null                   // Optional: 'new', 'beta', 'coming-soon'
}
```

#### Configuration Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (lowercase, no spaces) |
| `name` | string | Yes | Display name shown on the card |
| `description` | string | Yes | Short description (1-2 sentences) |
| `url` | string | Yes | Full URL to your application |
| `icon` | string | Yes | Emoji or icon character |
| `color` | string | Yes | CSS gradient or color for icon background |
| `status` | string | No | Badge: 'new', 'beta', or 'coming-soon' |

### Step 3: Choose an Icon

**Option A: Use Emojis (Recommended)**
```javascript
icon: '🎡'  // Simple and effective
```

Popular emoji choices:
- 🎡 Decision/Wheel
- ⏱️ Timer/Watch
- 💰 Money/Finance
- 🎵 Sound/Music
- 💡 Ideas/Brainstorm
- 🍅 Pomodoro
- 📋 Lists/Notes
- ⏰ Alarms/Reminders
- 🎯 Goals/Targets
- 📊 Charts/Analytics

**Option B: Use Icon Fonts**
If you prefer icon fonts, include them in your project and reference them:
```javascript
icon: '<i class="fas fa-rocket"></i>'
```

### Step 4: Select a Color Gradient

Use a gradient generator to create beautiful backgrounds:
- [CSS Gradient](https://cssgradient.io/)
- [uiGradients](https://uigradients.com/)
- [WebGradients](https://webgradients.com/)

Example gradients:
```javascript
// Purple to pink
color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

// Blue to cyan
color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'

// Orange to red
color: 'linear-gradient(135deg, #ff9a56 0%, #ff6a00 100%)'

// Green to teal
color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
```

Or use solid colors:
```javascript
color: '#6366f1'  // Solid indigo
```

### Step 5: Set Status Badge (Optional)

If your app is new or in development, add a status badge:

```javascript
status: 'new'          // Green "New" badge
status: 'beta'         // Blue "Beta" badge
status: 'coming-soon'  // Yellow "Coming Soon" badge
status: null           // No badge
```

### Step 6: Deploy Your Changes

After adding your configuration:

1. **Test locally**: Open `index.html` in a browser
2. **Commit changes**: Commit your config changes
3. **Deploy**: Push to your hosting service
4. **Verify**: Check that your app appears on the dashboard

## Complete Example

Here's a complete example for a "Decision Wheel" app:

```javascript
{
    id: 'decision-wheel',
    name: 'Decision Wheel',
    description: 'Spin the wheel to make decisions and choose random options',
    url: 'https://decision-wheel.babathings.com',
    icon: '🎡',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    status: 'new'
}
```

## Best Practices

### Naming
- **ID**: Use lowercase, hyphenated names (e.g., `decision-wheel`, `money-burn`)
- **Name**: Use title case (e.g., "Decision Wheel", "Money Burn")
- **Description**: Keep it concise (under 60 characters is ideal)

### URLs
- Use HTTPS for security
- Follow the pattern: `https://[app-name].babathings.com`
- Ensure the URL is accessible before adding to config
- Use full URLs, not relative paths

### Icons
- Use emojis for simplicity and cross-platform compatibility
- Choose icons that clearly represent your app's purpose
- Test on different devices to ensure the emoji displays correctly

### Colors
- Use gradients for a modern look
- Ensure good contrast with white text/icons
- Be consistent with the overall BabaThings design language
- Test in both light and dark modes

### Status Badges
- Use 'new' for recently launched apps (remove after ~2 weeks)
- Use 'beta' for apps in testing/development
- Use 'coming-soon' for apps not yet available
- Remove status when the app is stable and established

## Testing Your Integration

Before deploying:

1. **Visual Check**: Does the card look good?
2. **Link Test**: Does clicking open the correct URL?
3. **Responsive Test**: Does it work on mobile?
4. **Dark Mode Test**: Does it look good in dark mode?
5. **Animation Test**: Do the hover effects work?

## Subdomain Deployment

Each subdomain app should be deployed separately:

### DNS Configuration
Set up a CNAME or A record for your subdomain:
```
decision-wheel.babathings.com → [your hosting IP/domain]
```

### Hosting Options
- **Vercel**: Great for modern web apps
- **Netlify**: Excellent for static sites
- **GitHub Pages**: Free for public repos
- **Cloudflare Pages**: Fast and free
- **Traditional hosting**: VPS, shared hosting, etc.

### SSL Certificates
Ensure your subdomain uses HTTPS:
- Most modern hosts provide free SSL (Let's Encrypt)
- Cloudflare offers SSL even on free tier
- GitHub Pages includes SSL automatically

## Troubleshooting

### App doesn't appear
- Check JavaScript console for errors
- Verify `config.js` syntax (no missing commas, brackets)
- Ensure the config is loaded before `app.js`

### Link doesn't work
- Verify the URL is correct and accessible
- Check for HTTPS vs HTTP issues
- Ensure CORS is configured if needed

### Icon doesn't display
- Try a different emoji
- Verify the character encoding is UTF-8
- Test on different browsers/devices

### Color looks wrong
- Check gradient syntax
- Test in light and dark modes
- Verify CSS is properly formatted

## Advanced Integration

### Custom Metadata
You can extend the app config with custom properties:

```javascript
{
    id: 'my-app',
    name: 'My App',
    // ... standard properties ...
    category: 'productivity',  // Custom property
    featured: true,            // Custom property
    author: 'Your Name'        // Custom property
}
```

Then modify `app.js` to use these properties.

### Dynamic Apps
For apps loaded from an API:

```javascript
// In app.js, add after appsConfig
async function loadDynamicApps() {
    const response = await fetch('/api/apps');
    const dynamicApps = await response.json();
    appsConfig.push(...dynamicApps);
    renderApps();
}
```

### Analytics Integration
Track when users click your app:

```javascript
// In app.js trackAppClick function
function trackAppClick(appId) {
    // Google Analytics
    gtag('event', 'app_click', { app_id: appId });
    
    // Or Plausible
    plausible('App Click', { props: { app: appId } });
}
```

## Support

If you need help integrating your app:
1. Check this documentation
2. Review example apps in `config.js`
3. Open an issue on GitHub
4. Contact the BabaThings team

---

**Ready to add your app? Start editing `js/config.js` now!**
