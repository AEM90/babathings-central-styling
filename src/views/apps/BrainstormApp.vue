<template>
  <div class="app-container brainstorm-app">
    <div class="app-header">
      <h1 class="app-title">
        <span class="app-icon">💡</span>
        Brainstorm
      </h1>
      <p class="app-description">Collaborative idea board</p>
    </div>

    <div class="app-content">
      <div class="brainstorm-placeholder">
        <div class="ideas-grid">
          <div v-for="i in 4" :key="i" class="idea-card">
            <span class="idea-emoji">💭</span>
          </div>
        </div>
        <p class="placeholder-text">Brainstorm Board</p>
        <p class="placeholder-hint">
          Replace this with your actual brainstorm implementation
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrainstormApp'
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

.brainstorm-placeholder {
  text-align: center;
  padding: 3rem;
  width: 100%;
  max-width: 800px;
}

.ideas-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.idea-card {
  aspect-ratio: 1.5;
  border-radius: 15px;
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 5px 20px rgba(250, 112, 154, 0.3);
}

.idea-card:hover {
  transform: scale(1.05);
}

.idea-emoji {
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
