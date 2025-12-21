<template>
  <div class="app-container decision-wheel-app">
    <div class="app-header">
      <h1 class="app-title">
        <span class="app-icon">🎡</span>
        Decision Wheel
      </h1>
      <p class="app-description">Spin the wheel to make your decisions!</p>
    </div>

    <div class="app-content">
      <!-- Your Decision Wheel implementation will go here -->
      <div class="wheel-placeholder">
        <div class="wheel-circle">
          <span class="wheel-emoji">🎡</span>
        </div>
        <p class="placeholder-text">Decision Wheel coming soon...</p>
        <p class="placeholder-hint">
          Replace this placeholder with your actual wheel component
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DecisionWheelApp',
  data() {
    return {
      // Your wheel data will go here
    };
  },
  methods: {
    // Your wheel methods will go here
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.wheel-placeholder {
  text-align: center;
  padding: 3rem;
}

.wheel-circle {
  width: 200px;
  height: 200px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin 10s linear infinite;
}

.wheel-emoji {
  font-size: 5rem;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.placeholder-text {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.placeholder-hint {
  color: var(--text-secondary, #666);
}
</style>
