<template>
  <div class="contact-page">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title text-gradient">Get In Touch</h1>
        <p class="page-subtitle">
          Have questions? We'd love to hear from you
        </p>
      </div>
    </section>

    <section class="contact-content">
      <div class="container-narrow">
        <div class="contact-card glass-card">
          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Name</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name"
                class="form-input"
                placeholder="Your name"
                required
              />
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email"
                class="form-input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div class="form-group">
              <label for="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                v-model="form.subject"
                class="form-input"
                placeholder="How can we help?"
                required
              />
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea 
                id="message" 
                v-model="form.message"
                class="form-textarea"
                placeholder="Your message..."
                rows="6"
                required
              ></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-lg btn-full">
              Send Message
              <span>📧</span>
            </button>
          </form>

          <div class="contact-info">
            <h3>Other Ways to Reach Us</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-icon">📧</span>
                <span class="info-text">hello@babathings.com</span>
              </div>
              <div class="info-item">
                <span class="info-icon">💬</span>
                <span class="info-text">Join our Discord</span>
              </div>
              <div class="info-item">
                <span class="info-icon">🐦</span>
                <span class="info-text">@babathings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    };
  },
  methods: {
    submitForm() {
      // Handle form submission
      alert('Thank you for your message! We\'ll get back to you soon.');
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    }
  }
};
</script>

<style scoped>
.contact-page {
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

.contact-content {
  padding: var(--space-2xl) 0;
}

.contact-card {
  padding: var(--space-2xl);
}

.contact-form {
  margin-bottom: var(--space-2xl);
}

.form-group {
  margin-bottom: var(--space-lg);
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: var(--space-xs);
  color: var(--text-primary);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: var(--space-md);
  background: var(--surface-glass);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 1rem;
  font-family: inherit;
  transition: var(--transition-fast);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-full {
  width: 100%;
}

.contact-info {
  padding-top: var(--space-2xl);
  border-top: 1px solid var(--border-glass);
}

.contact-info h3 {
  font-size: 1.5rem;
  margin-bottom: var(--space-lg);
  text-align: center;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-lg);
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-xs);
}

.info-icon {
  font-size: 2rem;
}

.info-text {
  font-size: 1rem;
  color: var(--text-secondary);
}
</style>
