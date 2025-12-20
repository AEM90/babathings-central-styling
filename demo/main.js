import { createApp } from 'vue';
import DemoApp from './DemoApp.vue';
import BabaThingsPlugin from '../src/index.js';

const app = createApp(DemoApp);

// Use the plugin with default configuration
app.use(BabaThingsPlugin);

app.mount('#app');
