<template>
  <div class="app-container atomwatch-app">
    <div class="app-header">
      <h1 class="app-title">
        <span class="app-icon">⏱️</span>
        AtomWatch
      </h1>
      <p class="app-description">Track time with atomic precision</p>
    </div>

    <div class="app-content">
      <div class="timer-placeholder">
        <div class="timer-display">
          <span class="time-digits">{{ currentTime }}</span>
        </div>
        <p class="placeholder-text">AtomWatch Timer</p>
        <p class="placeholder-hint">
          Replace this with your actual timer implementation
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AtomWatchApp',
  data() {
    return {
      currentTime: '00:00:00'
    };
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    }
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

.timer-placeholder {
  text-align: center;
  padding: 3rem;
}

.timer-display {
  width: 300px;
  height: 300px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(240, 147, 251, 0.3);
}

.time-digits {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  font-family: 'Courier New', monospace;
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
