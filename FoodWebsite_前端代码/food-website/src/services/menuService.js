//关于menu相关的请求
import axios from "axios";
import qs from "qs";
//添加菜谱
export async function addMenu(menuData){
    var resp = await axios.post("/FoodWebsite/menu/addMenu", qs.stringify({
            name: menuData.menuName,
            provinceCode: menuData.menuProvince,
            menuDescribe: menuData.menuDescribe,
            menuKey: menuData.smallKey,
            status: menuData.status,
            uid: menuData.uid
        })
    );
    return resp;
}
//添加菜谱完成图
export async function addMenuImage(formData){
    var resp = await axios.post("/FoodWebsite/menu/addMenuImage", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
    return resp;
}
//添加菜谱食材类别
export async function addIngreType(ingreType){
    var resp = await axios.post("/FoodWebsite/menu/addIngreType", qs.stringify({
            menuId: ingreType.menuId,
            name: ingreType.name
        })
    );
    return resp;
}
//添加菜谱食材
export async function addMenuIngredient(ingredient){
    var resp = await axios.post("/FoodWebsite/menu/addMenuIngredient", qs.stringify({
            typeId: ingredient.typeId,
            name: ingredient.name,
            dosage: ingredient.dosage
        })
    );
    return resp;
}
//添加菜谱步骤
export async function addMenuStep(menuStep){
    var resp = await axios.post("/FoodWebsite/menu/addMenuStep", menuStep, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
    return resp;
}

//查询我的菜谱
export async function selMyMenu(uid){
    var resp = await axios.post("/FoodWebsite/menu/selMyMenu", qs.stringify({
            uid: uid
        })
    );
    return resp;
}
//获取我的菜谱首图
export async function selMyMenuImage(menuid){
    var resp = await axios.post("/FoodWebsite/menu/selMyMenuImage", qs.stringify({
            menuId: menuid
        })
    );
    return resp;
}
//获取整张菜谱
export async function selOneMenu(menuid){
    var resp = await axios.post("/FoodWebsite/menu/selOneMenu", qs.stringify({
            menuId: menuid
        })
    );
    return resp;
}
//删除菜谱
export async function delOneMenu(menuid){
    var resp = await axios.post("/FoodWebsite/menu/delOneMenu", qs.stringify({
            menuId: menuid
        })
    );
    return resp;
}
//首页获取12张最新菜谱展示
export async function selLatelyMenu(){
    var resp = await axios.post("/FoodWebsite/menu/selLatelyMenu");
    return resp;
}
//获取省份菜谱
export async function selMenuByProvince(provinceCode){
    var resp = await axios.post("/FoodWebsite/menu/selMenuByProvince", qs.stringify({
            provinceCode: provinceCode
        })
    );
    return resp;
}
//模糊查询菜谱
export async function selMenuBySearch(str){
    var resp = await axios.post("/FoodWebsite/menu/selMenuBySearch", qs.stringify({
            str: str
        })
    );
    return resp;
}
//编辑菜谱
export async function updMenu(menuData){
    var resp = await axios.post("/FoodWebsite/menu/updMenu", qs.stringify({
        id: menuData.menuId,
        name: menuData.menuName,
        provinceCode: menuData.menuProvince,
        menuDescribe: menuData.menuDescribe,
        menuKey: menuData.smallKey,
        status: menuData.status,
        uid: menuData.uid
        })
    );
    return resp;
}
//编辑菜谱完成图
export async function updMenuImage(formData){
    var resp = await axios.post("/FoodWebsite/menu/updMenuImage", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
    return resp;
}
//编辑菜谱食材类别
export async function updIngreType(ingreType){
    var resp = await axios.post("/FoodWebsite/menu/updIngreType", qs.stringify({
        id: ingreType.id,
        menuId: ingreType.menuId,
        name: ingreType.name
        })
    );
    return resp;
}
//编辑菜谱食材
export async function updMenuIngredient(ingredient){
    var resp = await axios.post("/FoodWebsite/menu/updMenuIngredient", qs.stringify({
        id: ingredient.id,
        typeId: ingredient.typeId,
        name: ingredient.name,
        dosage: ingredient.dosage
        })
    );
    return resp;
}
//编辑菜谱步骤
export async function updMenuStep(menuStep){
    var resp = await axios.post("/FoodWebsite/menu/updMenuStep", menuStep, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
    return resp;
}
//编辑菜谱步骤
export async function updMenuStep2(menuStep){
    var resp = await axios.post("/FoodWebsite/menu/updMenuStep2", menuStep, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
    return resp;
}
//删除菜谱完成图
export async function delMenuImage(id){
    var resp = await axios.post("/FoodWebsite/menu/delMenuImage", qs.stringify({
            id: id
        })
    );
    return resp;
}
//删除食材类别
export async function delIngreType(menuid){
    var resp = await axios.post("/FoodWebsite/menu/delIngreType", qs.stringify({
            menuId: menuid
        })
    );
    return resp;
}
//删除食材
export async function delIngredient(typeid){
    var resp = await axios.post("/FoodWebsite/menu/delMenuIngredient", qs.stringify({
            typeId: typeid
        })
    );
    return resp;
}
//删除菜谱步骤
export async function delMenuStep(stepid){
    var resp = await axios.post("/FoodWebsite/menu/delMenuStep", qs.stringify({
            stepId: stepid
        })
    );
    return resp;
}