import Vue from 'vue';

import VEmojiPicker from 'v-emoji-picker';

Vue.config.productionTip = false;
Vue.use(VEmojiPicker);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
