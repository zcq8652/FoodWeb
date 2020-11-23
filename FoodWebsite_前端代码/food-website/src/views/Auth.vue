<template>
    <div class="AuthAll">
        <div class="loading1">
            <Loading/>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import Loading from "../components/Loading";
export default {
    components: {
        Loading
    },
    computed: mapState("loginUser", ["data", "isLoading"]),
    methods: {
        handleLogin(){
            if(this.isLoading){//正在远程加载中
                return;
            }
            if(this.data){//用户登录了
                if(this.$route.query.returnurl){
                    this.$router.push(this.$route.query.returnurl);
                }else{
                    this.$router.push({name: "Home"});
                }
            }else{//用户没有登录
                this.$router.push({name: "Login"});
            }
        }
    },
    watch: {
        data: {
            immediate: true,
            handler(){
                this.handleLogin();
            }
        },
        isLoading: {
            immediate: true,
            handler(){
                this.handleLogin();
            }
        }
    }
}
</script>

<style scoped>
.AuthAll{
    margin-top: 50px;
    width: 100%;
    height: 500px;
    /*border: 1px solid red;*/
}
.loading1{
    position: absolute;
    top: 100px;
    width: 100%;
}
</style>