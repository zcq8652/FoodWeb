<template>
    <div class="container">
        <div class="content1">
            <div class="content1_bann">
                <Banner :banners="banners"/>
            </div>
            <div class="content1_list">
                <Listing/>
            </div>
            <div class="content1_sear">
                <Searching @search="handleSearch"/>
            </div>
        </div>
        <div class="content2">
            <MenuShow :searchMenu="searchMenu"/>
            <Bottom/>
        </div>
    </div>
</template>

<script>
import Banner from "../components/Banner";
import Searching from "../components/Searching";
import Listing from "../components/Listing";
import MenuShow from "../components/MenuShow";
import Bottom from "../components/Bottom";
export default {
    components: {
        Banner,
        Searching,
        Listing,
        MenuShow,
        Bottom
    },
    data(){
        return{
            banners: [
                { url: require("../assets/images/timg1.jpg"), link: "#"},
                { url: require("../assets/images/timg2.jpg"), link: "#"},
                { url: require("../assets/images/timg7.jpg"), link: "#"},
                { url: require("../assets/images/timg4.jpg"), link: "#"},
                { url: require("../assets/images/timg5.jpg"), link: "#"},
                { url: require("../assets/images/timg9.jpg"), link: "#"}
            ],
            searchMenu: []
        }
    },
    methods: {
        handleSearch(menuList){
            this.searchMenu = menuList;
        }
    }
}
</script>

<style scoped>
.container{
    position: relative;
    width: 100%;
}
.content1{
    position: absolute;
    width: 100%;
    height: 100vh;
}
.content1_bann{
    position: absolute;
    width: 100%;
}
.content1_list{
    display: inline-block;
    margin-left: 10%;
}
.content1_sear{
    display: inline-block;
    margin-left: 400px;
    margin-bottom: 150px;
}
.content2{
    position: absolute;
    top: 100vh;
    left: 0;
    width: 100%;
    height: 1380px;
}
</style>