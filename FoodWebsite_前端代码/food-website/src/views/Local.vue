<template>
    <div class="local">
        <div class="local_top">
            <span class="local_title">{{localTitle}}美食</span>
        </div>
        <div class="local_center">
            <div class="loading" v-show="isLoading">
                <Loading/>
            </div>
            <div class="local_menu" v-show="!isLoading"><Menu :menuList="menuList"/></div>
        </div>
        <div class="local_bottom">
            <Bottom/>
        </div>
    </div>
</template>

<script>
import Menu from "../components/Menu";
import Bottom from "../components/Bottom";
import {selMenuByProvince} from "../services/menuService";
import Loading from "../components/Loading";
export default {
    inject:['reload'],//注入App里的reload方法
    components: {
        Menu,
        Bottom,
        Loading
    },
    data(){
        return {
            menuList: [],
            isLoading: false
        }
    },
    async created(){
        this.isLoading = true;
        var resp = await selMenuByProvince(this.$route.params.code);
        //console.log(resp);
        if(resp.data.state==1){
            this.menuList = resp.data.data;
            this.isLoading = false;
        }
    },
    computed:{
        localTitle(){
            return this.$route.params.name;
        }
    },
    watch:{
        localTitle(){
            this.reload();
        }
    }
}
</script>

<style scoped>
.local{
    margin-top: 50px;
    width: 100%;
}
.local_top{
    position: relative;
    width: 100%;
    height: 380px;
    background-image: url(../assets/images/local.jpg);
    background-size: 100% 381px;
}
.local_title{
    position: absolute;
    top: 215px;
    display: block;
    width: 100%;
    text-align: center;
    font-size: 60px;
    color: #fff;
    font-family: "楷体";
}
.local_center{
    width: 100%;
    border: 1px solid #EFEFEF;
    background-color: #EFEFEF;
}
.local_menu{
    margin-top: 20px;
}
</style>