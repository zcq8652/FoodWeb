<template>
    <div class="listing">
        <div class="listing_back"></div>
        <img src="../assets/images/txt.png" class="listing_img">
        <ul class="place_list">
            <li v-for="item in place" :key="item.id" @mouseenter="enterChange(item.id)" @mouseleave="leaveChange()" :style="{backgroundColor: isEnter==item.id ? '#333' : ''}">
                <router-link :to="{name:'Local',params:{code: item.provinceCode, name: item.provinceName}}">
                    <img src="../assets/images/food.png" class="food_icon">
                    <span class="place">{{item.provinceName}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import {getAllProvince} from "../services/provinceService";
export default {
    data(){
        return{
            place: [],
            isEnter: 0
        }
    },
    async created(){
        var resp = await getAllProvince();
        if(resp.data.state==1){
            this.place = resp.data.data;
        }
    },
    methods:{
        enterChange(index){
            this.isEnter = index;
        },
        leaveChange(){
            this.isEnter = 0;
        }
    }
}
</script>

<style scoped>
.listing{
    position: relative;
    width: 350px;
    height: 100vh;
}
.listing_back{
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid #333;
    background-color: #333;
    opacity: 0.5;
}
.listing_img{
    position: absolute;
    top: 25px;
    left: 25px;
    width: 300px;
}
.place_list{
    position: absolute;
    top: 184px;
    width: 100%;
    height: 600px;
    overflow: auto;
}
/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
    width: 10px; /*对垂直流动条有效*/
    height: 10px; /*对水平流动条有效*/
}
/*定义滚动条的轨道颜色、内阴影及圆角*/
::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: rgb(82, 78, 78);
    border-radius: 3px;
    opacity: 0.5;
}
/*定义滑块颜色、内阴影及圆角*/
::-webkit-scrollbar-thumb{
    border-radius: 7px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #000;
}
.place_list li{
    width: 100%;
    height: 41px;
    border-bottom: 1px solid #333;
    list-style: none;
    color: #fff;
    font-size: 20px;
    font-family: "仿宋";
    font-weight: bolder;
}
.food_icon{
    margin-left: 40px;
    width: 40px;
    float: left;
}
.place{
    display: block;
    width: 70%;
    height: 100%;
    line-height: 41px;
    margin-left: 100px;
    cursor: pointer;
}
a{
    text-decoration: none;
    color: #fff;
}
</style>