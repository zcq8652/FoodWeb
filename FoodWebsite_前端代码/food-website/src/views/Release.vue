<template>
    <div class="release">
        <div class="blank"></div>
        <div class="loadingBox" v-show="isLoading">
            <div class="loading">
                <Loading/>
            </div>
        </div>
        <div class="content" v-show="!isLoading">
            <div class="make_menu">编辑菜谱</div>
            <input type="hidden" v-model="hiddenValue">
            <div class="release_top">
                <div class="line"></div>
                <div class="save_btn" @click="handleSaveCilck">存为草稿</div>
                <div class="release_btn" @click="handleReleaseClick">发布菜谱</div>
            </div>
            <div class="menu_content">
                <div class="menu_name">
                    <span>菜谱名称 <label>*</label></span><br>
                    <input type="text" id="menuName" placeholder="请输入菜谱名称" v-model="menuName"/>
                </div>
                <div class="menu_province">
                    <span>所属菜系 <label>*</label></span><br>
                    <select id="menuPro" v-model="menuProvince" @change="handleMenuProChange" :style="{color: menuProvince==0 ? '#ccc' : '#000'}">
                        <option value="0" disabled>请选择所属菜系</option>
                        <option v-for="item in menuPro" :key="item.id" :value="item.provinceCode">
                            {{item.provinceName}}
                        </option>
                    </select>
                </div>
                <div class="finished_pic">
                    <span>成品图片（最多3张）<label>*</label></span>
                    <div for="finished_pic_file" class="finished_pic_btn" @click="handleClick">上传成品图</div>
                    <input type="file" id="finished_pic_file" ref="picFile" accept=".jpg, .jpeg, .png" multiple @change="handleFinishedFileChange($event)" v-show="false">
                    <div class="finished_pic_div" v-if="imgUrl.length!=0">
                        <ul>
                            <li v-for="(item, i) in imgUrl" :key="i">
                                <img class="picture" :src="item" :width="img_width[i]" :style="{
                                    marginLeft: img_width[i] > 200 ? -(img_width[i]*200/img_height[i]-200)/2+'px' : 0+'px'
                                }"/>
                                <img src="../assets/images/delIcon.png" alt="" class="delIcon" @click="handledelFinishedImg(i)">
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="menu_describe">
                    <textarea name="" id="menuDescribe" cols="30" rows="8" maxlength="200" placeholder="请输入菜谱描述，最多输入200字" v-model="menuDescribe"></textarea>
                </div>
                <div class="food_ingre">
                    <span>食材明细 <label>*</label></span>
                    <ul class="ingres">
                        <li v-for="(item, i) in ingres.slice(0, 2)" :key="i">
                            <span>{{item.name}}</span>
                            <span @click="isEditGroupName=i"><img src="../assets/images/addI.png" alt="" class="addIngreImg"></span>
                            <div v-for="(ingre, j) in item.ingre" :key="j">
                                <input type="text" placeholder="食材名" class="ingre_name" v-model="ingre.name" @click="handleIngreAdd(i, j)">
                                <input type="text" placeholder="用量" class="ingre_many" v-model="ingre.dosage" @click="handleIngreAdd(i, j)">
                                <span class="delete" @click="handleIngreDel(i, j)" v-if="j!=0"><img src="../assets/images/delete.png" alt=""></span>
                            </div>
                        </li>
                        <li v-for="(item, i) in ingres.slice(2)" :key="i+2"> 
                            <span>{{item.name}}</span>
                            <span @click="isEditGroupName=i+2"><img src="../assets/images/addI.png" alt="" class="addIngreImg"></span>
                            <span @click="isDeleteThisGroup=i+2"><img src="../assets/images/delI.png" alt="" class="delIngreImg"></span>
                            <div v-for="(ingre, j) in item.ingre" :key="j">
                                <input type="text" placeholder="食材名" class="ingre_name" v-model="ingre.name" @click="handleIngreAdd(i+2, j)">
                                <input type="text" placeholder="用量" class="ingre_many" v-model="ingre.dosage" @click="handleIngreAdd(i+2, j)">
                                <span class="delete" @click="handleIngreDel(i+2, j)" v-if="j!=0"><img src="../assets/images/delete.png" alt=""></span>
                            </div>
                        </li>
                    </ul>
                    <div class="addIngreBtn" @click="isEditGroupName=ingres.length">添加食材组</div>
                </div>
                <div class="make_step">
                    <span>做法步骤 <label>*</label></span>
                    <div v-for="(item, i) in makeStep" :key="i">
                        <label class="stepImgBox" :for="`stepImage${i}`">
                            <span class="sib">
                                <img :src="item.imageUrl" alt="" class="StepImgCover" v-if="item.imageUrl">
                                <label v-if="!item.imageUrl">
                                    <img src="../assets/images/addStepImg.png" alt="" class="addStepImg">
                                    <span class="addSteptxt1">点击上传步骤图</span><br>
                                    <span class="addSteptxt2">（可不填）</span>
                                </label>
                            </span>
                        </label>
                        <input type="file" :id="`stepImage${i}`" accept=".jpg, .jpeg, .png" @change="handleAddStepImgChange($event, i)" v-show="false">
                        <span class="stepDes">
                            <textarea name="" id="stepDescribe" cols="30" rows="10" maxlength="200" placeholder="请输入步骤说明，最多输入200字" v-model="item.describe"></textarea>
                        </span>
                        <span class="stepBtn">
                            <span class="delStepBtn" @click="handleDelStepClick(i)" v-if="i>1">
                                <img src="../assets/images/delete.png" alt="" class="delStep">
                                <span class="delSteptxt">删除本步</span>
                            </span>
                            <span class="addStepBtn" @click="handleAddStepClick(i)">
                                <img src="../assets/images/addStep.png" alt="" class="addStep">
                                <span class="addSteptxt">添加一步</span>
                            </span>
                        </span>
                    </div>
                </div>
                <div class="small_key">
                    <span>小窍门</span><br>
                    <textarea name="smallKey" id="smallKey" cols="30" rows="10" maxlength="100" placeholder="最多输入100字" v-model="smallKey"></textarea>
                </div>
            </div>
        </div>
        <div class="sleep" v-show="isEditGroupName!=undefined||isDeleteThisGroup!=undefined||promptShow">
        </div>
        <div class="edit_groupname" v-show="isEditGroupName!=undefined">
            <div class="edit_groupname_txt">
                <span>编辑组名</span>
                <img src="../assets/images/del3.png" alt="" class="exit_groupname_img" @click="isEditGroupName=undefined">
            </div>
            <div class="edit_groupname_content">
                <span>食材组组名：</span>
                <input type="text" v-model="exitGroupName">
                <div class="nullPrompt" v-show="exitGroupName==''">食材组组名不能为空</div>
                <button class="sure_btn" @click="handleSureClick">确定</button>
                <button class="cancel_btn" @click="handleCancelClick">取消</button>
            </div>
        </div>
        <div class="del_thisgroup" v-show="isDeleteThisGroup!=undefined">
            <span>食材组内的食材将被清空，确定删除吗？</span>
            <button class="sure_btn" @click="handleDelSureClick">确定</button>
            <button class="cancel_btn" @click="handleDelCancelClick">取消</button>
        </div>
        <div class="prompt_div" v-show="promptShow">必填信息没有填写完整</div>
    </div>
</template>

<script>
import Center from "../components/Center";
import Loading from "../components/Loading";
import {getAllProvince} from "../services/provinceService";
import {addMenu, addMenuImage, addIngreType, addMenuIngredient, addMenuStep, selOneMenu, delOneMenu, updMenu, updMenuImage, updIngreType, updMenuIngredient, updMenuStep, updMenuStep2, delMenuImage, delIngreType, delIngredient, delMenuStep} from "../services/menuService";
export default {
    inject:['reload'],//注入App里的reload方法
    components: {
        Loading
    },
    data(){
        return{
            menuName: "",//菜谱名
            menuPro: [],
            menuProvince: 0,//所属菜系
            imgUrl: [],
            img_width: [],
            img_height: [],
            finishedImages: [],//完成图
            menuDescribe: "",//菜谱描述
            ingres: [//食材类别以及食材
                {
                    name:"主料", 
                    ingre:[{name: "", dosage: "", id: ""}]
                },
                {
                    name:"辅料",
                    ingre:[{name: "", dosage: "", id: ""}]
                },
                {
                    name: "调料",
                    ingre:[{name: "", dosage: "", id: ""}]
                }
            ],
            deleteShow: 0,
            makeStep: [//菜谱步骤
                {imageUrl: "", describe: "", imageFile: null},
                {imageUrl: "", describe: "", imageFile: null},
                {imageUrl: "", describe: "", imageFile: null}
            ],
            smallKey: "",//小窍门
            isEditGroupName: undefined,
            exitGroupName: "",
            isDeleteThisGroup: undefined,
            promptShow: false,
            isLoading: false,
            img_ids: [],
            ingres_ids: [],
            step_ids: []
        }
    },
    computed: {
        hiddenValue(){
            return this.$route.params.type;
        }
    },
    watch: {
        hiddenValue(){
            this.reload();
        }
    },
    async created(){
        this.isLoading = true;
        //获取省份信息
        var resp = await getAllProvince();
        if(resp.data.state==1){
              this.menuPro = resp.data.data;
            //如果点击的编辑按钮进入该页面，则进行数据回填
            if(this.$route.params.type != 0){
                var resp2 = await selOneMenu(this.$route.params.type);
                console.log(resp2);
                this.menuName = resp2.data.data.name;
                this.menuProvince = resp2.data.data.provinceCode;
                for(var i = 0; i < resp2.data.data.menuImages.length; i++){
                    this.imgUrl.push(resp2.data.data.menuImages[i].image);
                    this.finishedImages.push({image: null, id: resp2.data.data.menuImages[i].id+''});
                    this.img_ids.push(resp2.data.data.menuImages[i].id+'');
                }
                this.menuDescribe = resp2.data.data.menuDescribe;
                for(var j = 0; j < resp2.data.data.ingreTypes.length; j++){
                    this.ingres[j].name = resp2.data.data.ingreTypes[j].name;
                    this.ingres_ids.push(resp2.data.data.ingreTypes[j].id);
                }
                for(var x = 0; x < resp2.data.data.menuIngredients.length; x++){
                    for(var y = 0; y < resp2.data.data.menuIngredients[x].length; y++){
                        if(y > 0){
                            this.ingres[x].ingre.push({name: resp2.data.data.menuIngredients[x][y].name, dosage: resp2.data.data.menuIngredients[x][y].dosage, id:""});
                        }else{
                            this.ingres[x].ingre[y].name = resp2.data.data.menuIngredients[x][y].name;
                            this.ingres[x].ingre[y].dosage = resp2.data.data.menuIngredients[x][y].dosage;
                        }
                    }
                }
                for(var z = 0; z < resp2.data.data.menuSteps.length; z++){
                    this.step_ids.push(resp2.data.data.menuSteps[z].id);
                    if(z > 2){
                        this.makeStep.push({imageUrl: resp2.data.data.menuSteps[z].image, describe: resp2.data.data.menuSteps[z].stepDescribe, imageFile: null});
                    }else{
                        this.makeStep[z].imageUrl = resp2.data.data.menuSteps[z].image;
                        this.makeStep[z].describe = resp2.data.data.menuSteps[z].stepDescribe;
                    }
                }
                this.smallKey = resp2.data.data.menuKey;
                this.isLoading = false;
            }else{
                this.isLoading = false;
            }
        }
    },
    methods: {
        handleClick(){
            this.$refs.picFile.dispatchEvent(new MouseEvent('click'));
        },
        handleFinishedFileChange(event){
            var files = event.target.files;
            //var fileArr = [];
            var that = this;
            var length = files.length;
            if(files.length > 3){
                length = 3;
            }
            var fiLength = 0;
            for(var i = 0; i < length; i++){
                //fileArr.push(files[i]);
                fiLength = that.finishedImages.length;
                if(fiLength < 3){
                    that.finishedImages.push({image: files[i], id: ''});
                }
                //console.log(that.finishedImages.length);
            }
            for(var j = fiLength; j < that.finishedImages.length; j++){
                var reader = new FileReader();
                reader.readAsDataURL(that.finishedImages[j].image);
                reader.onload = function(e) {
                    that.imgUrl.push(this.result);
                    var image = new Image();
                    image.src = this.result;
                    image.onload = function(e){
                        that.img_width.push(image.width);
                        that.img_height.push(image.height);
                        //console.log(that.img_width[0]);
                        //console.log(that.img_height[0]);
                    }
                }
            }

        },
        handledelFinishedImg(i){
            this.imgUrl.splice(i, 1);
            this.finishedImages.splice(i, 1);
            //console.log(this.finishedImages.length);
        },
        handleIngreAdd(i, j){
            if(j==this.ingres[i].ingre.length-1){
                this.ingres[i].ingre.push({name:"", dosage:"", id:""});
            }
        },
        handleIngreDel(i, j){
            this.ingres[i].ingre.splice(j,1);
        },
        handleSureClick(){
            if(this.isEditGroupName == this.ingres.length){
                if(this.exitGroupName!=""){
                    this.ingres.push({
                        name: this.exitGroupName, 
                        ingre:[{name: "", dosage: "", id: ""}]
                    })
                    this.isEditGroupName = undefined;
                }
            }else{
                if(this.exitGroupName!=""){
                    this.ingres[this.isEditGroupName].name = this.exitGroupName;
                    this.isEditGroupName = undefined;
                }
            }
        },
        handleCancelClick(){
            this.exitGroupName = "";
            this.isEditGroupName = undefined;
        },
        handleDelSureClick(){
            this.ingres.splice(this.isDeleteThisGroup, 1);
            this.isDeleteThisGroup = undefined;
        },
        handleDelCancelClick(){
            this.isDeleteThisGroup = undefined;
        },
        handleAddStepImgClick(){
            //this.$refs.stepImage.dispatchEvent(new MouseEvent('click'));
        },
        handleAddStepImgChange(e, i){
            var that = this;
            var file = e.target.files[0];
            that.makeStep[i].imageFile = file;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
                that.makeStep[i].imageUrl = this.result;
            }
        },
        handleDelStepClick(i){
            this.makeStep.splice(i, 1);
        },
        handleAddStepClick(i){
            this.makeStep.splice(i+1, 0, {imageUrl: "", describe: ""});
        },
        handleMenuProChange(){
            //console.log(this.menuProvince);
        },
        handleSaveCilck(){//存为草稿
            var that = this;
            that.isLoading = true;
            if(this.$route.params.type == 0){
                that.handleSaveAndRelease(0);
            }else{
               that.handleUpdSaveAndRelease(0);
            }
        },
        handleReleaseClick(){//发布菜谱
            var that = this;
            that.isLoading = true;
             if(this.$route.params.type == 0){
                that.handleSaveAndRelease(1);
            }else{
                that.handleUpdSaveAndRelease(1);
            }
        },
        //添加菜谱
        async addMenu(menuData){
            var that = this;
            var menuresp = await addMenu(menuData);
            //console.log(menuresp);
            if(menuresp.data.state!=0){//添加菜谱成功
                for(var i = 0; i < that.finishedImages.length; i++){
                    var formData = new FormData();
                    formData.append("finishedImg", that.finishedImages[i].image);
                    formData.append("menuId", menuresp.data.state);
                    var menuImageResp = await addMenuImage(formData);
                    //console.log(menuImageResp);
                }
                
                for(var j = 0; j < that.ingres.length; j++){
                    var ingreTypeResp = await addIngreType({menuId:menuresp.data.state,name:that.ingres[j].name});
                    //console.log(ingreTypeResp);
                    if(ingreTypeResp.data.state!=0){//添加菜谱食材类别成功
                        for(var x = 0; x < that.ingres[j].ingre.length; x++){
                            var menuIngreResp = await addMenuIngredient({typeId:ingreTypeResp.data.state,name:that.ingres[j].ingre[x].name,dosage:that.ingres[j].ingre[x].dosage});
                            //console.log(menuIngreResp);
                        }
                    }
                }
                for(var y = 0; y < that.makeStep.length; y++){
                    var menuStep = new FormData();
                    menuStep.append("menuId", menuresp.data.state);
                    menuStep.append("stepImg", that.makeStep[y].imageFile);
                    menuStep.append("stepDescribe", that.makeStep[y].describe);
                    menuStep.append("number", y+1);
                    var munuStepResp = await addMenuStep(menuStep);
                    //console.log(munuStepResp);
                }
                if(menuImageResp.data.state!=0 && ingreTypeResp.data.state!=0 && menuIngreResp.data.state!=0 && munuStepResp.data.state!=0){
                    this.$router.push({name: "Personal",params: {checked: 1}});
                }
            }
        },
        //编辑菜谱
        async updMenu(menuData){
            var that = this;
            var menuresp = await updMenu(menuData);
            console.log(menuresp);
            if(that.$route.params.type!=0){//修改菜谱成功
                //修改菜谱完成图
                var fImgAttr = [];
                for(var i = 0; i < that.finishedImages.length; i++){
                    if(that.finishedImages[i].id == ''){
                        fImgAttr.push(that.finishedImages[i]);
                    }
                    for(var r = 0; r < that.img_ids.length; r++){
                        if(that.finishedImages[i].id == that.img_ids[r]){
                            that.img_ids.splice(r, 1);
                        }
                    }
                }
                for(var j = 0; j < fImgAttr.length; j++){
                    if(that.img_ids[j]){
                        fImgAttr[j].id = that.img_ids[j];
                    }
                }
                for(var x = 0; x < fImgAttr.length; x++){
                    if(fImgAttr[x].id != ''){
                        var formData = new FormData();
                        formData.append("id", fImgAttr[x].id);
                        formData.append("finishedImg", fImgAttr[x].image);
                        formData.append("menuId", that.$route.params.type);
                        var menuImageResp1 = await updMenuImage(formData);
                        console.log(menuImageResp1);
                    }else{
                        var formData = new FormData();
                        formData.append("finishedImg", fImgAttr[x].image);
                        formData.append("menuId", that.$route.params.type);
                        var menuImageResp2 = await addMenuImage(formData);
                    }
                }
                if(that.img_ids.length > fImgAttr.length){
                    for(var y = fImgAttr.length; y < that.img_ids.length; y++){
                        var menuImageResp3 = await delMenuImage(that.img_ids[y]);
                    }
                }
                
                //删除菜谱食材类别
                var ingreTypeResp1 = await delIngreType(that.$route.params.type);
                console.log(ingreTypeResp1);
                //删除菜谱食材
                for(var b = 0; b < that.ingres_ids.length; b++){
                    var menuIngreResp1 = await delIngredient(that.ingres_ids[b]);
                    console.log(menuIngreResp1);
                }
                //添加菜谱食材类别
                for(var z = 0; z < that.ingres.length; z++){
                    var ingreTypeResp2 = await addIngreType({menuId:that.$route.params.type,name:that.ingres[z].name});
                    console.log(ingreTypeResp2);
                    if(ingreTypeResp2.data.state!=0){//添加菜谱食材类别成功
                        for(var a = 0; a < that.ingres[z].ingre.length; a++){
                            var menuIngreResp2 = await addMenuIngredient({typeId:ingreTypeResp2.data.state,name:that.ingres[z].ingre[a].name,dosage:that.ingres[z].ingre[a].dosage});
                            console.log(menuIngreResp2);
                        }
                    }
                }
                //编辑菜谱步骤
                for(var d = 0; d < that.step_ids.length; d++){
                    var menuStep = new FormData();
                    menuStep.append("id", that.step_ids[d]);
                    menuStep.append("menuId", that.$route.params.type);
                    menuStep.append("stepDescribe", that.makeStep[d].describe);
                    menuStep.append("number", d+1);
                    if(that.makeStep[d].imageFile != null){
                        menuStep.append("stepImg", that.makeStep[d].imageFile);
                        var munuStepResp1 = await updMenuStep(menuStep);
                        console.log(munuStepResp1);
                    }else{
                        //不修改图片
                        var munuStepResp4 = await updMenuStep2(menuStep);
                        console.log(munuStepResp4);
                    }
                }
                if(that.step_ids.length <= that.makeStep.length){
                    for(var e = that.step_ids.length; e < that.makeStep.length; e++){
                        var menuStep2 = new FormData();
                        menuStep2.append("menuId", that.$route.params.type);
                        menuStep2.append("stepImg", that.makeStep[e].imageFile);
                        menuStep2.append("stepDescribe", that.makeStep[e].describe);
                        menuStep2.append("number", e+1);
                        var munuStepResp2 = await addMenuStep(menuStep2);
                        console.log(munuStepResp2);
                    }
                }else{
                    for(var f = that.makeStep.length; f < that.step_ids.length; f++){
                        var munuStepResp3 = await delMenuStep(that.step_ids[f]);
                        console.log(munuStepResp3);
                    }
                }
                this.$router.push({name: "Personal",params: {checked: 1}});
            }
        },
        //处理添加菜谱的方法，为了减少冗余代码
        handleSaveAndRelease(status2){
            var that = this;
            if(that.menuName!="" && that.menuProvince!=0 && that.finishedImages.length>0 && that.ingres[0].ingre[0].name!="" &&
                that.ingres[1].ingre[0].name!="" && that.makeStep[0].imgUrl!="" && that.makeStep[0].describe!="" && that.makeStep[1].imgUrl!="" && that.makeStep[1].describe!=""){
                var menuData = {
                    menuName: that.menuName,
                    menuProvince: that.menuProvince,
                    menuDescribe: that.menuDescribe,
                    smallKey: that.smallKey,
                    status: status2,
                    uid: this.$store.state.loginUser.data.id
                };
                that.addMenu(menuData);
            }else{
                that.promptShow = true;
                setTimeout(function(){
                    that.promptShow = false;
                }, 2000);
            }
        },
        //处理编辑菜谱的方法
        handleUpdSaveAndRelease(status2){
            var that = this;
            if(that.menuName!="" && that.menuProvince!=0 && that.finishedImages.length>0 && that.ingres[0].ingre[0].name!="" &&
                that.ingres[1].ingre[0].name!="" && that.makeStep[0].imgUrl!="" && that.makeStep[0].describe!="" && that.makeStep[1].imgUrl!="" && that.makeStep[1].describe!=""){
                var menuData = {
                    menuId: that.$route.params.type,
                    menuName: that.menuName,
                    menuProvince: that.menuProvince,
                    menuDescribe: that.menuDescribe,
                    smallKey: that.smallKey,
                    status: status2,
                    uid: this.$store.state.loginUser.data.id
                };
                that.updMenu(menuData);
            }else{
                that.promptShow = true;
                setTimeout(function(){
                    that.promptShow = false;
                }, 2000);
            }
        }
    }
}
</script>

<style scoped>
.release{
    width: 100%;
    background-color: #EFEFEF;
}
.blank{
    margin-left: 5%;
    width: 90%;
    height: 80px;
    background-color: #fff;
}
.loadingBox{
    margin-left: 5%;
    width: 90%;
    height: 100vh;
    background-color: #fff;
}
.loading{
    position: absolute;
    top: 10vh;
    left: -3px;
    width: 100%;
    height: 40px;
}
.content{
    margin-left: 5%;
    width: 90%;
    height: 100%;
    background-color: #fff;
}
.make_menu{
    margin-left: 50px;
    font-size: 25px;
    color: #333;
}
.release_top{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
}
.line{
    display: inline-block;
    margin-top: 10px;
    margin-left: 50px;
    width: 78%;
    height: 0px;
    border-top: 1px solid #efefef;
}
.save_btn, .release_btn{
    display: inline-block;
    width: 110px;
    height: 30px;
    border: 1px solid #000;
    margin-right: 10px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    border: 1px solid #FF4400;
}
.save_btn{
    color: #FF4400;
}
.release_btn{
   background-color: #FF4400;
   color: #fff;
}
.menu_content{
    position: relative;
    margin-top: 30px;
    width: 100%;
    overflow: hidden;
}
.menu_name span, .menu_province span, .finished_pic span, .food_ingre span, .make_step span, .small_key span{
    margin-left: 50px;
    color: #888;
}
.menu_name #menuName{
    margin-top: 8px;
    margin-left: 50px;
    width: 80%;
    height: 35px;
    border: 1px solid #ccc;
    margin-bottom: 30px;
    font-size: 16px;
    outline: none;
    min-width: 700px;
}
#menuPro{
    margin-top: 8px;
    margin-left: 50px;
    margin-bottom: 30px;
    width: 380px;
    height: 40px;
    border: 1px solid #ccc;
    outline: none;
    color: #ccc;
    font-size: 16px;
}
label{
    color: #f40;
}
.finished_pic .finished_pic_btn, .addIngreBtn{
    margin-top: 8px;
    margin-left: 50px;
    width: 110px;
    height: 35px;
    border: 1px solid #c9c890;
    background-color: #fcfce3;
    border-radius: 3px;
    text-align: center;
    line-height: 35px;
    color: #333;
    cursor: pointer;
}
#finished_pic_file{
    position: absolute;
    margin-top: -30px;
    margin-left: 180px;
}
.finished_pic_div{
    margin-top: 8px;
    margin-left: 50px;
    width: 670px;
    height: 200px;
    overflow: hidden;
}
.finished_pic_div li{
    position: relative;
    width: 200px;
    height: 200px;
    float: left;
    list-style: none;
    margin-right: 20px;
    overflow: hidden;
    text-align: center;
}
.picture{
    height: 100%;
    width: auto;
    vertical-align: middle;
    float: left;
}
.menu_describe #menuDescribe, .small_key #smallKey{
    margin-top: 30px;
    margin-left: 50px;
    width: 80%;
    border: 1px solid #ccc;
    outline: none;
    font-size: 16px;
    resize: none;
    min-width: 700px;
}
#menuDescribe::-webkit-input-placeholder{
    font-size: 23px;
    font-family:"微软雅黑";
    color: #ccc;
}
.food_ingre{
    margin-top: 30px;
}
.ingres li{
    margin-top: 20px;
    list-style: none;
}
.ingres li span{
    font-size: 21px;
    color: #333;
}
.ingres li div{
    position: relative;
    width: 47%;
    height: 38px;
    margin-left: 50px;
    min-width: 700px;
    border: 1px solid #ccc;
    margin-top: 10px;
    margin-bottom: 10px;
}
.ingres li div input{
    position: absolute;
    top: 0px;
    width: 40%;
    height: 35px;
    border: 1px solid #fff;
    font-size: 16px;
    outline: none;
}
::-webkit-input-placeholder{
    color: #ccc;
}
.ingres li div .ingre_name{
    width: 53% !important;
    border-right: 1px solid #ccc;
}
.ingre_many{
    left: 54%;
}
.delete{
    position: absolute;
    margin-top: -1px;
    right: -1px;
    display: inline-block;
    width: 38px;
    height: 38px;
    cursor: pointer;
    border-left: 1px solid #ccc;
}
.delete img{
    margin: 5px 4px;
    width: 28px;
}
.delete:hover{
    border: 1px solid #c9c890;
    background-color: #fcfce3;
}
.addIngreImg{
    position: absolute;
    margin-top: 3px;
    margin-left: -40px;
    width: 23px;
    cursor: pointer;
}
.delIngreImg{
    position: absolute;
    margin-top: 7px;
    margin-left: -50px;
    width: 18px;
    cursor: pointer;
}
.make_step{
    margin-top: 30px;
    width: 78%;
    overflow: hidden;
    box-sizing: border-box;
    white-space: nowrap;
    min-width: 1100px;
}
.stepImgBox{
    position: relative;
    margin-top: 8px;
    margin-left: 50px;
    display: inline-block;
    width: 400px;
    height: 300px;
    border: 1px solid #ccc;
    background-color: #f7f7f7;
    cursor: pointer;
}
.stepDes #stepDescribe{
    margin-top: 8px;
    margin-left: -35px;
    width: 500px;
    height: 300px;
    border: 1px solid #ccc;
    resize: none;
    outline: none;
    font-size: 16px;
}
.stepDes #stepDescribe::-webkit-input-placeholder{
    font-size: 23px;
    font-family:"微软雅黑";
    color: #ccc;
}
.sib{
    position: absolute;
    left: -52px;
    margin-top: 20px;
    display: inline-block;
    width: 401px;
    height: 260px;
    /*border: 1px solid #ccc;*/
    overflow: hidden;
    text-align: center;
}
.StepImgCover{
    width: auto;
    height: 260px;
    margin-left: 2px;
}
.sib .addStepImg{
    margin-top: 50px;
    width: 36px;
}
.addSteptxt1{
    position: absolute;
    display: inline-block;
    font-size: 20px;
    margin-top: 100px;
    left: 75px;
    color: #333;
}
.addSteptxt2{
    position: absolute;
    margin-top: 40px;
    left: 103px;
    display: inline-block;
}
.stepBtn{
    display: inline-block;
    position: absolute;
    left: 890px;
    width: 180px;
    height: 300px;
}
.delStepBtn, .addStepBtn{
    position: absolute;
    top: 8px;
    display: inline-block;
    width: 110px;
    height: 30px;
    border: 1px solid #ccc;
    cursor: pointer;
}
.delStepBtn{
    top: 50px;
}
.delStep, .addStep{
    margin-top: 2px;
    margin-left: 2px;
    width: 25px;
}
.addStep{
    width: 31px;
    height: 31px;
    margin-top: -0.5px;
    margin-left: -1px;
    background-color: #ff6767;
}
.delSteptxt, .addSteptxt{
    position: absolute;
    left: -20px;
    display: inline-block;
    width: 80px;
    height: 30px;
    border-left: 1px solid #ccc;
    text-align: center;
    line-height: 30px;
    color: #ccc !important;
}
.delStepBtn:hover{
    border: 1px solid #c9c890;
    background-color: #fcfce3;
}
.addStepBtn:hover{
    border: 1px solid #c9c890;
    background-color: #fcfce3;
}
.sleep{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #EFEFEF;
    opacity: 0.7;
}
.edit_groupname, .del_thisgroup{
    position: fixed;
    top: 300px;
    left: 35%;
    width: 550px;
    height: 200px;
    background-color: #fff;
}
.edit_groupname_txt{
    width: 100%;
    height: 50px;
    background-color: #ff6767;
}
.edit_groupname_txt span{
    display: inline-block;
    width: 120px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 21px;
    color: #fff;
}
.edit_groupname_content{
    width: 100%;
    height: 150px;
}
.edit_groupname_content span{
    display: inline-block;
    margin-top: 30px;
    margin-left: 20px;
    font-size: 18px;
    color: #333;
}
.edit_groupname_content input{
    width: 310px;
    height: 35px;
    border: 1px solid #ccc;
    outline: none;
}
.sure_btn, .cancel_btn{
    margin-top: 15px;
    width: 130px;
    height: 40px;
    cursor: pointer;
    outline: none;
}
.sure_btn{
    border: 1px solid #ff6767;
    background-color: #ff6767;
    font-size: 18px;
    color: #fff;
    border-radius: 6px;
    margin-left: 130px;
}
.cancel_btn{
    border: 1px solid #ccc;
    background-color: #fff;
    font-size: 18px;
    color: #333;
    border-radius: 6px;
    margin-left: 20px;
}
.nullPrompt{
    margin-top: 2px;
    margin-left: 198px;
    color: #f40;
}
.exit_groupname_img{
    position: absolute;
    top: 14px;
    right: 20px;
    width: 25px;
    cursor: pointer;
}
.del_thisgroup span{
    display: inline-block;
    margin-top: 50px;
    margin-left: 95px;
    font-size: 20px;
    color: #333;
}
.small_key span{
    display: inline-block;
    margin-top: 30px;
}
.small_key #smallKey{
    margin-top: 10px;
    margin-bottom: 50px;
}
#smallKey::-webkit-input-placeholder{
    font-size: 23px;
    font-family:"微软雅黑";
    color: #ccc;
}
.delIcon{
    position: absolute;
    right: 0;
    width: 30px;
    height: 30px;
    cursor: pointer;
}
.prompt_div{
    position: fixed;
    top: 300px;
    left: 42%;
    width: 250px;
    height: 50px;
    border: 1px solid #c9c890;
    font-size: 18px;
    text-align: center;
    line-height: 50px;
    border-radius: 6px;
    background-color: #fcfce3;
    color: #333;
}
</style>