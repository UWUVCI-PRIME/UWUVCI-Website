// Import Vue Router and views
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import NDSCompat from '@/views/NDSCompat.vue';

// Define routes manually (couldn't get dynamic working)
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/ndscompat', name: 'NDSCompat', component: NDSCompat },
];

// Create a new Vue Router instance with manual routing
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  // This is how Vue Router manages history (URLs)
  routes,  // The routes defined above
});

// Handle errors
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath);
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err);
    }
  } else {
    console.error(err);
  }
});

// Cleanup after dynamic reloading
router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router;
