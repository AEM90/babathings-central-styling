# BabaThings Central Styling & Template

A central styling and template system for managing multiple subdomain applications under the babathings.com domain. This system presents all subdomains as app icons in a smartphone-style dashboard layout.

## 🎯 Purpose

This repository provides a unified landing page and styling system for all BabaThings subdomain applications, including:
- Decision Wheel
- AtomWatch
- MoneyBurn Counter
- Agile Soundboard
- And more...

## 🚀 Features

- **Smartphone-style App Grid**: Modern, responsive grid layout similar to mobile app launchers
- **Central Styling System**: Consistent design language across all apps
- **Easy Configuration**: Simple JSON-based configuration for adding new apps
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic dark mode based on user preference
- **Smooth Animations**: Elegant transitions and hover effects
- **Status Badges**: Show "New", "Beta", or "Coming Soon" badges on apps

## 📁 Project Structure

```
babathings-central-styling/
├── index.html              # Main landing page
├── css/
│   └── styles.css          # Central styling system
├── js/
│   ├── config.js           # App configuration
│   └── app.js              # Main application logic
├── assets/
│   └── favicon.svg         # Site favicon
├── docs/
│   ├── INTEGRATION.md      # How to integrate new subdomains
│   └── CUSTOMIZATION.md    # Customization guide
└── README.md               # This file
```

## 🎨 How It Works

### 1. Central Landing Page
The `index.html` file serves as the main dashboard that displays all available subdomain apps in a grid layout.

### 2. Configuration System
Apps are configured in `js/config.js`. Each app is defined as an object with the following properties:

```javascript
{
    id: 'app-name',              // Unique identifier
    name: 'Display Name',        // App title shown on card
    description: 'Description',   // Short description
    url: 'https://subdomain.babathings.com',  // App URL
    icon: '🎡',                  // Emoji icon
    color: 'linear-gradient(...)', // Icon background color
    status: 'new'                // Optional: 'new', 'beta', 'coming-soon'
}
```

### 3. Dynamic Rendering
The `js/app.js` file reads the configuration and dynamically generates app cards with:
- Icon with gradient background
- App name and description
- Hover effects and animations
- Status badges (if applicable)
- Links to subdomain URLs

## 📖 Adding a New Subdomain App

To add a new subdomain application:

1. **Create your subdomain project** (as a separate repository/project)

2. **Add configuration** to `js/config.js`:
   ```javascript
   {
       id: 'my-new-app',
       name: 'My New App',
       description: 'What this app does',
       url: 'https://my-new-app.babathings.com',
       icon: '🚀',
       color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
       status: 'new'  // optional
   }
   ```

3. **Deploy** - The app will automatically appear on the main dashboard!

That's it! No need to modify HTML or CSS.

## 🎨 Customization

### Theming
The CSS uses CSS custom properties (variables) for easy theming. Main theme colors are defined in `:root`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #10b981;
    --background-color: #f9fafb;
    /* ... more variables */
}
```

### App Icons
You can use:
- **Emojis**: Simple and effective (e.g., '🎡', '⏱️', '💰')
- **Icon Fonts**: Font Awesome, Material Icons, etc.
- **SVG**: For custom icons

### Colors
Use gradient generators like [CSS Gradient](https://cssgradient.io/) to create beautiful gradients for app icons.

## 🌐 Deployment

### Option 1: Static Hosting
Deploy to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

### Option 2: Web Server
Host on any web server (Apache, Nginx, etc.)

### DNS Configuration
Point your main domain to this central styling page:
```
babathings.com → [hosting service]
```

Each subdomain should point to its respective application:
```
decision-wheel.babathings.com → [decision wheel app]
atomwatch.babathings.com → [atomwatch app]
etc.
```

## 🔧 Development

### Local Development
Simply open `index.html` in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### No Build Step Required
This is a pure HTML/CSS/JS project with no build process needed!

## 📱 Responsive Design

The grid automatically adjusts for different screen sizes:
- **Desktop**: 6-8 apps per row
- **Tablet**: 4-5 apps per row
- **Mobile**: 2-3 apps per row

## 🌙 Dark Mode

Dark mode is automatically applied based on the user's system preference using the `prefers-color-scheme` media query.

## 🔒 Security

- All external links use `rel="noopener noreferrer"`
- No external dependencies (no CDN risks)
- No tracking or analytics by default (can be added if needed)

## 📊 Analytics (Optional)

The `trackAppClick()` function in `app.js` is a placeholder for analytics. You can integrate:
- Google Analytics
- Plausible
- Fathom
- Or any other analytics service

## 🤝 Contributing

To contribute a new app to the BabaThings ecosystem:
1. Create your subdomain app as a separate project
2. Follow the integration guide in `docs/INTEGRATION.md`
3. Submit a PR with your app configuration

## 📄 License

This template is open source and available for use in the BabaThings project ecosystem.

## 🎯 Roadmap

- [ ] Search/filter functionality for apps
- [ ] Categories/tags for apps
- [ ] User preferences/favorites
- [ ] App usage statistics
- [ ] Custom themes
- [ ] Keyboard shortcuts
- [ ] Accessibility improvements

## 💡 App Ideas

Future subdomain apps could include:
- Team randomizer
- Estimation poker
- Icebreaker generator
- Meeting agenda creator
- Habit tracker
- Sprint planner
- Time zone converter
- ... and more!

---

**Made with ❤️ for productivity and fun**
