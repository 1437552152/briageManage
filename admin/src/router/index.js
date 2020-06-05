import Vue from "vue";
import Router from "vue-router";
import Login from "@/view/login/login";
import Home from "@/view/home/index";
import ChildHome from "@/view/content/childhome/index";
import DriveInfo from "@/view/content/driveInfo/index";
import BrigetotalInfo from "@/view/content/brigeInfo/totalInfo/index";
import BuildInfo from "@/view/content/brigeInfo/buildInfo/index";
import Status from "@/view/content/sensorInfo/status/index";
import Static from "@/view/content/sensorInfo/static/index";
import Move from "@/view/content/sensorInfo/move/index";
import Crack from "@/view/content/sensorInfo/crack/index";
import TotalInfo from "@/view/content/custodyInfo/totalInfo/index";
import PatrolCheckInfo from "@/view/content/custodyInfo/patrolCheckInfo/index";
import PeriodicTestInfo from "@/view/content/custodyInfo/periodicTestInfo/index";
import Disturbance from "@/view/content/analysis/disturbance/index";
import VehicleLoad from "@/view/content/analysis/vehicleLoad/index";
import StructuralStress from "@/view/content/analysis/structuralStress/index";
import Development from "@/view/content/analysis/development/index";
import Acceleration from "@/view/content/analysis/acceleration/index";
import Displacement from "@/view/content/analysis/displacement/index";
import Comprehensive from "@/view/content/analysis/comprehensive/index";
import Evaluation from "@/view/content/assessment/evaluation/index";
import Capacity from "@/view/content/assessment/capacity/index";
import Structures from "@/view/content/assessment/structures/index";
import Report from "@/view/content/assessment/report/index";

import Staff from "@/view/content/systemInfo/staff/index";
import Limit from "@/view/content/systemInfo/limit/index";
import UserGroup from "@/view/content/systemInfo/userGroup/index";
import Log from "@/view/content/systemInfo/log/index";
import Main from "@/view/main/main";
import ParentMain from "@/view/ParentMain/ParentMain";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/ParentSystem",
      component: ParentMain,
      children: [
        {
          path: "home",
          component: Home
        }
      ]
    },
    {
      path: "/",
      component: Login,
      redirect: "/login",
      children: [
        {
          path: "/login",
          component: Login
        }
      ]
    },
    {
      path: "/ChildSystem",
      component: Main,
      children: [
        {
          path: 'driveInfo/',
          name: "driveInfo",
          component: DriveInfo
        },
        {
          path: "childhome/",
          name: "childhome",
          component: ChildHome
        },
        {
          path: "brigetotalInfo/",
          name: "brigetotalInfo",
          component: BrigetotalInfo
        },
        {
          path: "buildInfo/",
          name: "buildInfo",
          component: BuildInfo
        },
        {
          path: "status/",
          name: "status",
          component: Status
        },
        {
          path: "static/",
          name: "static",
          component: Static
        },
        {
          path: "move/",
          name: "move",
          component: Move
        },
        {
          path: "crack/",
          name: "crack",
          component: Crack
        },
        {
          path: "totalInfo/",
          name: "totalInfo",
          component: TotalInfo
        },
        {
          path: "patrolCheckInfo/",
          name: "patrolCheckInfo",
          component: PatrolCheckInfo
        },
        {
          path: "periodicTestInfo/",
          name: "periodicTestInfo",
          component: PeriodicTestInfo
        },
        {
          path: "disturbance/",
          name: "disturbance",
          component: Disturbance
        },
        {
          path: "vehicleLoad/",
          name: "vehicleLoad",
          component: VehicleLoad
        },
        {
          path: "structuralStress/",
          name: "structuralStress",
          component: StructuralStress
        },
        {
          path: "development/",
          name: "development",
          component: Development
        },
        {
          path: "acceleration/",
          name: "acceleration",
          component: Acceleration
        },
        {
          path: "displacement/",
          name: "displacement",
          component: Displacement
        },
        {
          path: "comprehensive/",
          name: "comprehensive",
          component: Comprehensive
        },
        {
          path: "evaluation/",
          name: "evaluation",
          component: Evaluation
        },
        {
          path: "capacity/",
          name: "capacity",
          component: Capacity
        },
        {
          path: "structures/",
          name: "structures",
          component: Structures
        },
        {
          path: "report/",
          name: "report",
          component: Report
        },
        {
          path: "staff/",
          name: "staff",
          component: Staff
        },
        {
          path: "limit/",
          name: "limit",
          component: Limit
        },
        {
          path: "userGroup/",
          name: "userGroup",
          component: UserGroup
        },
        {
          path: "log/",
          name: "log",
          component: Log
        }
      ]
    }
  ]
});
