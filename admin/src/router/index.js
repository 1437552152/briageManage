import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/ParentSystem",
      component:(resolve)=>require(["@/view/ParentMain/ParentMain"],resolve),
      children: [
        {
          path: "home",
          component: (resolve)=>require(["@/view/home/index"],resolve),
        }
      ]
    },
    {
      path: "/",
      component:(resolve)=>require(["@/view/login/login"],resolve),
      redirect: "/login",
      children: [
        {
          path: "/login",
          component: (resolve)=>require(["@/view/login/login"],resolve),
        },
        {
          path: "/register",
          component: (resolve)=>require(["@/view/register/register"],resolve),
        }, 
      ]
    },
    {
      path: "/user",
      component:(resolve)=>require(["@/view/register/register"],resolve),
      children: [
        {
          path: "register/",
          name: "register",
          component:(resolve)=>require(["@/view/register/register"],resolve),
        }, 
      ]
    },
    {
      path: "/ChildSystem",
      component: (resolve)=>require(["@/view/main/main"],resolve),
      children: [
        {
          path: 'driveInfo/',
          name: "driveInfo",
          component: (resolve)=>require(["@/view/content/driveInfo/index"],resolve)
        },
        {
          path: "childhome/",
          name: "childhome",
          component: (resolve)=>require(["@/view/content/childhome/index"],resolve)
        },
        {
          path: "brigetotalInfo/",
          name: "brigetotalInfo",
          component: (resolve)=>require(["@/view/content/brigeInfo/totalInfo/index"],resolve)
        },
        {
          path: "buildInfo/",
          name: "buildInfo",
          component: (resolve)=>require(["@/view/content/brigeInfo/buildInfo/index"],resolve)
        },
        {
          path: "status/",
          name: "status",
          component: (resolve)=>require(["@/view/content/sensorInfo/status/index"],resolve)
        },
        {
          path: "static/",
          name: "static",
          component:  (resolve)=>require(["@/view/content/sensorInfo/static/index"],resolve)
        },
        {
          path: "move/",
          name: "move",
          component: (resolve)=>require(["@/view/content/sensorInfo/move/index"],resolve)
        },
        {
          path: "crack/",
          name: "crack",
          component:(resolve)=>require(["@/view/content/sensorInfo/crack/index"],resolve)
        },
        {
          path: "totalInfo/",
          name: "totalInfo",
          component: (resolve)=>require(["@/view/content/custodyInfo/totalInfo/index"],resolve)
        },
        {
          path: "patrolCheckInfo/",
          name: "patrolCheckInfo",
          component: (resolve)=>require(["@/view/content/custodyInfo/patrolCheckInfo/index"],resolve)
        },
        {
          path: "periodicTestInfo/",
          name: "periodicTestInfo",
          component: (resolve)=>require(["@/view/content/custodyInfo/periodicTestInfo/index"],resolve)
        },
        {
          path: "disturbance/",
          name: "disturbance",
          component: (resolve)=>require(["@/view/content/analysis/disturbance/index"],resolve)
        },
        {
          path: "vehicleLoad/",
          name: "vehicleLoad",
          component: (resolve)=>require(["@/view/content/analysis/vehicleLoad/index"],resolve)
        },
        {
          path: "structuralStress/",
          name: "structuralStress",
          component: (resolve)=>require(["@/view/content/analysis/structuralStress/index"],resolve)
        },
        {
          path: "development/",
          name: "development",
          component: (resolve)=>require(["@/view/content/analysis/development/index"],resolve)
        },
        {
          path: "acceleration/",
          name: "acceleration",
          component: (resolve)=>require(["@/view/content/analysis/acceleration/index"],resolve)
        },
        {
          path: "displacement/",
          name: "displacement",
          component: (resolve)=>require(["@/view/content/analysis/displacement/index"],resolve)
        },
        {
          path: "comprehensive/",
          name: "comprehensive",
          component: (resolve)=>require(["@/view/content/analysis/comprehensive/index"],resolve)
        },
        {
          path: "evaluation/",
          name: "evaluation",
          component: (resolve)=>require(["@/view/content/assessment/evaluation/index"],resolve)
        },
        {
          path: "capacity/",
          name: "capacity",
          component: (resolve)=>require(["@/view/content/assessment/capacity/index"],resolve)
        },
        {
          path: "structures/",
          name: "structures",
          component: (resolve)=>require(["@/view/content/assessment/structures/index"],resolve)
        },
        {
          path: "report/",
          name: "report",
          component: (resolve)=>require(["@/view/content/assessment/report/index"],resolve)
        },
        {
          path: "staff/",
          name: "staff",
          component: (resolve)=>require(["@/view/content/systemInfo/staff/index"],resolve)
        },
        {
          path: "limit/",
          name: "limit",
          component: (resolve)=>require(["@/view/content/systemInfo/limit/index"],resolve)
        },
        {
          path: "userGroup/",
          name: "userGroup",
          component: (resolve)=>require(["@/view/content/systemInfo/userGroup/index"],resolve)
        },
        {
          path: "log/",
          name: "log",
          component: (resolve)=>require(["@/view/content/systemInfo/log/index"],resolve)
        }
      ]
    }
  ]
});
