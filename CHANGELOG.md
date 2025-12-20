# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-03

### Added

#### Core Features
- Vue 3 plugin architecture for easy integration
- NPM package distribution via `@babathings/central-styling`
- CDN distribution via GitHub Pages
- TypeScript type definitions for better developer experience

#### Components
- **BabaThingsNav**: SEO-optimized navigation component
  - Displays all BabaThings apps with proper semantic HTML
  - ARIA labels for accessibility
  - Active link highlighting
  - Vertical and horizontal layout options
  - Customizable branding and tagline
  - Responsive design
  
- **BabaThingsAppCard**: Reusable app card component
  - Interactive cards with hover effects
  - Status badges (new, beta, coming-soon)
  - Click event handling
  - Disabled state for coming-soon apps
  - Gradient icon backgrounds

#### Styling System
- Complete CSS system with custom properties (CSS variables)
- Dark mode support via `prefers-color-scheme`
- Responsive design for mobile, tablet, and desktop
- Smooth animations and transitions
- Utility classes for common spacing
- BEM-style naming convention for components

#### Configuration
- Default apps configuration included
- Easy customization via plugin options
- Support for custom app lists
- Configurable branding and tagline

#### Documentation
- Comprehensive README with quick start guide
- Detailed USAGE.md for integration instructions
- MIGRATION.md for upgrading from static template
- INTEGRATION.md (legacy documentation)
- Example projects:
  - Vue + Vite integration example
  - CDN static HTML example

#### Build & Distribution
- Vite-based build system
- ES modules and UMD builds
- Tree-shakeable exports
- CSS extraction
- GitHub Actions workflow for automatic deployment
- GitHub Pages hosting for CDN

#### Developer Experience
- Hot module reloading in development
- Demo application for testing
- TypeScript definitions
- Modern package.json with proper exports
- .npmignore for clean npm package

### Changed
- Transformed from static HTML/CSS/JS template to Vue plugin
- Renamed CSS classes with `babathings-` prefix for better namespacing
- Updated documentation structure

### Migration from Static Template
The static template (index.html, css/, js/) is still available but the new Vue plugin is the recommended approach for Vue projects. See MIGRATION.md for details.

### Repository Structure
```
babathings-central-styling/
├── src/                      # Source files
│   ├── components/          # Vue components
│   ├── config/              # Default configuration
│   ├── styles/              # CSS styles
│   └── index.js            # Plugin entry point
├── demo/                    # Demo application
├── examples/                # Example integrations
├── docs/                    # Documentation
├── dist/                    # Built files (generated)
└── ...configuration files
```

### Browser Support
- Modern browsers (ES2015+)
- Chrome 87+
- Firefox 78+
- Safari 14+
- Edge 88+

### Dependencies
- Peer dependency: Vue ^3.0.0
- Dev dependencies: Vite, @vitejs/plugin-vue

---

## Legacy Versions

Prior to v1.0.0, this project was a static HTML/CSS/JS template. Those files are preserved in the repository for backward compatibility:
- `index.html` - Static landing page
- `css/styles.css` - Legacy CSS
- `js/config.js` - Legacy app configuration
- `js/app.js` - Legacy JavaScript

These files still work but are no longer the primary distribution method.

---

**For the full list of changes and migration guide, see [MIGRATION.md](./docs/MIGRATION.md)**
