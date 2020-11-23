//登录用户的仓库数据
import {login, autologin, exitlogin, updateUserInfo, updateUserInfo2} from "../services/userService";

export default {
    namespaced: true,//开启命名空间
    state: {
        data: null,//当前登录的用户
        isLoading: false//是否正在远程加载中
    },
    mutations: {//数据变异
        //state：原来的状态
        //payload：负荷
        setIsLoading(state, payload){
            state.isLoading = payload;
        },
        setData(state, payload){
            state.data = payload;
        }
    },
    actions: {//有副作用的操作
        async login(context, payload){
            context.commit("setIsLoading", true);
            var resp = await login(payload);
            if(resp.data.state==1){
                //登录成功
                context.commit("setData", resp.data.data);
            }
            context.commit("setIsLoading", false);
            return {state:resp.data.state,message:resp.data.message};
        },
        async autologin(context){
            context.commit("setIsLoading", true);
            var resp = await autologin();
            if(resp.data.data){
                context.commit("setData", resp.data.data);
            }
            context.commit("setIsLoading", false);
        },
        async exitlogin(context, payload){
            await exitlogin(payload);
            context.commit("setData", null);
        },
        async updateUserInfo(context, payload){
            var resp = await updateUserInfo(payload);
            if(resp.data.state==1){
                //修改用户信息成功
                context.commit("setData", resp.data.data);
            }
            return resp.data.state;
        },
        async updateUserInfo2(context, payload){
            var resp = await updateUserInfo2(payload);
            if(resp.data.state==1){
                //修改用户信息成功
                context.commit("setData", resp.data.data);
            }
            return resp.data.state;
        },
    }
}