# Contributing to BabaThings Central Styling

Thank you for your interest in contributing to the BabaThings Central Styling plugin! This document provides guidelines for contributing to the project.

## 🎯 Ways to Contribute

- **Report bugs** via GitHub Issues
- **Suggest features** via GitHub Discussions
- **Submit pull requests** for bug fixes or new features
- **Improve documentation**
- **Share feedback** on design and usability
- **Add new BabaThings apps** to the default configuration

## 📋 Before You Start

1. Check existing issues and PRs to avoid duplicates
2. For major changes, open an issue first to discuss
3. Ensure you have Node.js 18+ installed
4. Familiarize yourself with Vue 3 and Vite

## 🚀 Development Setup

### 1. Fork and Clone

```bash
git clone https://github.com/YOUR_USERNAME/babathings-central-styling.git
cd babathings-central-styling
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

This starts Vite dev server at http://localhost:5173 with hot module reloading.

### 4. Make Your Changes

- **Components**: Edit files in `src/components/`
- **Styles**: Edit `src/styles/babathings.css`
- **Configuration**: Edit `src/config/apps.js`
- **Plugin**: Edit `src/index.js`

### 5. Test Your Changes

```bash
# Build the library
npm run build

# Preview the build
npm run preview
```

### 6. Commit Your Changes

Follow conventional commit format:

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "docs: update README"
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 📝 Pull Request Process

1. **Create a branch** for your feature/fix
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** with clear, focused commits

3. **Test thoroughly**:
   - Run `npm run build` successfully
   - Test in the demo app
   - Check responsive design
   - Test in light and dark mode

4. **Update documentation** if needed:
   - Update README.md for user-facing changes
   - Update USAGE.md for new features
   - Add JSDoc comments to new functions

5. **Submit PR**:
   - Provide clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes
   - Wait for review

## 🎨 Code Style Guidelines

### JavaScript/Vue

- Use modern ES6+ syntax
- Use Vue 3 Composition API or Options API consistently
- Add JSDoc comments for complex functions
- Keep components small and focused
- Use descriptive variable names

```javascript
// Good
const handleAppClick = (app) => {
  console.log('Clicked:', app.name);
};

// Avoid
const hac = (a) => console.log(a);
```

### CSS

- Use CSS custom properties (variables)
- Follow BEM naming convention for components
- Prefix component classes with `babathings-`
- Keep selectors specific but not overly nested
- Use meaningful class names

```css
/* Good */
.babathings-app-card__title {
  font-size: 1rem;
}

/* Avoid */
.card div span {
  font-size: 1rem;
}
```

### Vue Components

```vue
<template>
  <!-- Use semantic HTML -->
  <!-- Include proper ARIA attributes -->
  <!-- Keep templates readable -->
</template>

<script>
// Clear component definition
export default {
  name: 'ComponentName',
  props: {
    // Always document props
  },
  // ... 
};
</script>

<style scoped>
/* Component-specific styles */
/* Use CSS variables for consistency */
</style>
```

## 🧪 Testing

Currently, there are no automated tests. When testing:

1. **Visual Testing**:
   - Check component appearance
   - Test responsive breakpoints
   - Verify dark mode styling

2. **Functional Testing**:
   - Click all interactive elements
   - Test navigation links
   - Verify event emissions

3. **Browser Testing**:
   - Chrome, Firefox, Safari
   - Mobile browsers

## 📚 Documentation Standards

- Use clear, concise language
- Include code examples
- Add comments for complex logic
- Keep README up-to-date
- Update CHANGELOG for notable changes

## 🐛 Bug Reports

Include:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and version
- Vue version

## 💡 Feature Requests

Include:
- Clear description of the feature
- Use case and motivation
- Proposed API/interface
- Any alternative solutions considered

## 🔄 Adding New BabaThings Apps

To add a new app to the default configuration:

1. Add to `src/config/apps.js`:
   ```javascript
   {
     id: 'new-app',
     name: 'New App',
     description: 'What it does',
     url: 'https://new-app.babathings.com',
     icon: '🎯',
     color: 'linear-gradient(...)',
     status: 'new' // or 'beta', 'coming-soon'
   }
   ```

2. Ensure the app is deployed and URL is accessible
3. Submit PR with just the config change

## 📦 Release Process

(For maintainers)

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Build: `npm run build`
4. Test build
5. Commit: `git commit -m "chore: release v1.x.x"`
6. Tag: `git tag v1.x.x`
7. Push: `git push && git push --tags`
8. Publish: `npm publish`

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards others

## ❓ Questions?

- Open a GitHub Discussion
- Check existing documentation
- Ask in pull request comments

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to BabaThings! 🎉**
