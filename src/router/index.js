// Import Vue Router and views
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import CompatTemplate from '@/components/CompatTemplate.vue';

// Define routes manually (couldn't get dynamic working)
const routes = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/ndscompat',
    name: 'NDSCompat',
    component: CompatTemplate,
    props: { jsonFileName: 'NDSCompat.json', title: 'NDS' },
  },
  {
    path: '/n64compat',
    name: 'N64Compat',
    component: CompatTemplate,
    props: { jsonFileName: 'N64Compat.json', title: 'N64' },
  },
  {
    path: '/gbacompat',
    name: 'GBACompat',
    component: CompatTemplate,
    props: { jsonFileName: 'GBACompat.json', title: 'GBA' },
  },
  {
    path: '/msxcompat',
    name: 'MSXCompat',
    component: CompatTemplate,
    props: { jsonFileName: 'MSXCompat.json', title: 'MSX' },
  },
  {
    path: '/nescompat',
    name: 'NESCompat',
    component: CompatTemplate,
    props: { jsonFileName: 'NESCompat.json', title: 'NES' },
  },
  {
    path: '/snescompat',
    name: 'SNESCompat',
    component: CompatTemplate,
    props: { jsonFileName: 'SNESCompat.json', title: 'SNES' },
  },
  {
    path: '/tg16compat',
    name: 'TG16Compat',
    component: CompatTemplate,
    props: { jsonFileName: 'TG16Compat.json', title: 'TG16' },
  },
  {
    path: '/wiicompat',
    name: 'WiiCompat',
    component: CompatTemplate,
    props: { jsonFileName: 'WiiCompat.json', title: 'Wii' },
  },
  {
    path: '/:pathMatch(.*)*', // Handle unmatched paths
    redirect: '/', // Redirect to the home page
  },
];

// Create a new Vue Router instance with manual routing
const router = createRouter({
  history: createWebHashHistory(),  // Use hash mode for GitHub Pages
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
