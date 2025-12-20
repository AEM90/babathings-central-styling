<template>
  <div class="tools-page">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title text-gradient">All Tools</h1>
        <p class="page-subtitle">
          Explore our complete collection of productivity tools
        </p>
      </div>
    </section>

    <section class="tools-content">
      <div class="container">
        <div class="tools-grid">
          <div 
            v-for="tool in tools" 
            :key="tool.id"
            class="tool-card glass-card animate-scale-in"
          >
            <div class="tool-card-inner">
              <div class="tool-icon" :style="{ background: tool.color }">
                <div class="tool-icon-glow" :style="{ background: tool.color }"></div>
                <span class="tool-emoji">{{ tool.icon }}</span>
              </div>
              <div class="tool-content">
                <h3 class="tool-title">{{ tool.name }}</h3>
                <p class="tool-description">{{ tool.description }}</p>
              </div>
              <div v-if="tool.status" class="tool-status" :class="`tool-status-${tool.status}`">
                {{ formatStatus(tool.status) }}
              </div>
              <div class="tool-hover-effect">
                <button class="btn btn-primary btn-sm">Launch Tool</button>
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
  name: 'ToolsPage',
  data() {
    return {
      tools: [
        {
          id: 'decision-wheel',
          name: 'Decision Wheel',
          description: 'Spin the wheel to make random decisions',
          icon: '🎡',
          color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          status: 'new'
        },
        {
          id: 'atomwatch',
          name: 'AtomWatch',
          description: 'Track time with atomic precision',
          icon: '⏱️',
          color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          status: null
        },
        {
          id: 'moneyburn',
          name: 'MoneyBurn',
          description: 'Meeting cost calculator',
          icon: '💰',
          color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          status: null
        },
        {
          id: 'soundboard',
          name: 'Agile Soundboard',
          description: 'Fun sounds for agile meetings',
          icon: '🎵',
          color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          status: 'beta'
        },
        {
          id: 'brainstorm',
          name: 'Brainstorm',
          description: 'Collaborative idea board',
          icon: '💡',
          color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          status: 'coming-soon'
        },
        {
          id: 'pomodoro',
          name: 'Pomodoro Timer',
          description: 'Focus and productivity timer',
          icon: '🍅',
          color: 'linear-gradient(135deg, #ff9a56 0%, #ff6a00 100%)',
          status: 'coming-soon'
        }
      ]
    };
  },
  methods: {
    formatStatus(status) {
      const statusMap = {
        'new': 'New',
        'beta': 'Beta',
        'coming-soon': 'Soon'
      };
      return statusMap[status] || status;
    }
  }
};
</script>

<style scoped>
.tools-page {
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

.tools-content {
  padding: var(--space-2xl) 0;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
}

/* Reuse tool card styles */
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
}

.tool-description {
  font-size: 1rem;
  color: var(--text-secondary);
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

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
