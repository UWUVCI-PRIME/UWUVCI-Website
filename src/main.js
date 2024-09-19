/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';
import router from './router';

// Assets
import "./assets/styles.css";

const app = createApp(App);
registerPlugins(app);       // Register plugins like Vuetify, etc.
app.use(router);            // Use Vue Router for navigation
app.mount('#app');          // Mount the app to a single entry point
