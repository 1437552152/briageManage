<style lang="less">
@import "./common.less";
</style>
<template>
  <div class="tableBox">
   <div id='infoBox'  style="display: none;z-index:9999"></div>
    <div id="container" style="height:500px"></div>
     <div class="tree_container">
        <ul id="treeDemo" class="ztree"></ul>
    </div>
    <div id="contextContainer">
        <ul id="contextmenu">
            <li class="li">构件详情</li>
            <hr class="hr">
            <li class="li">隐藏选中</li>
            <li class="li">半透明选中</li>
            <li class="li">隔离选中</li>
            <hr class="hr">
            <li class="li">还原所有</li>
        </ul>
    </div>
    <div class="boxStyle"></div>
    <div class="titleTotal">
      <div class="title">
        巡检总体信息<img src="../../../../assets/images/dashed.png" />
      </div>
    </div>
    <div class="Meter1">
      <div class="displayE">
        <p class="monthCheck">
          <span>本月巡检：</span
          ><span class="reasult monthCheckValue">{{ mouthnumS }}</span
          >次
        </p>
        <p class="lastCheck">
          <span>最后一次巡检：</span
          ><span class="reasult">{{ lastCheck }}</span>
        </p>
      </div>
      <Circles
        className="container1"
        type="InstrumentPanel"
        :dataObj="data1"
        v-if="data1.value"
      />
      <Circles
        className="container1"
        type="InstrumentPanel"
        :dataObj="data4"
        v-if="data4.value"
      />
    </div>

    <div class="inputStyle">
      <Form
        :model="formData"
        label-position="right"
        class="right-search"
        inline
        :label-width="100"
      >
        <Row type="flex" justify="start">
          <Col :xl="5" :xxl="4">
            <FormItem label="巡检开始时间:">
              <DatePicker
                type="date"
                v-model="formData.startTime"
                placeholder="请选择开始时间"
                style="width: 100%;"
              ></DatePicker>
            </FormItem>
          </Col>

          <Col :xl="5" :xxl="4">
            <FormItem label="巡检结束时间">
              <DatePicker
                type="date"
                v-model="formData.endTime"
                placeholder="请选择结束时间"
                style="width: 100%;"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="上报人:">
              <Input v-model="formData.inspectStaff" placeholder=""></Input>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="所属构件类型:">
              <Select
                v-model="formData.structuralType"
                placeholder="请选择所属构件类型"
              >
                <Option value="附属工程" key="1">附属工程</Option>
                <Option value="上部结构" key="2">上部结构</Option>
                <Option value="下部结构" key="3">下部结构</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="所属构件:">
              <Select v-model="formData.component" placeholder="请选择所属构件">
                <Option value="声屏障基础" key="1">声屏障基础</Option>
                <Option value="声屏障立柱" key="2">声屏障立柱</Option>
                <Option value="屏障板" key="3">屏障板</Option>
                <Option value="连接螺栓" key="4">连接螺栓</Option>
                <Option value="综合评价病害" key="5">综合评价病害</Option>
                <Option value="栏杆基础" key="6">栏杆基础</Option>
                <Option value="立柱" key="7">立柱</Option>
                <Option value="栏帽" key="8">栏帽</Option>
                <Option value="栏片" key="9">栏片</Option>
                <Option value="防撞墙基础" key="10">防撞墙基础</Option>
                <Option value="防撞墙钢栏杆" key="11">防撞墙钢栏杆</Option>
                <Option value="沥清桥面" key="12">沥清桥面</Option>
                <Option value="混凝土桥面" key="13">混凝土桥面</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="轻重度:">
              <Select
                v-model="formData.diseaseSeverity"
                placeholder="请选择轻重度"
              >
                <Option value="轻度" key="1">轻度</Option>
                <Option value="重度" key="2">重度</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="紧迫度:">
              <Select v-model="formData.urgentType" placeholder="请选择紧迫度">
                <Option value="紧急" key="1">紧急</Option>
                <Option value="不紧急" key="2">不紧急</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xl="4" :xxl="4">
            <FormItem label="">
              <Button type="primary" @click="handleSubmit('formValidate')"
                >查询</Button
              >
              <Button @click="handleReset" style="margin-left: 8px"
                >重置</Button
              >
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>

    <Table
      :columns="columns"
      :data="data"
      highlight-row
      @on-row-click="rowClick"
      id="tableseven"
    ></Table>
  </div>
</template>

<script>
import { exportFileService } from "@/view/utils/myFetch";
import Circles from "@/view/components/Circles/Circles";
import Ring from "@/view/components/Ring/index";
import { getbridgeMainInfo } from "@/util/api";
import { getbridgeInspectInfo } from "@/util/api";
import { filterParams } from "@/util/commonFilter";
import { config } from "@/view/utils/common";
import Motor from "../../../../../library/motor";
Motor.Config.serverUrl = config.bridge.bimServer;
var projectId = localStorage.getItem("bridgeId");
import $ from 'jquery';
import moment from "moment";
export default {
  components: {
    Circles,
    Ring
  },
  data() {
    return {
      mouthnumS: "",
      lastCheck: "",
        flag:true,
      current: 1,
      pageSize: 10,
      ContentHeight: 500,
        project: null,
      percent: 0,
      data1: {
        title: "巡检总体评分",
        value: "",
        type: 1,
        color: "#21dcb7"
      },
      data4: {
        title: "已处理病害占比",
        value: 0,
        type: 2,
        color: "#ae41fd"
      },
      formInline: {
        blongStructural: ""
      },
      formData: {
        startTime: "",
        endTime: "",
        inspectStaff: "",
        componentType: "",
        component: "",
        diseaseSeverity: "",
        urgentType: ""
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
      bridgeId: this.$route.query.bridgeId,
      columns: [
        {
          title: "巡检时间",
          key: "inspectTime",
          align: "center"
        },
        {
          title: "上报人",
          key: "inspectStaff",
          align: "center"
        },
        {
          title: "病害墩号范围",
          key: "pierNoRange",
          align: "center"
        },
        {
          title: "所属构件类型",
          key: "componentType",
          align: "center"
        },
        {
          title: "所属构件",
          key: "component",
          align: "center"
        },
        {
          title: "病害描述",
          key: "diseaseDesc",
          align: "center"
        },
        {
          title: "轻重度",
          key: "diseaseSeverity",
          align: "center"
        },
        {
          title: "紧迫度",
          key: "urgentType",
          align: "center"
        },
        {
          title: "图片下载",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: require("../../../../assets/images/download.png")
                },
                style: {
                  width: "18px",
                  height: "18px",
                  position: "relative",
                  top: "5px"
                }
              }),
              h(
                "a",
                {
                  style: {
                    marginLeft: "5px"
                  },
                  on: {
                    click: () => {
                      exportFileService(params.row.fileUrl);
                    }
                  }
                },
                "下载"
              )
            ]);
          }
        }
      ],
      data: []
    };
  },
  created() {
    this.getbridge();
    getbridgeMainInfo().then(res => {
      this.mouthnumS = res.data.countCurrentQuarter;
      const lastInspectTime = res.data.lastInspectTime;
      this.lastCheck = `${lastInspectTime.slice(0, 4)}-${lastInspectTime.slice(
        4,
        6
      )}-${lastInspectTime.slice(6, 8)}`;
      this.data1.value = res.data.score;
      this.data4.value = Number(res.data.proportion) * 100;
    });
  },
  mounted() {
      const that = this;
      var projectId = localStorage.getItem("bridgeId");
      this.projectId = projectId;
      var viewer = new Motor.Viewer({
        container: "container",
        antialias: true,
        viewerMode: Motor.ViewerMode.BIM,
        appid: config.bridge.motorAppId,
        secret: config.bridge.motorSecret,
        backgroundImageCss: "url('/assets/images/login-bg.jpg')"
      });
      let project = viewer.queryProject(projectId);
      var currentSelectedComponent,selectedComponents=[],isolatedComponents=[],hiddenComponents=[],transparentComponents=[];
      this.project = project;
      viewer.initialize().then(function() {
        that.drawProject(projectId, true, false);

        //设置点选后的回调函数
         function highlightComponent(component,multi=false){
                //改变构件透明度
                if(multi){
                    selectedComponents.push(component);
                }
                else{
                    selectedComponents=[component]
                }
                project.selectComponents(selectedComponents);
                currentSelectedComponent=component;
            }  
            /* 监听鼠标事件 */
            viewer.addMouseEventListener(Motor.MouseEventType.LEFT_CLICK,function(mouse){
                var obj = viewer.pick(mouse.position,project);
                if (obj instanceof Motor.Component) {
                    var component = obj;
                    highlightComponent(component);
                }
                else{
                    project.deselectAllComponents();
                    selectedComponents=[];
                    currentSelectedComponent=undefined;
                }
                $('#infoBox').hide();
                $('#contextContainer').hide();
            });

			
            viewer.addMouseEventListener(Motor.MouseEventType.LEFT_CLICK,function(mouse){
                var obj = viewer.pick(mouse.position,project);
                if (obj instanceof Motor.Component) {
                    var component = obj;
                    highlightComponent(component,true);
                }
                else{
                    project.deselectAllComponents();
                    selectedComponents=[];
                    currentSelectedComponent=undefined;
                    $('#infoBox').hide();
                }
                $('#contextContainer').hide();
            },Motor.KeyboardEventModifier.CTRL);
			
            //双击飞向构件
            viewer.addMouseEventListener(Motor.MouseEventType.LEFT_DOUBLE_CLICK,function(mouse){
                var obj = viewer.pick(mouse.position,project);
                if (obj instanceof Motor.Component) {
                    //飞向构件
                    viewer.flyTo(obj);
                }
            })

           var contextContainer = document.getElementById('contextContainer');
            var contextmenu = document.getElementById('contextmenu');
            var liCount=0;
            var infoNames = {'major':'专业','floor':'楼层','main_type':'大类','sub_type':'小类'}
            contextmenu.childNodes.forEach(function(child){
                // console.log(child.tagName)
                if(child.tagName==="LI"){
                    switch(liCount){
                        case 0:
                            child.onclick=function(){
                                console.log("构件详情");
                                
                                currentSelectedComponent.getProperties().then(data=>{
                                    var tableStr = '';
                                    tableStr+=`<h3 style="color:white">${data.name?data.name:data.guid}</h3>`
                                    tableStr += `<div style="display: flex;width: 100%;justify-content: space-between; blackgroud-color:black;">
                                                        <span style="color:#bdbcbc;width:200px;border:1px solid grey;padding: 2px 2px;">GUID</span>
                                                        <span style="width:200px;border:1px solid grey;padding: 2px 2px;">${data.guid}</span>
                                                    </div>`;
                                    if(currentSelectedComponent.type == Motor.ProjType.TYPE_BIM){
                                        for (var key in infoNames) {
                                            tableStr += `<div style="display: flex;width: 100%;justify-content: space-between; blackgroud-color:black;">
                                                            <span style="color:#bdbcbc;width:200px;border:1px solid grey;padding: 2px 2px;">${infoNames[key]}</span>
                                                            <span style="width:200px;border:1px solid grey;padding: 2px 2px;">${data[key]}</span>
                                                        </div>`;
                                        }
                                    }
                                    let props = data?data.props:undefined;
                                    if(props && props.length>0){
                                        var groups = {};
                                        props.forEach(function(prop){
                                            if(prop.group){
                                                let groupIndex = undefined;
                                                for(let key in groups){
                                                    if(key===prop.group){
                                                        groupIndex=key;
                                                        break;
                                                    }
                                                }
                                                if(groupIndex){
                                                    groups[groupIndex].push({
                                                        name:prop.name,
                                                        value:prop.value,
                                                        unit:prop.unit
                                                    })
                                                }
                                                else{
                                                    groups[prop.group] = [{
                                                        name:prop.name,
                                                        value:prop.value,
                                                        unit:prop.unit
                                                    }]
                                                }
                                            }
                                            else{
                                                if(groups['属性']){
                                                    groups['属性'].push({
                                                        name:prop.name,
                                                        value:prop.value,
                                                        unit:prop.unit
                                                    })
                                                }
                                                else{
                                                    groups['属性'] = [{
                                                        name:prop.name,
                                                        value:prop.value,
                                                        unit:prop.unit
                                                    }];
                                                }
                                            }
                                        })

                                        for(let group in groups){
                                            let temp = '';
                                            groups[group].forEach(item=>{
                                                temp+=`
                                                    <div style="display: flex;width: 100%;justify-content: space-between; blackgroud-color:black;">
                                                        <span style="color:#bdbcbc;width:200px;border:1px solid grey;padding: 2px 2px;">${item.name}</span>
                                                        <span style="width:200px;border:1px solid grey;padding: 2px 2px;">${item.value?item.value:""} ${item.unit?item.unit:""}</span>
                                                    </div>
                                                `;
                                            })
                                            tableStr+=`<div>
                                                <div style="background-color:grey;">${group}</div>
                                                ${temp}
                                            </div>`;
                                        }
                                    }
                                    
                                    $('#infoBox').html(tableStr);
                                    $('#infoBox').show();
                                });
                                // contextContainer.setAttribute('style','display:none;');
                                $('#contextContainer').hide();
                            }
                            break;
                        case 1:
                            child.onclick=function(){
                                project.reset();
                                if(project.drawEdge){
                                    project.drawEdge=false;
                                }
                                console.log("隐藏选中构件");
                                hiddenComponents = hiddenComponents.concat(selectedComponents);
                                project.setComponentsVisiblity(false,hiddenComponents);
                                $('#contextContainer').hide();
                            }
                            break;
                        case 2:
                            child.onclick=function(){
                                project.reset();
                                if(project.drawEdge){
                                    project.drawEdge=false;
                                }
                                console.log("半透明选中构件");
                                transparentComponents = transparentComponents.concat(selectedComponents);
                                project.setComponentsColor(Motor.Color.WHITE.withAlpha(0.4),transparentComponents);
                                $('#contextContainer').hide();
                            }
                            break;
                        case 3:
                            child.onclick=function(){
                                project.reset();
                                if(project.drawEdge){
                                    project.drawEdge=false;
                                }
                                console.log("隔离选中构件");
                                isolatedComponents = isolatedComponents.concat(selectedComponents);
                                project.isolateComponents(isolatedComponents);
                                // isolateComponent = currentSelectedComponent;
                                $('#contextContainer').hide();
                            }
                            break;
                        case 4:
                            child.onclick=function(){
                                console.log("还原构件样式");
                                // if(currentProject.drawEdge){
                                //     currentProject.drawEdge=false;
                                // }
                                if(selectedComponents.length>0 || hiddenComponents.length>0 || transparentComponents.length>0 || isolatedComponents.length>0){
                                    hiddenComponents=[];
                                    transparentComponents=[];
                                    isolatedComponents=[];
                                    project.reset();
                                    project.selectComponents(selectedComponents);
                                }
                                $('#contextContainer').hide();
                            }
                            break;
                        default:
                            break;
                    }
                    liCount++;
                }
            })
            viewer.addMouseEventListener(Motor.MouseEventType.RIGHT_CLICK, function (mouse) {
                //根据屏幕坐标coords，获取点选的对象
                if (selectedComponents.length>0) {
                    let index=0;
                    contextmenu.childNodes.forEach(function(child){
                        if(child.tagName==="LI"){
                            if(index<4){
                                if(index===0 && selectedComponents.length>1){
                                    child.setAttribute('class','li-disable');
                                }
                                else{
                                    child.setAttribute('class','li');
                                }
                                index++;
                            }
                        }
                    })
                }
                else{
                    let index=0;
                    contextmenu.childNodes.forEach(function(child){
                        if(child.tagName==="LI"){
                            if(index<4){
                                child.setAttribute('class','li-disable');
                                index++;
                            }
                        }
                    })
                }
                contextContainer.setAttribute('style','z-index:9999;display:block;top:'+mouse.position.y+'px;left:'+mouse.position.x+'px;')
            })

      });
    window.addEventListener("scroll", this.load);
  },
  methods: {

            load(){
  if(document.getElementById('tableseven')){
  var oDiv =document.getElementById('tableseven').getElementsByTagName('table')[0],
          H = 0,
          Y = oDiv        
          while (Y) {
          H += Y.offsetTop; 
          Y = Y.offsetParent;
          }
      var s = document.body.scrollTop || document.documentElement.scrollTop
      if(s>H-500) {
         console.log(oDiv)
          oDiv.style = "position:fixed;top:500px;z-index:99"
      } else {
           oDiv.style = ""
      }
    }
  },
          drawProject(projectId, isInSubScene, aBd) {
      let that = this;
      this.project
        .open({
          drawEdge: isInSubScene
        })
        .then(function() {
          that.flag = false;
                      if(isInSubScene){
                    that.project.getTreeStructure().then(data=>{
                        var pTree = data;
                        if (pTree) {
                            let zTreeObj;
                            
                            // 重新设置数据
                            function reSetNodes(zTreeObj) {
                                let node = zTreeObj.getNodes();
                                let nodes = zTreeObj.transformToArray(node);
                                if (nodes.length > 0) {
                                    for (let i = 0; i < nodes.length; i++) {
                                        if (!nodes[i].children) {
                                            if (nodes[i].level === 3) {
                                                nodes[i].isParent = true;
                                            }
                                            nodes[i].nocheck = true;
                                            zTreeObj.updateNode(nodes[i]);
                                        }
                                    }
                                }
                            }
                            let setting = {
                                data: {
                                    key: {
                                        checked: "isChecked"
                                    }
                                },
                                view: {
                                    fontCss: { color: "white" }
                                },
                                check: {
                                    enable: true,       //设置是否显示checkbox复选框
                                },
                                callback: {
                                    onCheck: function (e, id, treeNode) {
                                        if(that.project.drawEdge){
                                            that.project.drawEdge = false;
                                        }
                                        that.project.setVisiblityFromTree(treeNode);
                                        let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                                        let nodes = treeObj.getCheckedNodes();
                                        let designIds = [];
                                        $.each(nodes, function (i, item) {
                                            designIds.push(item.id);
                                            item.checkedOld = item.checked;
                                        })
                                    },
                                    onClick: function (e, id, treeNode) {
                                        that.project.setComponentsColorFromTree(treeNode,Motor.Color.CYAN);
                                        $('#infobox').hide();
                                    },
                                    onDblClick: function (e, id, treeNode) {
                                        if (!treeNode.children && treeNode.level === 4) {
                                            let component = that.project.getComponentFromTree(treeNode);
                                            let innerHTML = '';
                                            for (var key in component.infos) {
                                                innerHTML += '<div title=' + component.infos[key] + '>' + key + ': ' + component.infos[key] + '</div>';
                                            }
                                            $('#infobox').html('<div title=' + component.guid + '>' + component.guid + '</div>' + innerHTML);
                                            $('#infobox').show();
                                            that.viewer.flyTo(component);
                                        }
                                        else {
                                            $('#infobox').hide();
                                        }
                                    },
                                    onExpand: function (event, treeId, treeNode) {
                                        if (treeNode.level === 3 && (!treeNode.children||tree.children.length)) {
                                            that.dynamicloadNodes(treeNode).then(function (data) {
                                                treeNode.children = [];
                                                zTreeObj.addNodes(treeNode, data)
                                                reSetNodes(zTreeObj)
                                            })
                                        }
                                    }
                                },
                            };
                            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, pTree);
                            zTreeObj.checkAllNodes(true);
                            reSetNodes(zTreeObj);
                            $('.tree_container').show();
                        }
                    });
                    
                } 
        });
    },
    // 动态加载数据
      dynamicloadNodes(treeNode) {
            return Motor.Project.getChildNodesFromTree(treeNode);
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
      if (body.startTime) {
        body.startTime =
          moment(body.startTime).format("YYYY") +
          moment(body.startTime).format("MM") +
          moment(body.startTime).format("DD") +
          "000000";
      }
      if (body.endTime) {
        body.endTime =
          moment(body.endTime).format("YYYY") +
          moment(body.endTime).format("MM") +
          moment(body.endTime).format("DD") +
          "235959";
      }
      getbridgeInspectInfo(body).then(res => {
        this.data = res.data;
      });
    },
    onChange(page) {
      this.current = page;
    },
    onSizeChange(paseSize) {
      this.pageSize = pageSize;
    },
     rowClick(params) {
      this.dodail(params.componentId);
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
<style scoped lang="less">
.Meter1 {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: left;
  margin-left: 40px;
}
.Meter1 .checkN {
  font-size: 18px;
  color: #4eecee;
}
.Meter1 .monthCheck {
  margin-top: 40px;
}
.Meter1 .lastCheck {
  margin-top: 20px;
}
.Meter1 .monthCheckValue {
  font-size: 24px;
  margin-right: 4px;
}
.Meter1 p span {
  font-size: 14px;
  color: #999;
}
.Meter1 .reasult {
  margin-left: 10px;
  color: #21dcb7;
}
.tableBox .inputStyle {
  margin-left: 25px;
  margin-bottom: 30px;
  margin-top: 30px;
}
#toolbar {
  position: absolute;
  padding-top: 8px;
  padding-bottom: 12px;
  padding-left: 10px;
  padding-right: 10px;
  top: 0;
  width: calc(100% - 60px);
}
.ClassInfo{
 position: fixed;
    right: 50px;
    top: 30px;
    width: 300px;
    z-index:999;
    background-color: #0d3541;
    padding: 20px;
    color: #fff;
  h5{
    font-size: 24px;
    margin-bottom: 15px;
  }
  li{
line-height:30px;
font-size: 16px;
  }
}
ul,li{
  list-style: none;
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
