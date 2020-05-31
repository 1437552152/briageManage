<template>
  <div class="left-nav" :style="{ left: letName }" @mouseleave="handleLeave">
    <ul>
      <router-link
        :to="`/ChildSystem/childhome?bridgeId=${bridgeId}&bimUrl=${bimUrl}`"
      >
        <li class="deal">
          首页
        </li>
      </router-link>
      <li class="deal">
        桥梁基本信息
        <img src="../../assets/images/right.png" />
        <ul class="protact">
          <router-link
            :to="
              `/ChildSystem/brigetotalInfo?bridgeId=${bridgeId}&bimUrl=${bimUrl}`
            "
          >
            <li>总体信息</li></router-link
          >
          <router-link
            :to="`/ChildSystem/buildInfo?bridgeId=${bridgeId}&bimUrl=${bimUrl}`"
          >
            <li>构件信息</li></router-link
          >
        </ul>
      </li>
      <li class="deal">
        传感器及数据
        <img src="../../assets/images/right.png" />
        <ul class="protact">
          <router-link
            :to="`/ChildSystem/status?bridgeId=${bridgeId}&bimUrl=${bimUrl}`"
            ><li>布置及状态</li></router-link
          >
          <router-link
            :to="`/ChildSystem/static?bridgeId=${bridgeId}&bimUrl=${bimUrl}`"
          >
            <li>静挠度</li></router-link
          >
          <router-link
            :to="`/ChildSystem/move?bridgeId=${bridgeId}&bimUrl=${bimUrl}`"
            ><li>动挠度</li></router-link
          >
          <router-link
            :to="`/ChildSystem/crack?bridgeId=${bridgeId}&bimUrl=${bimUrl}`"
          >
            <li>裂缝</li></router-link
          >
        </ul>
      </li>
      <li class="deal">
        管养信息
        <img src="../../assets/images/right.png" />
        <ul class="protact">
          <router-link
            :to="`/ChildSystem/totalInfo?bridgeId=${bridgeId}&bimUrl=${bimUrl}`"
          >
            <li>总体信息</li></router-link
          >
          <router-link
            :to="
              `/ChildSystem/patrolCheckInfo?bridgeId=${bridgeId}&bimUrl=${bimUrl}`
            "
            ><li>巡检信息</li></router-link
          >
          <router-link
            :to="
              `/ChildSystem/periodicTestInfo?bridgeId=${bridgeId}&bimUrl=${bimUrl}`
            "
          >
            <li>
              定期检测信息
            </li></router-link
          >
        </ul>
      </li>
      <li class="deal">
        预警与分析
        <img src="../../assets/images/right.png" />
        <ul class="protact">
          <router-link
            :to="
              `/ChildSystem/disturbance?bridgeId=${bridgeId}&bimUrl=${bimUrl}`
            "
            ><li>动挠度分析</li></router-link
          >
          <router-link
            :to="
              `/ChildSystem/vehicleLoad?bridgeId=${bridgeId}&bimUrl=${bimUrl}`
            "
            ><li>车辆荷载分析</li></router-link
          >
          <router-link
            :to="
              `/ChildSystem/structuralStress?bridgeId=${bridgeId}&bimUrl=${bimUrl}`
            "
            ><li>
              结构应力分析
            </li></router-link
          >
          <router-link
            :to="
              `/ChildSystem/development?bridgeId=${bridgeId}&bimUrl=${bimUrl}`
            "
          >
            <li>裂缝发展分析</li></router-link
          >
          <router-link
            :to="
              `/ChildSystem/acceleration?bridgeId=${bridgeId}&bimUrl=${bimUrl}`
            "
          >
            <li>
              振动加速度分析
            </li></router-link
          >
          <router-link
            :to="
              `/ChildSystem/displacement?bridgeId=${bridgeId}&bimUrl=${bimUrl}`
            "
          >
            <li>支座位移分析</li></router-link
          >
          <router-link
            :to="
              `/ChildSystem/comprehensive?bridgeId=${bridgeId}&bimUrl=${bimUrl}`
            "
          >
            <li>
              综合分析及预警
            </li></router-link
          >
        </ul>
      </li>
      <li class="deal">
        结构评估
        <img src="../../assets/images/right.png" />
        <ul class="protact">
          <router-link
            :to="
              `/ChildSystem/evaluation?bridgeId=${bridgeId}&bimUrl=${bimUrl}`
            "
            ><li>
              基于监测数据结构性能评估
            </li></router-link
          >
          <router-link
            :to="`/ChildSystem/capacity?bridgeId=${bridgeId}&bimUrl=${bimUrl}`"
          >
            <li>
              基于定期检测结构承载力评估
            </li></router-link
          >
          <router-link
            :to="
              `/ChildSystem/structures?bridgeId=${bridgeId}&bimUrl=${bimUrl}`
            "
          >
            <li>
              结构综合性能评估
            </li></router-link
          >
          <router-link
            :to="`/ChildSystem/report?bridgeId=${bridgeId}&bimUrl=${bimUrl}`"
          >
            <li>
              评估报告
            </li></router-link
          >
        </ul>
      </li>
      <!--       <li class="deal">
        系统配置
        <img src="../../assets/images/right.png" />
        <ul class="protact">
          <router-link :to="`/ChildSystem/staff?bridgeId=${bridgeId}`"> <li>人员管理</li></router-link>
          <router-link :to="`/ChildSystem/limit?bridgeId=${bridgeId}`"> <li>权限管理</li></router-link>
          <router-link :to="`/ChildSystem/userGroup?bridgeId=${bridgeId}`"> <li>用户组管理</li></router-link>
          <router-link :to="`/ChildSystem/log?bridgeId=${bridgeId}`"> <li>日志管理</li></router-link>
        </ul>
      </li> -->
      <li class="deal">
        视频监控
      </li>
    </ul>
    <div
      class="mousePosition"
      :style="{ left: mousePositionLeft }"
      @mouseover="mouseOver"
    >
      <img src="../../assets/images/topIcon.png" class="icon1" />
      <img src="../../assets/images/rightIcon.png" class="icon2" />
      <img src="../../assets/images/topIcon.png" class="icon1" />
    </div>
    <OperBtn />
  </div>
</template>

<script>
import OperBtn from "@/components/operBtn/operBtn.vue";
export default {
  components: {
    OperBtn
  },
  data() {
    return {
      letName: "-130px",
      mousePositionLeft: "2px",
      bridgeId: localStorage.getItem("bridgeId"),
      bimUrl: localStorage.getItem("bimUrl")
    };
  },
  methods: {
    handleLeave() {
      this.letName = "-130px";
      this.mousePositionLeft = "2px";
    },
    mouseOver() {
      this.mousePositionLeft = "-20px";
      this.letName = 0;
    },
    checkOut() {
      this.$router.push({
        path: "/login"
      });
    },
    checkReturn() {
      this.$router.push({
        path: "/ParentSystem/home"
      });
    }
  }
};
</script>
<style lang="less" scoped>
a {
  color: #22e1ba;
}
a:hover {
  color: #54fbfc;
  cursor: pointer;
}
.left-nav {
  width: 130px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: #04232c;
  z-index: 999;
}
.left-nav ul {
  width: 100%;
}
.left-nav ul li {
  text-align: left;
  padding: 25px 10px;
  color: #22e1ba;
  font-size: 14px;
}
.left-nav ul li:hover {
  color: #54fbfc;
  background: #07323e;
  cursor: pointer;
}
.left-nav ul li:hover .protact {
  background: #07323e;
  display: block;
}
.left-nav ul li:hover .protact li a {
  color: #54fbfc;
}
.left-nav .protact li:hover {
  cursor: pointer;
  background: url(../../assets/images/twoHover.png) no-repeat;
  background-size: 100% 100%;
}
.left-nav ul li.deal {
  position: relative;
}
.left-nav ul li .protact {
  width: 220px;
  position: absolute;
  left: 130px;
  top: 0px;
  display: none;
  padding: 2px 0 80px 0px;
}
.left-nav ul li .protact li {
  color: #54fbfc;
  list-style: none;
  /*   padding: 15px; */
}
.deal {
  position: relative;
}
.deal img {
  width: 15px;
  height: 15px;
  position: absolute;
  right: 10px;
  top: 29px;
}
.protact .ivu-input {
  background-color: #053f51;
  color: #54fbfc;
  margin-top: 8px;
  margin-left: 10px;
  width: 180px;
}
.brige li {
  padding: 8px !important;
  margin-top: 8px;
  margin-left: 10px;
}
.brige .ivu-input-icon {
  right: 5px;
  top: 8px;
}
.mousePosition {
  position: fixed !important;
  top: 50%;
  z-index: 999;
  flex-direction: column;
  margin-top: -73px;
  width: 24px;
}
.mousePosition .icon1 {
  width: 7px;
}
.mousePosition .icon2 {
  width: 16px;
  display: block;
  margin-top: 8px;
  margin-bottom: 16px;
  margin-left: 4px;
  cursor: pointer;
}
</style>
