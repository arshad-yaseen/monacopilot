import {loader} from '@guolao/vue-monaco-editor';
import {createApp} from 'vue';

import App from './App.vue';

loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs',
  },
});

createApp(App).mount('#app');
