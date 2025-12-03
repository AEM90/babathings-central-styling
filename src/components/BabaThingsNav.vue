<template>
  <nav class="babathings-nav" :class="{ 'babathings-nav--vertical': vertical }">
    <div class="babathings-nav__container">
      <div v-if="showBranding" class="babathings-nav__branding">
        <a 
          href="https://babathings.com" 
          class="babathings-nav__logo"
          :aria-label="logoAriaLabel"
        >
          <slot name="logo">
            <span class="babathings-nav__logo-text">BabaThings</span>
          </slot>
        </a>
        <p v-if="showTagline" class="babathings-nav__tagline">
          {{ tagline }}
        </p>
      </div>
      
      <ul class="babathings-nav__apps" role="list">
        <li 
          v-for="app in apps" 
          :key="app.id"
          class="babathings-nav__item"
        >
          <a 
            :href="app.url" 
            class="babathings-nav__link"
            :class="{ 'babathings-nav__link--active': isActive(app) }"
            :aria-label="`Visit ${app.name} - ${app.description}`"
            :title="app.description"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span v-if="app.icon" class="babathings-nav__icon" :aria-hidden="true">
              {{ app.icon }}
            </span>
            <span class="babathings-nav__label">{{ app.name }}</span>
            <span v-if="app.status" class="babathings-nav__badge" :class="`babathings-nav__badge--${app.status}`">
              {{ formatStatus(app.status) }}
            </span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BabaThingsNav',
  props: {
    apps: {
      type: Array,
      default: () => []
    },
    showBranding: {
      type: Boolean,
      default: true
    },
    showTagline: {
      type: Boolean,
      default: true
    },
    tagline: {
      type: String,
      default: 'Your productivity & fun toolkit'
    },
    logoAriaLabel: {
      type: String,
      default: 'BabaThings Home - Return to main dashboard'
    },
    vertical: {
      type: Boolean,
      default: false
    },
    currentUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    formatStatus(status) {
      const statusMap = {
        'new': 'New',
        'beta': 'Beta',
        'coming-soon': 'Coming Soon'
      };
      return statusMap[status] || status;
    },
    isActive(app) {
      if (!this.currentUrl) return false;
      return this.currentUrl.includes(app.id) || this.currentUrl === app.url;
    }
  }
};
</script>

<style scoped>
.babathings-nav {
  background-color: var(--surface-color, #ffffff);
  border-bottom: 1px solid var(--border-color, #e5e7eb);
  padding: 1rem 0;
}

.babathings-nav__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.babathings-nav__branding {
  margin-bottom: 1rem;
  text-align: center;
}

.babathings-nav__logo {
  display: inline-block;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s;
}

.babathings-nav__logo:hover {
  opacity: 0.8;
}

.babathings-nav__logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color, #6366f1), var(--secondary-color, #10b981));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.babathings-nav__tagline {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
  margin-top: 0.25rem;
}

.babathings-nav__apps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.babathings-nav__item {
  margin: 0;
}

.babathings-nav__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--text-primary, #1f2937);
  background-color: transparent;
  border: 1px solid transparent;
  transition: all 0.2s;
  font-size: 0.875rem;
  white-space: nowrap;
}

.babathings-nav__link:hover {
  background-color: var(--background-color, #f9fafb);
  border-color: var(--border-color, #e5e7eb);
}

.babathings-nav__link--active {
  background-color: var(--primary-color, #6366f1);
  color: white;
  border-color: var(--primary-color, #6366f1);
}

.babathings-nav__icon {
  font-size: 1.125rem;
  line-height: 1;
}

.babathings-nav__label {
  font-weight: 500;
}

.babathings-nav__badge {
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
}

.babathings-nav__badge--new {
  background-color: #d1fae5;
  color: #065f46;
}

.babathings-nav__badge--beta {
  background-color: #dbeafe;
  color: #1e40af;
}

.babathings-nav__badge--coming-soon {
  background-color: #fef3c7;
  color: #92400e;
}

/* Vertical layout */
.babathings-nav--vertical .babathings-nav__apps {
  flex-direction: column;
  align-items: stretch;
}

.babathings-nav--vertical .babathings-nav__link {
  justify-content: flex-start;
}

@media (prefers-color-scheme: dark) {
  .babathings-nav__link:hover {
    background-color: var(--surface-color, #1f2937);
  }
}

@media (max-width: 768px) {
  .babathings-nav__container {
    padding: 0 1rem;
  }
  
  .babathings-nav__apps {
    gap: 0.375rem;
  }
  
  .babathings-nav__link {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }
  
  .babathings-nav__icon {
    font-size: 1rem;
  }
}
</style>
