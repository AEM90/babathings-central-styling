<template>
  <div class="not-found-page">
    <div class="container">
      <div class="not-found-content">
        <div class="not-found-animation">
          <span class="not-found-emoji animate-float">🚀</span>
        </div>
        <h1 class="not-found-title text-gradient">404</h1>
        <h2 class="not-found-subtitle">Page Not Found</h2>
        <p class="not-found-text">
          Oops! The page you're looking for seems to have drifted into the digital void.
        </p>
        <div class="not-found-actions">
          <router-link to="/" class="btn btn-primary btn-lg">
            Go Home
            <span>🏠</span>
          </router-link>
          <router-link to="/tools" class="btn btn-ghost btn-lg">
            Browse Tools
            <span>🛠️</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
};
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2xl) 0;
}

.not-found-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.not-found-animation {
  margin-bottom: var(--space-xl);
}

.not-found-emoji {
  font-size: 6rem;
  display: inline-block;
}

.not-found-title {
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 900;
  margin-bottom: var(--space-md);
  line-height: 1;
}

.not-found-subtitle {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  margin-bottom: var(--space-md);
  color: var(--text-primary);
}

.not-found-text {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-2xl);
}

.not-found-actions {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .not-found-actions {
    flex-direction: column;
  }
  
  .btn-lg {
    width: 100%;
  }
}
</style>
