# How to Add a New App

This guide shows you how to easily add a new mini-app to the BabaThings platform.

## Quick Steps (5 minutes)

### 1. Create Your App Component

Create a new file in `src/views/apps/YourAppName.vue`:

```vue
<template>
  <div class="app-container your-app">
    <div class="app-header">
      <h1 class="app-title">
        <span class="app-icon">🎯</span>
        Your App Name
      </h1>
      <p class="app-description">Brief description of your app</p>
    </div>

    <div class="app-content">
      <!-- Your app implementation goes here -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'YourApp',
  data() {
    return {
      // Your app data
    };
  },
  methods: {
    // Your app methods
  }
};
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.app-header {
  text-align: center;
  margin-bottom: 3rem;
}

.app-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.app-icon {
  font-size: 3.5rem;
}

.app-description {
  font-size: 1.25rem;
  color: var(--text-secondary, #666);
}

.app-content {
  min-height: 500px;
}

/* Your custom styles */
</style>
```

### 2. Add Route

Edit `src/router/index.js` and add your route:

```javascript
{
  path: '/apps/your-app',
  name: 'YourApp',
  component: () => import('../views/apps/YourAppName.vue'),
  meta: {
    title: 'Your App - BabaThings'
  }
},
```

### 3. Register in Apps Config

Edit `src/config/apps.js` and add your app:

```javascript
{
  id: 'your-app',
  name: 'Your App Name',
  description: 'Brief description',
  url: '/apps/your-app',
  icon: '🎯',
  color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  status: 'new' // or null, 'beta', 'coming-soon'
}
```

### 4. Done! 🎉

That's it! Your app will automatically:
- ✅ Appear on the landing page
- ✅ Have its own route
- ✅ Be accessible via navigation
- ✅ Inherit the global styling

## File Structure

```
src/
├── views/
│   └── apps/
│       ├── DecisionWheelApp.vue    ← Example app
│       ├── AtomWatchApp.vue        ← Example app
│       └── YourAppName.vue         ← Your new app
├── router/
│   └── index.js                    ← Add route here
└── config/
    └── apps.js                     ← Register app here
```

## Tips

### Choosing a Gradient Color

Use [CSS Gradient](https://cssgradient.io/) or pick from these examples:

```javascript
// Purple to Pink
'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

// Blue to Cyan
'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'

// Green to Teal
'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'

// Orange to Red
'linear-gradient(135deg, #ff9a56 0%, #ff6a00 100%)'

// Pink to Yellow
'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
```

### Status Badges

- `'new'` - Shows "New" badge
- `'beta'` - Shows "Beta" badge
- `'coming-soon'` - Shows "Soon" badge (and disables the card)
- `null` - No badge

### Emoji Icons

Use emojis for quick, beautiful icons:
- 🎡 🎯 🎮 🎨 🎭 🎪
- ⏱️ ⏰ ⏳ 🕐 🕑 🕒
- 💰 💵 💴 💶 💷 💸
- 🎵 🎶 🎤 🎧 🎼 🎹
- 💡 🔦 💫 ⚡ ✨ 🌟

## Example: Full App Addition

Let's add a "Task Manager" app:

**1. Create `src/views/apps/TaskManagerApp.vue`:**
```vue
<template>
  <div class="app-container task-manager">
    <div class="app-header">
      <h1 class="app-title">
        <span class="app-icon">✅</span>
        Task Manager
      </h1>
      <p class="app-description">Organize your tasks efficiently</p>
    </div>
    <div class="app-content">
      <input v-model="newTask" @keyup.enter="addTask" placeholder="Add a task...">
      <ul>
        <li v-for="task in tasks" :key="task.id">{{ task.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskManagerApp',
  data() {
    return {
      newTask: '',
      tasks: []
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.push({ id: Date.now(), text: this.newTask });
        this.newTask = '';
      }
    }
  }
};
</script>
```

**2. Add to `src/router/index.js`:**
```javascript
{
  path: '/apps/task-manager',
  name: 'TaskManager',
  component: () => import('../views/apps/TaskManagerApp.vue'),
  meta: { title: 'Task Manager - BabaThings' }
},
```

**3. Add to `src/config/apps.js`:**
```javascript
{
  id: 'task-manager',
  name: 'Task Manager',
  description: 'Organize your tasks efficiently',
  url: '/apps/task-manager',
  icon: '✅',
  color: 'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)',
  status: null
}
```

Done! Your Task Manager is now live. 🚀

## Migration from External Project

If you have an existing HTML/JS app you want to integrate:

1. Copy your HTML into the `<div class="app-content">` section
2. Move your CSS into the `<style scoped>` section
3. Convert your JavaScript to Vue's `data()` and `methods`
4. Replace DOM manipulation with Vue's reactive data binding

Need help? Check the existing apps in `src/views/apps/` for examples!
