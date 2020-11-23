//关于user相关的请求
import axios from "axios";
import qs from "qs";

//延迟
function delay(duration){
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve();
        }, duration);
    });
}
//注册
export async function register(userInfo){
    var resp = await axios.post("/FoodWebsite/user/register", qs.stringify({
            nickname: userInfo.username,
            password: userInfo.password
        })
    );
    return resp;
}
//登录
export async function login(userInfo){
    await delay(1000);
    var resp = await axios.post("/FoodWebsite/user/login", qs.stringify({
            account: userInfo.account,
            password: userInfo.password,
            checked: userInfo.checked
        })
    );
    return resp;
}
//自动登录
export async function autologin(){
    await delay(1000);
    var resp = await axios.post("/FoodWebsite/user/autologin");
    return resp;
}
//退出登录
export async function exitlogin(req){
    var resp = await axios.get("/FoodWebsite/user/exitlogin", {
        params: {
            account: req.account
        }
    });
    return resp;
}
//更改用户账号信息
export async function updateUserInfo(formData){
    var resp = await axios.post("/FoodWebsite/user/updateUserInfo", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    return resp;
}
//更改用户账号信息,除头像
export async function updateUserInfo2(formData){
    var resp = await axios.post("/FoodWebsite/user/updateUserInfo2", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    return resp;
}
//登录时，显示头像
export async function showPhoto(account){
    var resp = await axios.get("/FoodWebsite/user/showPhoto", {
        params: {
            account: account
        }
    });
    return resp;
}
//判断密码输入是否正确
export async function checkPassword(account, password){
    var resp = await axios.post("/FoodWebsite/user/checkPassword", qs.stringify({
            account: account,
            pass: password
        })
    );
    return resp;
}
//修改密码
export async function updatePassword(account, newpass){
    var resp = await axios.post("/FoodWebsite/user/updatePassword", qs.stringify({
            account: account,
            newpass: newpass
        })
    );
    return resp;
}
