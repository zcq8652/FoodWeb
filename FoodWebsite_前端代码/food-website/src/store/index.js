import Vue from "vue";
import vuex from "vuex";
import loginUser from "../store/loginUser";

//1.安装
Vue.use(vuex);
//2.创建仓库对象
var store = new vuex.Store({
    //配置
    modules: {
        loginUser
    }
});

export default store;