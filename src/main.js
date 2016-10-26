import Vue from 'vue';
import App from './app';
import VueAirloy from 'vue-airloy';
import AirloyWeb from 'airloy-web';
import config from './config.json';

VueAirloy.configure(config.airloy);
VueAirloy.use(AirloyWeb);

Vue.use(VueAirloy);

new Vue({ // eslint-disable-line
  el: '#app',
  render: h => h(App)
});
