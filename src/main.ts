import './assets/main.css'

import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from "./router"; // 导入路由配置
import Vant from 'vant';

const app = createApp(App)

app.use(Vant);
// Lazyload 指令需要单独进行注册
app.use(Vant.Lazyload);

app.use(router); // 使用路由

app.mount('#app')
