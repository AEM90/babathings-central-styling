<template>
  <div class="about-page">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title text-gradient">About BabaThings</h1>
        <p class="page-subtitle">
          Building the future of productivity, one tool at a time
        </p>
      </div>
    </section>

    <section class="about-content">
      <div class="container-narrow">
        <div class="content-card glass-card">
          <h2>Our Mission</h2>
          <p>
            At BabaThings, we believe that productivity tools should be beautiful, intuitive, and powerful. 
            We're building a collection of innovative applications that make everyday tasks effortless and enjoyable.
          </p>

          <h2>What We Do</h2>
          <p>
            We create web-based tools that solve real problems for teams and individuals. From decision-making 
            helpers to time tracking solutions, each tool is crafted with attention to detail and user experience.
          </p>

          <h2>Our Values</h2>
          <ul class="values-list">
            <li><strong>Innovation:</strong> We push the boundaries of what's possible</li>
            <li><strong>Simplicity:</strong> Complex problems, simple solutions</li>
            <li><strong>Design:</strong> Beauty meets functionality</li>
            <li><strong>Privacy:</strong> Your data stays yours</li>
          </ul>

          <div class="cta-section">
            <button class="btn btn-primary btn-lg">Join Our Journey</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
};
</script>

<style scoped>
.about-page {
  padding-top: 80px;
}

.page-hero {
  padding: var(--space-2xl) 0;
  text-align: center;
  background: var(--bg-secondary);
}

.page-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: var(--space-md);
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.about-content {
  padding: var(--space-2xl) 0;
}

.content-card {
  padding: var(--space-2xl);
}

.content-card h2 {
  font-size: 2rem;
  margin-top: var(--space-xl);
  margin-bottom: var(--space-md);
  color: var(--text-primary);
}

.content-card h2:first-child {
  margin-top: 0;
}

.content-card p {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: var(--space-md);
}

.values-list {
  list-style: none;
  padding: 0;
  margin: var(--space-md) 0;
}

.values-list li {
  font-size: 1.125rem;
  color: var(--text-secondary);
  padding: var(--space-sm) 0;
  padding-left: var(--space-xl);
  position: relative;
}

.values-list li::before {
  content: '✨';
  position: absolute;
  left: 0;
  font-size: 1.25rem;
}

.values-list strong {
  color: var(--primary-color);
}

.cta-section {
  margin-top: var(--space-2xl);
  text-align: center;
}
</style>
