<template>
  <footer class="futuristic-footer">
    <div class="footer-glow"></div>
    <div class="container">
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-brand">
          <div class="footer-logo">
            <div class="footer-logo-icon">
              <span class="logo-glow"></span>
              <span class="logo-text">BT</span>
            </div>
            <span class="footer-logo-name">BabaThings</span>
          </div>
          <p class="footer-tagline">
            Your gateway to innovative productivity tools and creative solutions for the digital age.
          </p>
          <div class="footer-social">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url" 
              class="social-link"
              :aria-label="social.name"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{{ social.icon }}</span>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-links">
          <div class="footer-column">
            <h4 class="footer-title">Tools</h4>
            <ul class="footer-list">
              <li><router-link to="/decision-wheel" class="footer-link">Decision Wheel</router-link></li>
              <li><router-link to="/atomwatch" class="footer-link">AtomWatch</router-link></li>
              <li><router-link to="/moneyburn" class="footer-link">MoneyBurn</router-link></li>
              <li><router-link to="/soundboard" class="footer-link">Soundboard</router-link></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4 class="footer-title">Company</h4>
            <ul class="footer-list">
              <li><router-link to="/about" class="footer-link">About Us</router-link></li>
              <li><router-link to="/blog" class="footer-link">Blog</router-link></li>
              <li><router-link to="/careers" class="footer-link">Careers</router-link></li>
              <li><router-link to="/contact" class="footer-link">Contact</router-link></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4 class="footer-title">Resources</h4>
            <ul class="footer-list">
              <li><a href="#" class="footer-link">Documentation</a></li>
              <li><a href="#" class="footer-link">API Reference</a></li>
              <li><a href="#" class="footer-link">Support</a></li>
              <li><a href="#" class="footer-link">FAQ</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4 class="footer-title">Legal</h4>
            <ul class="footer-list">
              <li><router-link to="/privacy" class="footer-link">Privacy Policy</router-link></li>
              <li><router-link to="/terms" class="footer-link">Terms of Service</router-link></li>
              <li><router-link to="/cookies" class="footer-link">Cookie Policy</router-link></li>
              <li><router-link to="/licenses" class="footer-link">Licenses</router-link></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="footer-copyright">
            &copy; {{ currentYear }} BabaThings. All rights reserved.
          </p>
          <div class="footer-badges">
            <span class="footer-badge">Made with ❤️</span>
            <span class="footer-badge">Built for the future</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FuturisticFooter',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      socialLinks: [
        { name: 'GitHub', icon: '💻', url: 'https://github.com/AEM90' },
        { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
        { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
        { name: 'Discord', icon: '💬', url: 'https://discord.com' }
      ]
    };
  }
};
</script>

<style scoped>
.futuristic-footer {
  position: relative;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-glass);
  margin-top: var(--space-2xl);
  overflow: hidden;
}

.footer-glow {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 200px;
  background: radial-gradient(ellipse, var(--primary-glow) 0%, transparent 70%);
  opacity: 0.3;
  pointer-events: none;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: var(--space-2xl);
  padding: var(--space-2xl) 0;
  border-bottom: 1px solid var(--border-glass);
}

/* Brand Section */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.footer-logo-icon {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-gradient);
  border-radius: var(--radius-md);
  box-shadow: var(--glow-primary);
}

.logo-glow {
  position: absolute;
  inset: -4px;
  background: var(--primary-gradient);
  border-radius: var(--radius-md);
  opacity: 0.3;
  filter: blur(12px);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  position: relative;
  z-index: 1;
}

.footer-logo-name {
  font-size: 1.5rem;
  font-weight: 700;
  background: var(--text-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-tagline {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 400px;
}

/* Social Links */
.footer-social {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-sm);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--surface-glass);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-md);
  font-size: 1.25rem;
  transition: var(--transition-base);
  text-decoration: none;
}

.social-link:hover {
  background: var(--surface-glass-hover);
  border-color: var(--primary-color);
  transform: translateY(-4px);
  box-shadow: var(--glow-primary);
}

/* Links Section */
.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.footer-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
}

.footer-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.95rem;
  transition: var(--transition-fast);
  display: inline-block;
}

.footer-link:hover {
  color: var(--primary-color);
  transform: translateX(4px);
}

/* Bottom Bar */
.footer-bottom {
  padding: var(--space-lg) 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.footer-copyright {
  font-size: 0.9rem;
  color: var(--text-tertiary);
  margin: 0;
}

.footer-badges {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.footer-badge {
  padding: var(--space-xs) var(--space-md);
  background: var(--surface-glass);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
  
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-content {
    padding: var(--space-xl) 0;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer-social {
    flex-wrap: wrap;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
  
  .footer-badges {
    justify-content: center;
  }
}
</style>
