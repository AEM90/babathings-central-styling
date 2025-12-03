# Customization Guide

This guide shows you how to customize the BabaThings central styling template to match your preferences.

## Table of Contents
- [Color Scheme](#color-scheme)
- [Typography](#typography)
- [Layout & Spacing](#layout--spacing)
- [Animations](#animations)
- [Dark Mode](#dark-mode)
- [Custom Components](#custom-components)

## Color Scheme

### Changing Theme Colors

All theme colors are defined as CSS custom properties in `css/styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --primary-dark: #4f46e5;       /* Darker variant */
    --primary-light: #818cf8;      /* Lighter variant */
    --secondary-color: #10b981;    /* Accent color */
    --background-color: #f9fafb;   /* Page background */
    --surface-color: #ffffff;      /* Card background */
    --text-primary: #1f2937;       /* Main text */
    --text-secondary: #6b7280;     /* Secondary text */
    --border-color: #e5e7eb;       /* Borders */
}
```

**To customize**, simply change these values:

```css
:root {
    --primary-color: #8b5cf6;      /* Change to purple */
    --secondary-color: #f59e0b;    /* Change to orange */
}
```

### Brand Color Examples

**Blue Theme** (Default):
```css
--primary-color: #6366f1;
--secondary-color: #10b981;
```

**Purple Theme**:
```css
--primary-color: #8b5cf6;
--secondary-color: #ec4899;
```

**Green Theme**:
```css
--primary-color: #10b981;
--secondary-color: #14b8a6;
```

**Orange Theme**:
```css
--primary-color: #f59e0b;
--secondary-color: #ef4444;
```

### Logo Gradient

The logo uses a gradient from primary to secondary color. To customize:

```css
.logo h1 {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

Or use a custom gradient:
```css
.logo h1 {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## Typography

### Changing Fonts

**System Font Stack** (Default):
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
             'Helvetica Neue', Arial, sans-serif;
```

**Custom Web Fonts**:

1. Add Google Fonts to `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
```

2. Update CSS:
```css
body {
    font-family: 'Inter', sans-serif;
}
```

### Font Sizes

**Logo**:
```css
.logo h1 {
    font-size: 3rem;      /* Default */
    font-size: 4rem;      /* Larger */
    font-size: 2.5rem;    /* Smaller */
}
```

**App Cards**:
```css
.app-title {
    font-size: 1rem;      /* Default */
}

.app-description {
    font-size: 0.875rem;  /* Default */
}
```

## Layout & Spacing

### Grid Configuration

**Adjust app card size**:
```css
.apps-grid {
    /* Default: min 160px, auto-fill */
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    
    /* Larger cards */
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    
    /* Smaller cards */
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
}
```

**Fixed columns**:
```css
.apps-grid {
    /* Always 4 columns */
    grid-template-columns: repeat(4, 1fr);
    
    /* Always 6 columns */
    grid-template-columns: repeat(6, 1fr);
}
```

**Spacing between cards**:
```css
.apps-grid {
    gap: 2rem;      /* Default */
    gap: 1rem;      /* Tighter */
    gap: 3rem;      /* Looser */
}
```

### Container Width

```css
.container {
    max-width: 1400px;    /* Default */
    max-width: 1200px;    /* Narrower */
    max-width: 1600px;    /* Wider */
    max-width: 100%;      /* Full width */
}
```

### Card Height

```css
.app-card {
    min-height: 180px;    /* Default */
    min-height: 200px;    /* Taller */
    min-height: 160px;    /* Shorter */
    height: 200px;        /* Fixed height */
}
```

## Animations

### Hover Effects

**Disable lift effect**:
```css
.app-card:hover {
    transform: none;      /* No lift */
    transform: translateY(-4px);  /* Subtle lift */
    transform: translateY(-12px); /* Stronger lift */
}
```

**Change transition speed**:
```css
:root {
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);  /* Default */
    --transition: all 0.2s ease;                          /* Faster */
    --transition: all 0.5s ease-out;                      /* Slower */
}
```

### Icon Animation

**Add rotation on hover**:
```css
.app-card:hover .app-icon {
    transform: scale(1.1) rotate(5deg);
}
```

**Add bounce effect**:
```css
.app-card:hover .app-icon {
    animation: bounce 0.5s ease;
}

@keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}
```

### Page Load Animation

**Disable stagger effect**:
```css
.app-card:nth-child(1),
.app-card:nth-child(2),
/* ... etc */
.app-card:nth-child(8) {
    animation-delay: 0s;  /* All appear at once */
}
```

**Faster stagger**:
```css
.app-card:nth-child(1) { animation-delay: 0.02s; }
.app-card:nth-child(2) { animation-delay: 0.04s; }
/* etc */
```

## Dark Mode

### Customize Dark Mode Colors

```css
@media (prefers-color-scheme: dark) {
    :root {
        --background-color: #111827;   /* Dark background */
        --surface-color: #1f2937;      /* Card background */
        --text-primary: #f9fafb;       /* Light text */
        --text-secondary: #9ca3af;     /* Muted text */
        --border-color: #374151;       /* Borders */
    }
}
```

### Force Light or Dark Mode

**Always light mode**:
```css
/* Remove the @media (prefers-color-scheme: dark) block */
```

**Always dark mode**:
```css
:root {
    /* Move dark mode colors to :root */
    --background-color: #111827;
    --surface-color: #1f2937;
    /* etc */
}
```

### Manual Dark Mode Toggle

Add a toggle button in `index.html`:
```html
<button id="themeToggle">🌙</button>
```

Add JavaScript in `app.js`:
```javascript
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
```

Add CSS:
```css
body.dark-mode {
    --background-color: #111827;
    --surface-color: #1f2937;
    /* etc */
}
```

## Custom Components

### Add a Search Bar

**HTML** (add to `index.html` before `.apps-grid`):
```html
<div class="search-container">
    <input type="text" id="searchInput" placeholder="Search apps..." class="search-input">
</div>
```

**CSS** (add to `styles.css`):
```css
.search-container {
    margin-bottom: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}

.search-input {
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: 1rem;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--surface-color);
    color: var(--text-primary);
}
```

**JavaScript** (add to `app.js`):
```javascript
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    BabaThings.filterApps(e.target.value);
});
```

### Add Categories

**Update `config.js`**:
```javascript
{
    id: 'decision-wheel',
    name: 'Decision Wheel',
    category: 'productivity',  // Add category
    // ... rest of config
}
```

**Add category filter in HTML**:
```html
<div class="category-filters">
    <button data-category="all">All</button>
    <button data-category="productivity">Productivity</button>
    <button data-category="fun">Fun</button>
</div>
```

**Add filter logic in JavaScript**:
```javascript
document.querySelectorAll('[data-category]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        filterByCategory(category);
    });
});
```

### Add Footer Links

```html
<footer class="footer">
    <nav class="footer-nav">
        <a href="/about">About</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/contact">Contact</a>
    </nav>
    <p>&copy; 2025 BabaThings.com - All rights reserved</p>
</footer>
```

```css
.footer-nav {
    margin-bottom: 1rem;
}

.footer-nav a {
    margin: 0 1rem;
    color: var(--text-secondary);
    text-decoration: none;
}

.footer-nav a:hover {
    color: var(--primary-color);
}
```

## Shadows & Depth

### Customize Shadow Levels

```css
:root {
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

**Softer shadows**:
```css
--shadow-md: 0 2px 4px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 10px 15px rgba(0, 0, 0, 0.05);
```

**Stronger shadows**:
```css
--shadow-md: 0 8px 16px rgba(0, 0, 0, 0.15);
--shadow-xl: 0 25px 50px rgba(0, 0, 0, 0.15);
```

## Border Radius

### Customize Roundness

```css
:root {
    --border-radius: 12px;       /* Default */
    --border-radius-lg: 16px;
}

/* Rounded (more curved) */
:root {
    --border-radius: 16px;
    --border-radius-lg: 24px;
}

/* Sharp (less curved) */
:root {
    --border-radius: 8px;
    --border-radius-lg: 12px;
}

/* Square (no curves) */
:root {
    --border-radius: 0px;
    --border-radius-lg: 0px;
}
```

## Status Badges

### Customize Badge Colors

```css
.app-status.new {
    background-color: #d1fae5;   /* Green background */
    color: #065f46;              /* Green text */
}

.app-status.beta {
    background-color: #dbeafe;   /* Blue background */
    color: #1e40af;              /* Blue text */
}

.app-status.coming-soon {
    background-color: #fef3c7;   /* Yellow background */
    color: #92400e;              /* Yellow text */
}
```

### Add Custom Badge Types

In `config.js`:
```javascript
status: 'featured'  // Custom status
```

In `styles.css`:
```css
.app-status.featured {
    background-color: #fce7f3;
    color: #9f1239;
}
```

In `app.js`:
```javascript
const statusMap = {
    'new': 'New',
    'beta': 'Beta',
    'coming-soon': 'Coming Soon',
    'featured': '⭐ Featured'  // Add custom
};
```

## Mobile Optimization

### Adjust Mobile Layout

```css
@media (max-width: 480px) {
    .container {
        padding: 0.5rem;     /* Less padding on mobile */
    }
    
    .apps-grid {
        gap: 0.75rem;        /* Tighter spacing */
    }
    
    .app-card {
        min-height: 140px;   /* Shorter cards */
        padding: 1rem;       /* Less padding */
    }
    
    .app-icon {
        width: 60px;         /* Smaller icons */
        height: 60px;
        font-size: 2rem;
    }
}
```

## Tips for Customization

1. **Make incremental changes**: Test each change before moving to the next
2. **Use browser DevTools**: Experiment with styles live before committing
3. **Test responsive**: Always check mobile, tablet, and desktop views
4. **Validate CSS**: Ensure no syntax errors
5. **Consider accessibility**: Maintain good color contrast
6. **Version control**: Commit changes so you can revert if needed

## Getting Help

If you need assistance with customization:
- Check browser console for errors
- Use DevTools to inspect elements
- Refer to CSS documentation at [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS)
- Open an issue on GitHub

---

**Happy customizing! Make BabaThings your own! 🎨**
