/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'



// Components
import App from './index.vue'

// Composables
import { createApp } from 'vue'
import router from './../router'

const app = createApp(App, router)

registerPlugins(app)

app.mount('#app')
