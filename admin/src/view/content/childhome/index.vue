<template>
  <div class="tableBox">
   <div class="leftPart">
      <div class="module">
         <div id="container" style="height:550px" />
      </div>
      <div class="moduleB">
        <div style="width:100%;height:100%">
           <Bar1
        className="container1"
        type="InstrumentPanel"
        :dataObj="data1"
        v-if="data1.valueX"
      />
      </div>
      </div>
    </div>
     <div class="leftPart rightPart">
       <div class="module">
         <div class="partTop">
           <div style="color:#4EECEE;font-size:26px;padding:20px 0;box-sizing:border-box;height:60px;line-height:30px">各类传感器利用率</div>
           <div style="width:100%;height:calc((100% - 80px) / 3 )">
             <div style="width:100%;height:100%">
               <Bar3
        className="container1"
        type="InstrumentPanel"
        :dataObj="data3"
        v-if="data3.value"
      />
             </div>
           </div>
           <div style="width:100%;height:calc((100% - 80px) / 3 );margin-top:10px">
             <div style="width:100%;height:100%">
               <Bar3
        className="container1"
        type="InstrumentPanel"
        :dataObj="data4"
        v-if="data4.value"
      />
             </div>
           </div>
           <div style="width:100%;height:calc((100% - 80px) / 3 );margin-top:10px">
             <div style="width:100%;height:100%">
               <Bar3
        className="container1"
        type="InstrumentPanel"
        :dataObj="data5"
        v-if="data5.value"
      />
             </div>
           </div>
         </div>
         <div class="partBot">
    
           <div style="width:calc((100% - 20px) / 3 );height:100%;float:left">
           <div style="color:#4EECEE;font-size:26px;height:30px;padding:30px 0;box-sizing:border-box;text-align:center">结构状态</div>
           <div style="width:100%;height:calc(100% - 30px)">
             <Bar4
        className="container1"
        type="InstrumentPanel"
        :dataObj="data6"
        flag="1"
        v-if="data6.value"
      />
           </div>
           </div>
           
           <div style="width:calc((100% - 20px) / 3 );height:100%;float:left;margin-left:10px">
           <div style="color:#4EECEE;font-size:26px;height:30px;padding:30px 0;box-sizing:border-box;text-align:center">最近巡检状况</div>
           <div style="width:100%;height:calc(100% - 30px)">
             <Bar4
        className="container1"
        type="InstrumentPanel"
        :dataObj="data7"
         flag="2"
        v-if="data7.value"
      />
           </div>
           </div>
           
           <div style="width:calc((100% - 20px) / 3 );height:100%;float:left;margin-left:10px">
           <div style="color:#4EECEE;font-size:26px;height:30px;padding:30px 0;box-sizing:border-box;text-align:center">预警信息</div>
           <div style="width:100%;height:calc(100% - 30px)">
             <Bar4
        className="container1"
        type="InstrumentPanel"
         flag="3"
        :dataObj="data8"
        v-if="data8.value"
      />
           </div>
           </div>
         </div>
       </div>
       <div class="moduleB">
         <div style="width:100%;height:100%">
           <Bar2
        className="container1"
        type="InstrumentPanel"
        :dataObj="data2"
        v-if="data2.valueX"
      />
      </div>
       </div>
     </div>
  </div>
</template>

<script>
import Bar1 from "@/view/components/Bar/Bar1";
import Bar2 from "@/view/components/Bar/Bar2";
import Bar3 from "@/view/components/Bar/Bar3";
import Bar4 from "@/view/components/Bar/Bar4";
import { config } from "@/view/utils/common";
import Motor from "../../../../library/motor";
Motor.Config.serverUrl = config.bridge.bimServer;

export default {
  components: {
    Bar1,Bar2,Bar3,Bar4
  },
  data() {
    return {
      project: null,
      projectId:null,
      bridgeId: this.$route.query.bridgeId,
      data1:{
        title:'实时评分',
        valueX: ['塔顶位移', '塔顶应力', '扰度线性', '支座位移', '梁缝位移', '索力','塔顶位移', '塔顶应力', '扰度线性', '支座位移', '梁缝位移', '索力'],
        valueY:[68.7, 90.5, 92.7, 82.5, 94.4, 64.7,94.1,98.4,84.7,94.2,96.2,88.9],
        type:1
      },
      data2: {
        title: "月巡检次数",
        valueX: ['2019-1','2019-2','2019-3','2019-4','2019-5','2019-6','2019-7','2019-8','2019-9','2019-10','2019-11','2019-12'],
        valueY:[53,48,26,50,43,43,55,59,38,39,43,43],
        type: 1,
        color: "#21dcb7"
      },
      data3:{
        title:"扰度传感器",
        valueY:['1','2','3'],
        value:[99.6, 95.2, 94.2],
        color:'#2396FA',
        colorGroup:['#0E8BF8','#07EDAD']
      },
      data4:{
        title:"温度传感器",
        valueY:['1','2','3'],
        value:[99.6, 95.2, 94.2],
        color:'#07AB84',
        colorGroup:['#1EC8D2','#6DEDA7']
      },
      data5:{
        title:"压力传感器",
        valueY:['1','2','3'],
        value:[99.6, 95.2, 94.2],
        color:'#F9D576',
        colorGroup:['#27DF8E','#87E696']
      },
      data6:{
        title:"良好",
        value:['1','2','3'],
      },
      data7:{
        title:"正常",
        value:['1','2','3'],
      },
      data8:{
        title:"无",
        value:['1','2','3'],
      },
       ContentHeight: '100%',
    };
  },
  mounted() {
    const that = this;
    var projectId = localStorage.getItem("bridgeId");
    this.projectId=projectId;
    var viewer = new Motor.Viewer({
      container: "container",
      antialias: true,
      viewerMode: Motor.ViewerMode.BIM,
      appid: config.bridge.motorAppId,
      secret: config.bridge.motorSecret,
      backgroundImageCss: "url('/assets/images/login-bg.jpg')"
    });
    let project = viewer.queryProject(projectId);
    this.project = project;
    viewer.initialize().then(function() {
      that.drawProject(projectId, true, false);
      
    });
  },
  methods: {
        drawProject(projectId, isInSubScene, aBd) {
      let that=this;
      this.project
        .open({
          drawEdge: isInSubScene
        })
        .then(function() {
        that.flag=false;
        });
    },
  }
};
</script>

<style lang="less" scoped>
.tableBox{
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0
}
.leftPart{
  width:calc((100% - 70px) / 2 );
  height:100%;
  float:left
}
.rightPart{
  margin-left: 70px;
}
.module{
  width:100%;
  height:calc(((100% - 52px) / 3) * 2);
}
.moduleB{
  width:100%;
  height:calc((100% - 52px) / 3);
  margin-top: 50px;
  border:1px solid #4EECEE;
  border-radius: 10px;
}
.partTop{
  width:100%;
  height:60%;
}
.partBot{
  width:100%;
  height:40%;
}
/* #toolbar {
  position: absolute;
  padding-top: 8px;
  padding-bottom: 12px;
  padding-left: 10px;
  padding-right: 10px;
  top: 0;
  width: calc(100% - 60px);
}
.description {
  position: relative;
  left: 0;
  color: white;
  font-size: 14px;
}
.buttons {
  position: absolute;
  right: 0;
  margin-right: 10px;
  padding-left: 10px;
}
.buttons button {
  background-color: transparent;
  color: white;
  border: 1px solid #ffffffcc;
  border-radius: 2px;
  height: 24px;
  line-height: 18px;
  margin: 0 5;
} */
</style>
