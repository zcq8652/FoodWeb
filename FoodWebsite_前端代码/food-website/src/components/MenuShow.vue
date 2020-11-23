<template>
    <div class="menuShow">
        <div class="title">
            <span>{{title}}</span>
            <img src="../assets/images/xiong1.png" class="decorate">
        </div>
        <div class="loading" v-show="isLoading">
            <Loading/>
        </div>
        <div class="menu_content" v-show="!isLoading && demo==0">
            <Menu :menuList="menuList"/>
        </div>
        <div class="menu_content2" v-show="!isLoading && demo==1">
            很抱歉，没有找到相关菜谱
        </div>
    </div>
</template>

<script>
import Menu from "./Menu";
import {selLatelyMenu} from "../services/menuService";
import Loading from "./Loading";
export default {
    components: {
        Menu,
        Loading
    },
    data(){
        return{
            title: "新秀菜谱",
            menuList: [],
            isLoading: false,
            demo: 0
        }
    },
    props:{
        searchMenu: {
            type: Array
        }
    },
    async created(){
        this.isLoading = true;
        var resp = await selLatelyMenu();
        //console.log(resp);
        if(resp.data.state==1){
            this.menuList = resp.data.data;
            this.isLoading = false;
        }
    },
    watch: {
        searchMenu(){
            if(this.searchMenu.length != 0){
                this.title = "相关菜谱";
                this.menuList = this.searchMenu;
                this.demo = 0;
            }else{
                this.title = "相关菜谱";
                this.menuList = this.searchMenu;
                this.demo = 1;
            }
        }
    }
}
</script>

<style scoped>
.menuShow{
    width: 100%;
    height: 100%;
    border: 1px solid #FF9933;
    background-color: #FF9933;
}
.title{
    width: 100%;
    height: 120px;
    line-height: 120px;
}
.title span{
    display: block;
    width: 57.1%;
    font-size: 60px;
    font-family: "楷体";
    font-weight: bolder;
    color: #fff;
    float: left;
    text-align: right;
}
.decorate{
    width: 130px;
    margin-left: 200px;
}
.menu_content{
    height: 1245px;
}
.menu_content2{
    height: 1245px;
    text-align: center;
    font-size: 30px;
    font-family: "楷体";
    color: #fff;
    line-height: 180px;
}
.loading{
    position: absolute;
    top: 10vh;
    width: 100%;
    height: 40px;
}
</style>