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
