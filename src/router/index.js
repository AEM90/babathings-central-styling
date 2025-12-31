import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPage,
    meta: {
      title: 'BabaThings - Future of Productivity'
    }
  },
  // Mini-Apps Routes
  {
    path: '/apps/decision-wheel',
    name: 'DecisionWheel',
    component: () => import(/* webpackChunkName: "decision-wheel" */ '../views/apps/DecisionWheelApp.vue'),
    meta: {
      title: 'Decision Wheel - BabaThings'
    }
  },
  {
    path: '/apps/atomwatch',
    name: 'AtomWatch',
    component: () => import(/* webpackChunkName: "atomwatch" */ '../views/apps/AtomWatchApp.vue'),
    meta: {
      title: 'AtomWatch - BabaThings'
    }
  },
  {
    path: '/apps/moneyburn',
    name: 'MoneyBurn',
    component: () => import(/* webpackChunkName: "moneyburn" */ '../views/apps/MoneyBurnApp.vue'),
    meta: {
      title: 'MoneyBurn - BabaThings'
    }
  },
  {
    path: '/apps/soundboard',
    name: 'Soundboard',
    component: () => import(/* webpackChunkName: "soundboard" */ '../views/apps/SoundboardApp.vue'),
    meta: {
      title: 'Agile Soundboard - BabaThings'
    }
  },
  {
    path: '/apps/brainstorm',
    name: 'Brainstorm',
    component: () => import(/* webpackChunkName: "brainstorm" */ '../views/apps/BrainstormApp.vue'),
    meta: {
      title: 'Brainstorm - BabaThings'
    }
  },
  {
    path: '/apps/currencywatch',
    name: 'CurrencyWatch',
    component: () => import(/* webpackChunkName: "currencywatch" */ '../views/apps/CurrencyWatchApp.vue'),
    meta: {
      title: 'Currency Watch - BabaThings'
    }
  },
  {
    path: '/apps/coffeegrinder',
    name: 'CoffeeGrinder',
    component: () => import(/* webpackChunkName: "coffeegrinder" */ '../views/apps/CoffeeGrinderApp.vue'),
    meta: {
      title: 'Coffee Grinder Logbook - BabaThings'
    }
  },
  // Information Pages
  {
    path: '/tools',
    name: 'Tools',
    component: () => import(/* webpackChunkName: "tools" */ '../views/ToolsPage.vue'),
    meta: {
      title: 'Tools - BabaThings'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutPage.vue'),
    meta: {
      title: 'About - BabaThings'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/ContactPage.vue'),
    meta: {
      title: 'Contact - BabaThings'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "404" */ '../views/NotFound.vue'),
    meta: {
      title: '404 - Page Not Found'
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
});

// Update page title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'BabaThings';
  next();
});

export default router;
