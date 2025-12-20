<template>
  <a 
    :href="app.url" 
    class="babathings-app-card"
    :class="{ 'babathings-app-card--disabled': app.status === 'coming-soon' }"
    :aria-label="`${app.name} - ${app.description}`"
    :target="app.status === 'coming-soon' ? undefined : '_blank'"
    :rel="app.status === 'coming-soon' ? undefined : 'noopener noreferrer'"
    @click="handleClick"
  >
    <div 
      class="babathings-app-card__icon" 
      :style="{ background: app.color || 'linear-gradient(135deg, #6366f1, #10b981)' }"
      :aria-hidden="true"
    >
      {{ app.icon || '📱' }}
    </div>
    
    <div class="babathings-app-card__content">
      <h3 class="babathings-app-card__title">{{ app.name }}</h3>
      <p class="babathings-app-card__description">{{ app.description }}</p>
    </div>
    
    <span 
      v-if="app.status" 
      class="babathings-app-card__status"
      :class="`babathings-app-card__status--${app.status}`"
    >
      {{ formatStatus(app.status) }}
    </span>
  </a>
</template>

<script>
export default {
  name: 'BabaThingsAppCard',
  props: {
    app: {
      type: Object,
      required: true,
      validator: (app) => {
        return app.id && app.name && app.description && app.url;
      }
    }
  },
  emits: ['click'],
  methods: {
    formatStatus(status) {
      const statusMap = {
        'new': 'New',
        'beta': 'Beta',
        'coming-soon': 'Coming Soon'
      };
      return statusMap[status] || status;
    },
    handleClick(event) {
      if (this.app.status === 'coming-soon') {
        event.preventDefault();
      }
      this.$emit('click', this.app);
    }
  }
};
</script>

<style scoped>
.babathings-app-card {
  background: var(--surface-color, #ffffff);
  border-radius: var(--border-radius-lg, 16px);
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: var(--transition, all 0.3s cubic-bezier(0.4, 0, 0.2, 1));
  border: 2px solid transparent;
  box-shadow: var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  position: relative;
  overflow: hidden;
}

.babathings-app-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent, rgba(99, 102, 241, 0.05));
  opacity: 0;
  transition: var(--transition, all 0.3s cubic-bezier(0.4, 0, 0.2, 1));
  z-index: 0;
}

.babathings-app-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
  border-color: var(--primary-light, #818cf8);
}

.babathings-app-card:hover::before {
  opacity: 1;
}

.babathings-app-card:active {
  transform: translateY(-4px);
}

.babathings-app-card--disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.babathings-app-card--disabled:hover {
  transform: none;
  box-shadow: var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
}

.babathings-app-card__icon {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
  border-radius: var(--border-radius, 12px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  position: relative;
  z-index: 1;
  transition: var(--transition, all 0.3s cubic-bezier(0.4, 0, 0.2, 1));
}

.babathings-app-card:hover .babathings-app-card__icon {
  transform: scale(1.1);
}

.babathings-app-card__content {
  position: relative;
  z-index: 1;
}

.babathings-app-card__title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary, #1f2937);
}

.babathings-app-card__description {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
  line-height: 1.4;
  margin: 0;
}

.babathings-app-card__status {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
}

.babathings-app-card__status--coming-soon {
  background-color: #fef3c7;
  color: #92400e;
}

.babathings-app-card__status--new {
  background-color: #d1fae5;
  color: #065f46;
}

.babathings-app-card__status--beta {
  background-color: #dbeafe;
  color: #1e40af;
}

@media (max-width: 768px) {
  .babathings-app-card {
    padding: 1rem;
    min-height: 160px;
  }
  
  .babathings-app-card__icon {
    width: 64px;
    height: 64px;
    font-size: 2rem;
  }
  
  .babathings-app-card__title {
    font-size: 0.9rem;
  }
  
  .babathings-app-card__description {
    font-size: 0.8rem;
  }
}
</style>
