<template>
    <div class="MenuDetail">
        <div class="MenuDetailTop"></div>
        <div class="loading" v-show="isLoading">
            <Loading/>
        </div>
        <div class="MenuDetailCenter" v-show="!isLoading">
            <div class="center_left">
                <img :src="item.image" alt="" v-for="(item, i) in menu.menuImages" :key="i">
            </div>
            <div class="center_right">
                <div class="center_right_content">
                    <div class="menu_title">{{menu.name}}</div>
                    <div class="menu_describe" v-show="menu.menuDescribe!=''"><span class="describe_icon">“</span>{{menu.menuDescribe}}<span class="describe_icon">”</span></div>
                    <div class="menu_ingres">
                        <div class="menu_ingres_tit"><div class="demo"></div><span> 食材明细</span></div>
                        <div class="menu_ingre" v-for="item in menu.ingreTypes" :key="item.id">
                            <div class="menu_group_name">{{item.name}}</div>
                            <div class="menu_ingre_name" v-for="(item2, i) in menu.menuIngredients" :key="i">
                                <div v-for="item3 in item2" :key="item3.id" v-show="item3.typeId == item.id">
                                    <span class="ingre_name">{{item3.name}}</span><br>
                                    <span class="ingre_many">{{item3.dosage}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="make_methods">
                        <div class="make_methods_tit"><div class="demo"></div><span> 做法步骤</span></div>
                        <div class="every_step" v-for="item in menu.menuSteps" :key="item.id">
                            <img :src="item.image" alt="">
                            <span class="step_des"><div class="stepdemo">{{item.number}}</div>{{item.stepDescribe}}</span>
                        </div>
                    </div>
                    <div class="make_key" v-show="menu.menuKey!=''">
                        <div class="make_key_tit"><div class="demo"></div><span>小窍门</span></div>
                        <span class="key_des">{{menu.menuKey}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="MenuDetailBottom">
            <Bottom/>
        </div>
    </div>
</template>

<script>
import Bottom from "../components/Bottom";
import {selOneMenu} from "../services/menuService";
import Loading from "../components/Loading";
export default {
    components: {
        Bottom,
        Loading
    },
    data(){
        return {
            menu: {},
            isLoading: false
        }
    },
    async created(){
        this.isLoading = true;
        var resp = await selOneMenu(this.$route.params.menu);
        console.log(resp);
        if(resp.data.state==1){
            this.menu = resp.data.data;
            this.isLoading = false;
        }
    }
}
</script>

<style scoped>
.MenuDetail{
    margin-top: 50px;
    width: 100%;
}
.MenuDetailTop{
    position: relative;
    margin-left: 10%;
    width: 80%;
    height: 80px;
}
.MenuDetailCenter{
    width: 80%;
    margin-left: 10%;
    border: 1px solid #fff;
    min-width: 1330px;
}
.center_left{
    width: 30%;
    float: left;
    min-width: 400px;
}
.center_left img{
    width: 100%;

}
.center_right{
    margin-left: 30%;
    width: 70%;
    min-width: 900px;
}
.center_right_content{
    margin-left: 30px;
}
.menu_title{
    width: 100%;
    height: 100px;
    font-size: 38px;
    font-weight: bold;
    line-height: 100px;
    color: #333;
}
.menu_describe{
    font-size: 20px;
}
.describe_icon{
    display: inline-block;
    font-family: "楷体";
    font-size: 50px;
    color: #ccc;
    margin-bottom: 16px;
}
.menu_ingres_tit span, .make_methods_tit span, .make_key_tit span{
    font-size: 24px;
    color: #ff6767;
}
.demo{
    margin-top: 3px;
    width: 13px;
    height: 13px;
    border: 8px solid #ff6767;
    border-radius: 50px;
    float: left;
    margin-right: 10px;
}
.menu_ingre{
    width: 99%;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin-top: 20px;
    box-sizing: border-box;
    min-height: 110px;
}
.menu_group_name{
    margin-top: -15px;
    margin-left: 50px;
    width: 80px;
    height: 30px;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    background-color: #fff;
}
.menu_ingre_name{
    width: 100%;
}
.menu_ingre_name div{
    display: inline-block;
    width: 21%;
    min-height: 40px;
    text-align: center;
    margin-top: 20px;
    margin-left: 2%;
    margin-right: 2%;
    margin-bottom: 20px;
    word-wrap:break-word;/*支持IE，chrome，FF*/
}
.ingre_name{
    font-size: 25px;
    color: #333;
}
.ingre_many{
    color: rgb(197, 192, 192);
}
.make_methods{
    width: 100%;
    margin-top: 30px;
}
.every_step{
    position: relative;
    margin-top: 15px;
    width: 100%;
    height: auto;
}
.every_step img{
    display: inline-block;
    width: 30%;
    height: auto;
}
.step_des{
    position: absolute;
    top: 10px;
    right: 20px;
    display: inline-block;
    width: 65%;
    height: 160px;
    font-size: 25px;
    word-wrap:break-word;/*支持IE，chrome，FF*/
}
.stepdemo{
    width: 45px;
    height: 45px;
    border: 1px solid #ccc;
    font-size: 26px;
    border-radius: 50px;
    text-align: center;
    line-height: 45px;
}
.make_key{
    margin-top: 30px;
    width: 100%;
}
.key_des{
    width: 100%;
    margin-top: 10px;
    display: inline-block;
    font-size: 20px;
    word-wrap:break-word;/*支持IE，chrome，FF*/
    margin-bottom: 30px;
}
</style>