<template>
  <div class="searching">
      <div class="input"><input type="text" id="search_input" v-model="str" placeholder=" 菜谱 / 原材料"></div>
      <div class="btn" @click="handleSearch">搜 索</div>
  </div>
</template>

<script>
import {selMenuBySearch} from "../services/menuService";
export default {
    data() {
        return {
            str: "",
            menuList: []
        }
    },
    methods: {
        async handleSearch(){
            var resp = await selMenuBySearch(this.str);
            //console.log(resp);
            if(resp.data.state==1){
                this.menuList = resp.data.data;
                //触发一个事件，但该组件处理不了，传递给父组件处理
                this.$emit("search", this.menuList);
            }else{
                this.$emit("search", []);
            }
        }
    }
}
</script>

<style scoped>
.searching{
    position: relative;
    width: 650px;
    height: 60px;
    border: 3px solid #f40;
    border-radius: 50px;
}
.input{
    position: absolute;
    width: 80%;
    height: 100%;
}
#search_input{
    margin-top: -2px;
    margin-left: -2px;
    width: 100%;
    height: 61px;
    border: 1px solid #f40;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    outline: none;
    font-size: 18px;
    opacity: 0.8;
}
.btn{
    position: absolute;
    top: -1px;
    right: -3px;
    width: 20%;
    height: 100%;
    border: 1px solid #f40;
    background-color: #f40;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    font-size: 22px;
    color: #fff;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
}
</style>