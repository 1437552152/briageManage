<template>
  <div class="left-nav" :style="{ left: letName }" @mouseleave="handleLeave">
    <ul>
      <li class="deal">
        总体信息
        <img src="../../assets/images/right.png" />
        <ul class="protact">
          <li><router-link to="/ParentSystem/home">桥梁信息</router-link></li>
          <li><router-link to="/ParentSystem/home">安全分析</router-link></li>
          <li><router-link to="/ParentSystem/home">巡检信息</router-link></li>
          <li><router-link to="/ParentSystem/home">检测信息</router-link></li>
          <li><router-link to="/ParentSystem/home">维修信息</router-link></li>
          <li><router-link to="/ParentSystem/home">管理信息</router-link></li>
        </ul>
      </li>
      <li>物联网信息</li>
      <li>视频信息</li>
      <li class="deal">
        桥梁监测
        <img src="../../assets/images/right.png" />
        <ul class="protact brige">
          <Input
            @on-change="newValue"
            v-model="formLeft.input"
            icon="ios-search"
            class="formSearch"
          />
          <li
            @click="goChildSystem(item)"
            v-for="(item, index) in arr"
            :key="index"
          >
            <router-link
              :to="
                `/ChildSystem/childhome?bridgeId=${item.id}&viewToken=${item.viewToken}`
              "
            >
              {{ item.name }}</router-link
            >
          </li>
        </ul>
      </li>

      <li>管养系统</li>
      <li class="deal">
        系统维护
        <img src="../../assets/images/right.png" />
        <ul class="protact">
          <li>
            <router-link to="/ParentSystem/home">桥梁基本信息维护</router-link>
          </li>
          <li>
            <router-link to="/ParentSystem/home"
              >物联网设备信息维护</router-link
            >
          </li>
          <li>
            <router-link to="/ParentSystem/home"
              >关键参数预警值维护</router-link
            >
          </li>
          <li>
            <router-link to="/ParentSystem/home">巡检信息维护</router-link>
          </li>
          <li>
            <router-link to="/ParentSystem/home">定期检测信息维护</router-link>
          </li>
          <li>
            <router-link to="/ParentSystem/home"
              >动挠度预警参数设置</router-link
            >
          </li>
        </ul>
      </li>
      <!-- <li class="deal">
        系统配置
        <img src="../../assets/images/right.png" />
        <ul class="protact">
           <li><router-link to="/">人员管理</router-link></li>
           <li><router-link to="/">权限管理</router-link></li>
           <li><router-link to="/">用户组管理</router-link></li>
           <li><router-link to="/">日志管理</router-link></li>
        </ul>
      </li> -->
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
    <OperBtn type="1" />
  </div>
</template>
<script>
import { getbridgeBridgeInfo } from "@/util/api";
import OperBtn from "@/components/operBtn/operBtn.vue";
export default {
  components: {
    OperBtn
  },
  data() {
    return {
      letName: "-130px",
      mousePositionLeft: "2px",
      formLeft: {
        input: ""
      },
      bridgeList: [],
      arr:[]
    };
  },
  created() {
    let that = this;
    getbridgeBridgeInfo().then(res => {
      console.log(res.data);
      that.bridgeList = res.data;
      that.arr=res.data;
    });
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
    },
    goChildSystem(params) {
      window.localStorage.setItem("bridgeId", params.id);
      window.localStorage.setItem("viewToken", params.viewToken||'9f8850874f5d4cada47e9700c4e0ad95');
    },
    newValue() {
      console.log(this.formLeft.input);
      //字符串方法indexOf
      var len = this.bridgeList.length;
      var arr = [];
      for (var i = 0; i < len; i++) {
        //如果字符串中不包含目标字符会返回-1
        if (this.bridgeList[i].name.indexOf(this.formLeft.input) >= 0) {
          arr.push(this.bridgeList[i]);
        }
      }

      this.arr =arr;
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
.left-nav > ul > li {
  text-align: left;
  padding: 25px 10px;
  color: #22e1ba;
  font-size: 14px;
}

.left-nav > ul > li li a {
  padding: 15px 10px;
  display: block;
}

.left-nav ul li:hover {
  color: #54fbfc;
  background: #0c4a5c;
  cursor: pointer;
}
.left-nav ul li:hover .protact {
  background: #0c4a5c;
  display: block;
}
.left-nav ul li:hover .protact li a {
  color: #54fbfc;
}
.left-nav .protact li:hover {
  cursor: pointer;
  background-color: #053f51;
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
}
.brige li a {
  padding: 6px 10px !important;
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

.formSearch {
  margin: 10px 4px;
  width: 208px;
}
</style>
