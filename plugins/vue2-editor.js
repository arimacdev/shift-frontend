import Vue from 'vue';

if (process.client) {
  const VueEditor = require('vue2-editor');
  Vue.use(VueEditor);
}
