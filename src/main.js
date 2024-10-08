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

// Assets
import "./assets/styles.css";

const app = createApp(App);
registerPlugins(app);       // Register plugins like Vuetify, etc.
app.mount('#app');          // Mount the app to a single entry point
