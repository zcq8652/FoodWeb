import Vue from 'vue';
import App from './App.vue';
import router from "./routers";
import store from "./store";

//自动登录
store.dispatch("loginUser/autologin");

new Vue({
  render: h => h(App),
  router,//3.配置路由到vue实例中
  store//3.配置仓库到vue实例中
}).$mount('#app')
