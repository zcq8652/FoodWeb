<template>
    <div class="myMenu">
        <div class="mymenu_top">
            <span class="mymenu_title">我的菜谱</span>
            <div class="mymenu_line"></div>
        </div>
        <div v-show="isLoading" class="loadingBox">
            <div class="loading">
                <Loading/>
            </div>
        </div>
        <div class="mymenu_center" v-show="!isLoading">
            <div class="news_list" v-for="item in myMenu" :key="item.id">
                <router-link :to="{name: 'Detail', params: {menu: item.id}}">
                    <div class="img_box">
                        <img :src="item.image" alt="" class="new_img"/>
                    </div>
                    <div class="news_content_box">
                        <div class="news_title">{{item.name}}</div>
                        <div class="status">状态：{{item.status==1?'已发布':'草稿'}}</div>
                        <div class="news_content">{{item.menuDescribe}}</div>
                    </div>
                </router-link>
                <button class="update"><router-link :to="{name:'Release',params:{type: item.id}}">编辑</router-link></button>
                <button class="delete" @click="handleDeleteMenu(item.id)">删除</button>
            </div>
        </div>
    </div>
</template>

<script>
import {selMyMenu, selMyMenuImage, delOneMenu} from "../services/menuService";
import Loading from "../components/Loading";
export default {
    inject:['reload'],//注入App里的reload方法
    components: {
        Loading
    },
    data(){
        return{
           myMenu: [],
           isLoading: false
        }
    },
    async created(){
        this.isLoading = true;
        var resp = await selMyMenu(this.$store.state.loginUser.data.id);
        if(resp.data.state==1){
            var myMenu2 = resp.data.data;
            for(var i = 0; i < myMenu2.length; i++){
                var resp2 = await selMyMenuImage(myMenu2[i].id);
                myMenu2[i].image = resp2.data.data;
            }
            this.myMenu = myMenu2;
            this.isLoading = false;
        }
    },
    methods: {
        async handleDeleteMenu(menuid){
            var resp = await delOneMenu(menuid);
            if(resp.data.state==1){
                this.reload();
            }
        }
    }
}
</script>

<style scoped>
.mymenu_center{
    width: 100%;
    /*height: 1350px;*/
}
.news_list{
    position: relative;
    margin-left: 2.8%; 
    width: 94%;
    height: 150px;
    border: 1px solid #fff; 
    border-top: 1px solid #ccc;
    overflow: hidden;
}
.img_box{
    width: 150px;
    height: 120px;
    border: 1px solid #ccc;
    margin: 14px;
    float: left;
}
.new_img{
    width: 150px;
    height: 100px;
    margin-top: 10px;
}
.news_content_box{
    position: absolute;
    margin-left: 180px;
    width: 70%;
    min-width: 830px;
    height: 150px;
    /*border: 1px solid red;*/
    overflow: hidden;
}
.news_title{
    margin-top: 22px;
    margin-left: 8px;
    font-size: 25px;
    color: #ff6767;
}
.status{
    color: #ccc;
    margin-left: 8px;
}
.news_content{
    display: -webkit-box;
    margin: 3px;
    margin-left: 8px;
    width: 98%;
    height: 50px;
	-webkit-line-clamp: 2; /* 这个表示要显示几行 */
	-webkit-box-orient: vertical;
    font-size: 18px;
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
}
a{
    text-decoration: none;
}
.update, .delete{
    position: absolute;
    margin-left: 870px;
    width: 110px;
    height: 30px;
    border: 1px solid #FF4400;
    cursor: pointer;
    outline: none;
}
.update{
    top: 35px;
    background-color: #fff;
    color: #FF4400;
}
.delete{
    top: 85px;
    background-color: #FF4400;
    color: #fff;
}
a{
    color: #FF4400;
}
.loadingBox{
    width: 100%;
    height: 805px;
}
.loading{
    width: 100%;
    height: 40px;
}
</style>