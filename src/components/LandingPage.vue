<template>
  <div class="landing-page">
    <!-- AtomWatch Hero Section -->
    <section class="atomwatch-hero">
      <div class="atomwatch-container">
        <div class="atomwatch-display">
          <div class="time-display">{{ currentTime }}</div>
          <div class="load-beam" :style="{ animationPlayState: beamRunning ? 'running' : 'paused' }"></div>
          <div class="date-display">{{ currentDate }}</div>
        </div>
        <p class="atomwatch-tagline">Atomic Precision. Every Second Counts.</p>
      </div>
    </section>

    <!-- Tools Grid Section -->
    <section class="tools-section">
      <div class="container">
        <div class="section-header animate-fade-in">
          <h2 class="section-title">Our Tools</h2>
          <p class="section-subtitle">
            Choose from our growing collection of powerful productivity tools
          </p>
        </div>

        <div class="tools-grid">
          <router-link
            v-for="(tool, index) in tools" 
            :key="tool.id"
            :to="tool.url"
            class="tool-card glass-card animate-scale-in"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="tool-card-inner">
              <!-- Icon -->
              <div class="tool-icon" :style="{ background: tool.color }">
                <div class="tool-icon-glow" :style="{ background: tool.color }"></div>
                <span class="tool-emoji">{{ tool.icon }}</span>
              </div>

              <!-- Content -->
              <div class="tool-content">
                <h3 class="tool-title">{{ tool.name }}</h3>
                <p class="tool-description">{{ tool.description }}</p>
              </div>

              <!-- Status Badge -->
              <div v-if="tool.status" class="tool-status" :class="`tool-status-${tool.status}`">
                {{ formatStatus(tool.status) }}
              </div>

              <!-- Hover Effect -->
              <div class="tool-hover-effect">
                <button class="btn btn-secondary btn-sm">
                  Launch Tool
                  <span>→</span>
                </button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header animate-fade-in">
          <h2 class="section-title">Why Choose BabaThings?</h2>
          <p class="section-subtitle">
            Built with modern technology for the best user experience
          </p>
        </div>

        <div class="features-grid">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="feature-card glass-card animate-fade-in"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card glass-card glass-card--glow">
          <div class="cta-content">
            <h2 class="cta-title">Ready to Transform Your Workflow?</h2>
            <p class="cta-subtitle">
              Join thousands of users who are already experiencing the future of productivity
            </p>
            <div class="cta-actions">
              <button class="btn btn-primary btn-lg">
                Get Started Free
                <span>✨</span>
              </button>
              <button class="btn btn-neon btn-lg">
                View All Tools
                <span>🎯</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defaultApps } from '../config/apps.js';

export default {
  name: 'LandingPage',
  data() {
    return {
      currentTime: '',
      currentDate: '',
      beamRunning: false,
      updateInterval: null,
      tools: defaultApps,
      features: [
        {
          icon: '⚡',
          title: 'Lightning Fast',
          description: 'Built with modern tech for instant load times and smooth interactions'
        },
        {
          icon: '🎨',
          title: 'Beautiful Design',
          description: 'Stunning futuristic UI with attention to every detail'
        },
        {
          icon: '📱',
          title: 'Fully Responsive',
          description: 'Perfect experience on desktop, tablet, and mobile devices'
        },
        {
          icon: '🔒',
          title: 'Secure & Private',
          description: 'Your data is safe with enterprise-grade security measures'
        },
        {
          icon: '🌙',
          title: 'Dark Mode',
          description: 'Eye-friendly dark theme that adapts to your system preferences'
        },
        {
          icon: '🚀',
          title: 'Always Improving',
          description: 'Regular updates with new features and improvements'
        }
      ]
    };
  },
  mounted() {
    this.startClock();
    this.syncLoadBeam();
  },
  beforeUnmount() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  },
  methods: {
    startClock() {
      this.updateTime();
      this.updateInterval = setInterval(() => {
        this.updateTime();
      }, 100);
    },
    
    updateTime() {
      const now = new Date();
      
      this.currentTime = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      this.currentDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    
    syncLoadBeam() {
      const currentTime = new Date();
      const millisecondsUntilNextSecond = 1000 - currentTime.getMilliseconds();
      
      setTimeout(() => {
        this.beamRunning = true;
      }, millisecondsUntilNextSecond);
    },
    
    formatStatus(status) {
      const statusMap = {
        'new': 'New',
        'popular': 'Popular',
        'beta': 'Beta',
        'updated': 'Updated'
      };
      return statusMap[status] || status;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

.landing-page {
  min-height: 100vh;
}

/* AtomWatch Hero Section */
.atomwatch-hero {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  padding: 4rem 2rem;
}

.atomwatch-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.atomwatch-display {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.time-display {
  font-family: 'Orbitron', monospace;
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 900;
  color: #00ff88;
  text-shadow: 
    0 0 5px #00ff88,
    0 0 10px #00ff88,
    0 0 15px #00ff88;
  letter-spacing: 0.1em;
  text-align: center;
}

.load-beam {
  width: 0%;
  height: 6px;
  background: linear-gradient(90deg, #00ff88, #00ffff);
  box-shadow: 
    0 0 5px #00ff88,
    0 0 10px #00ff88;
  animation: loadBeam 1s linear infinite;
  border-radius: 4px;
  max-width: 800px;
  width: 100%;
}

@keyframes loadBeam {
  0% { width: 0%; }
  100% { width: 100%; }
}

.date-display {
  font-family: 'Orbitron', monospace;
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 400;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  letter-spacing: 0.05em;
  text-align: center;
}

.atomwatch-tagline {
  font-family: 'Orbitron', monospace;
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-top: 1rem;
  letter-spacing: 0.1em;
}

.section-header {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.hero-title-line {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 500;
  color: var(--text-secondary);
}

.hero-title-main {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  color: var(--text-secondary);
  margin-bottom: var(--space-2xl);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.hero-cta {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  flex-wrap: wrap;
}

/* Tools Section */
.tools-section {
  padding: var(--space-2xl) 0;
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: var(--space-md);
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-lg);
}

.tool-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.tool-card-inner {
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-md);
  position: relative;
  z-index: 1;
}

.tool-icon {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-sm);
  transition: var(--transition-base);
}

.tool-icon-glow {
  position: absolute;
  inset: -8px;
  border-radius: var(--radius-lg);
  opacity: 0;
  filter: blur(20px);
  transition: var(--transition-base);
}

.tool-emoji {
  font-size: 3rem;
  position: relative;
  z-index: 1;
}

.tool-card:hover .tool-icon {
  transform: scale(1.1) rotate(-5deg);
}

.tool-card:hover .tool-icon-glow {
  opacity: 0.6;
}

.tool-content {
  flex: 1;
}

.tool-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--space-xs);
  color: var(--text-primary);
}

.tool-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.tool-status {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tool-status-new {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
}

.tool-status-beta {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}

.tool-status-coming-soon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
}

.tool-hover-effect {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-lg);
  background: linear-gradient(to top, var(--bg-secondary), transparent);
  transform: translateY(100%);
  transition: var(--transition-base);
  opacity: 0;
}

.tool-card:hover .tool-hover-effect {
  transform: translateY(0);
  opacity: 1;
}

/* Features Section */
.features-section {
  padding: var(--space-2xl) 0;
  background: var(--bg-secondary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-lg);
}

.feature-card {
  padding: var(--space-xl);
  text-align: center;
}

.feature-icon {
  font-size: 3.5rem;
  margin-bottom: var(--space-md);
  animation: float 3s ease-in-out infinite;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--space-sm);
  color: var(--text-primary);
}

.feature-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* CTA Section */
.cta-section {
  padding: var(--space-2xl) 0;
}

.cta-card {
  padding: var(--space-2xl);
  text-align: center;
}

.cta-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

/* Responsive Design */
@media (max-width: 768px) {
  .atomwatch-hero {
    min-height: 60vh;
    padding: 3rem 1rem;
  }
  
  .time-display {
    letter-spacing: 0.05em;
  }
  
  .load-beam {
    height: 4px;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .btn-lg {
    width: 100%;
  }
  
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 80vh;
  }
  
  .hero-cta,
  .cta-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .btn-lg {
    width: 100%;
  }
  
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
