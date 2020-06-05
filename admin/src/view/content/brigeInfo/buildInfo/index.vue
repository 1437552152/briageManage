<template>
  <div class="tableBox">
    <!--  <div id="loading" v-if="flag">
        <div class="loading-image">
            <div style="text-align: center;color: white;height: 100px;padding-top: 80px;margin-top: 180px;font-size:16px">正在努力加载中...</div>
        </div>
    </div> -->
    <div id="container" style="height:500px">
       
    </div>
    <div>
     <div class="boxStyle"></div>
    <div class="titleTotal">
      <div class="title">
        构件信息<img src="../../../../assets/images/dashed.png" />
      </div>
    </div>
    <div class="inputStyle">
      <Form
        :model="formData"
        label-position="right"
        class="right-search"
        inline
        :label-width="90"
      >
        <Row type="flex" justify="start">
          <Col :xl="5" :xxl="4">
            <FormItem label="构件类型:">
              <Select v-model="formData.componentType">
                <Option value="附属结构" key="1">附属结构</Option>
                <Option value="上部结构" key="2">上部结构</Option>
                <Option value="下部结构" key="3">下部结构</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="构件名称:">
              <Input v-model="formData.componentName" placeholder=""></Input>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="墩号范围:">
              <Select v-model="formData.pierNoRange">
                <Option value="P1-P4" key="1">P1-P4</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xl="3" :xxl="3">
            <Button type="primary" @click="handleSubmit('formValidate')"
              >查询</Button
            >
            <Button @click="handleReset" style="margin-left: 8px">重置</Button>
          </Col>
        </Row>
      </Form>
    </div>
    </div>


    <Table
      :columns="columns"
      :data="data"
      highlight-row
      @on-row-click="rowClick"
      id="tableone"
    ></Table>
  </div>
</template>

<script>
import { getbridgeComponentInfo } from "@/util/api";
import { filterParams } from "@/util/commonFilter";
import { config } from "@/view/utils/common";
import Motor from "../../../../../library/motor";
Motor.Config.serverUrl = config.bridge.bimServer;

export default {
  data() {
    return {
      current: 1,
      pageSize: 10,
      ContentHeight: 500,
      project: null,
      projectId:null,
      formInline: {
        name: ""
      },
      flag:true,
      bridgeId: this.$route.query.bridgeId,
      formData: {
        componentType: "",
        componentName: "",
        pierNoRange: ""
      },
      drawerImg: require("../../../../assets/images/down.png"),
      value3: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static",
        backgroundColor: "#04232c"
      },
      src: localStorage.getItem("bimUrl"),
      columns: [
        {
          title: "构件类型",
          key: "componentType",
          align: "center"
        },
        {
          title: "构件名称",
          key: "componentName",
          align: "center"
        },
        {
          title: "子构件",
          key: "componentChild",
          align: "center"
        },
        {
          title: "子构件编号",
          key: "componentChildCode",
          align: "center"
        },
        {
          title: "墩号范围",
          key: "pierNoRange",
          align: "center"
        },
        {
          title: "线路中心左/右侧",
          key: "lineCenterDirection",
          align: "center"
        },
        {
          title: "方向",
          key: "direction",
          align: "center"
        }
      ],
      data: []
    };
  },
  created() {
    this.getbridge();
  },
  mounted() {

setTimeout(()=>{
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
},3000);
   window.addEventListener('scroll', this.load)

  },
  methods: {
    load(){
             var oDiv =document.getElementById('tableone').getElementsByTagName('table')[0],
          H = 0,
          Y = oDiv        
          while (Y) {
          H += Y.offsetTop; 
          Y = Y.offsetParent;
          }
      var s = document.body.scrollTop || document.documentElement.scrollTop
      if(s>H-500) {
         console.log(oDiv)
          oDiv.style = "position:fixed;top:500px;z-index:99"
      } else {
           oDiv.style = ""
      }
  },
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
    onChange(page) {
      this.current = page;
    },
    dodail(params) {
      const that = this;
      this.project.resetComponentsDefaultColor();
      this.project.setComponentsColor(Motor.Color.GREEN.withAlpha(0.4), [
        params
      ]);
    },
    getbridge() {
      let body = {};
      body = filterParams(this.formData);
      body.bridgeId = this.bridgeId;
      getbridgeComponentInfo(body).then(res => {
        this.data = res.data;
      });
    },
    onSizeChange(paseSize) {
      this.pageSize = pageSize;
    },
    rowClick(params) {
      this.dodail(params.id);
    },
    handleSubmit(name) {
      this.getbridge();
    },
    handleReset(name) {
      for (let key in this.formData) {
        this.formData[key] = "";
      }
      this.getbridge();
    }
  }
};
</script>

<style lang="less" scoped>
.pagePosition {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.tableBox .ivu-table-row-highlight td,
.tableBox .ivu-table-row-highlight:hover td {
  background-color: #0d3541;
  color: #fff;
}
#loading {
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: #0000004d;
}
.loading-image {
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50px;
  width: 100%;
}
</style>
