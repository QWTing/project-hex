import { createApp } from 'vue';
import 'bootstrap';
import vueAxios from 'vue-axios';
import axios from 'axios';

import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';

// 匯入 vee-validate 相關規則
import AllRules from '@vee-validate/rules';

// 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n';

// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});

// 設定預設語系
setLocale('zh_TW');

const app = createApp(App);
app.use(router);
app.use(vueAxios, axios);
// eslint-disable-next-line vue/multi-word-component-names
app.component('Form', Form);
// eslint-disable-next-line vue/multi-word-component-names
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app');
