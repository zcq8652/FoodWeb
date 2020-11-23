<template>
    <div class="menu">
        <ul class="menu_ul">
            <li v-for="item in menuList" :key="item.id" @click="handleToMenuDetail(item.id)">
                <div class="menu_img" :style="{
                    'backgroundImage': 'url('+item.image+')'
                }">
                    <div class="demo">{{item.nickname}}</div>
                </div>
                <div class="describe">{{item.name}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        menuList: {
            type: Array
        }
    },
    methods: {
        handleToMenuDetail(menuid){
            this.$router.push({name: "Detail", params: {menu: menuid}});
        }
    }
}
</script>

<style scoped>
.menu{
    width: 1270px;
    height: 100%;
    margin: 0 auto;
}
.menu_ul li{
    display: inline-block;
    width: 300px;
    height: 400px;
    border-radius: 10px;
    list-style: none;
    margin-left: 7.5px;
    margin-right: 7.5px;
    margin-bottom: 15px;
    background-color: #fff;
    box-sizing: border-box;
    cursor: pointer;
}
.menu_img{
    width: 300px;
    height: 300px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: inline-block;
    background-size: 300px auto;
}
.demo{
    margin-top: 275px;
    margin-left: 100px;
    width: 100px;
    height: 50px;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 50px;
    text-align: center;
    line-height: 50px;
}
.describe{
    display: inline-block;
    width: 300px;
    height: 100px;
    font-size: 20px;
    text-align: center;
    line-height: 100px;
}
</style>