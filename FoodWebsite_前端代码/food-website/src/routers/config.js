export default {
    //配置
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Home",
            component: ()=>import("@/views/Home")
        },
        {
            path: "/login",
            name: "Login",
            component: ()=>import("@/views/Login")
        },
        {
            path: "/register",
            name: "Register",
            component: ()=>import("@/views/Register")
        },
        {
            path: "/feedback",
            name: "Feedback",
            component: ()=>import("@/views/RegisterFeedback")
        },
        {
            path: "/local/:code/:name",
            name: "Local",
            component: ()=>import("@/views/Local")
        },
        {
            path: "/detail/:menu",
            name: "Detail",
            component: ()=>import("@/views/MenuDetail")
        },
        {
            path: "/personal/:checked",
            name: "Personal",
            component: ()=>import("@/views/Personal"),
            meta: {
                auth: true
            }
        },
        {
            path: "/release/:type",
            name: "Release",
            component: ()=>import("@/views/Release"),
            meta: {
                auth: true
            }
        },
        {
            path: "/auth",
            name: "Auth",
            component: ()=>import("@/views/Auth")
        }
    ]
}