<template>
  <div class="app-container soundboard-app">
    <div class="app-header">
      <h1 class="app-title">
        <span class="app-icon">🎵</span>
        Agile Soundboard
      </h1>
      <p class="app-description">Fun sounds for your agile meetings</p>
    </div>

    <div class="app-content">
      <div class="soundboard-placeholder">
        <div class="sound-grid">
          <div v-for="i in 6" :key="i" class="sound-button">
            <span class="sound-emoji">🔊</span>
          </div>
        </div>
        <p class="placeholder-text">Agile Soundboard</p>
        <p class="placeholder-hint">
          Replace this with your actual soundboard implementation
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SoundboardApp'
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

.soundboard-placeholder {
  text-align: center;
  padding: 3rem;
  width: 100%;
  max-width: 600px;
}

.sound-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.sound-button {
  aspect-ratio: 1;
  border-radius: 15px;
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 5px 20px rgba(67, 233, 123, 0.3);
}

.sound-button:hover {
  transform: scale(1.05);
}

.sound-emoji {
  font-size: 3rem;
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
