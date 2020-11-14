<template>
  <div class="tableBox">
    <img src="../../../../assets/images/big.png" class="fullscreenButton">
    <div id="infoBox" style="display: none;z-index:9999"></div>
    <div id="contextContainer">
      <ul id="contextmenu">
        <li class="li">构件详情</li>
        <hr class="hr" />
        <li class="li">隐藏选中</li>
        <li class="li">半透明选中</li>
        <li class="li">隔离选中</li>
        <hr class="hr" />
        <li class="li">还原所有</li>
      </ul>
    </div>
    <div class="moduleRe">
       <div id="loading">
          <div class="loading-image" style="background-image:url('http://47.107.180.202:40605/ezgif.com-crop.gif');">
              <div class="loadingNuliLoading">正在努力加载中...</div>
          </div>
        </div>
    </div>
    <div id="container" style="height:500px" />
 
    <div class="tree_container">
      <ul id="treeDemo" class="ztree"></ul>
    </div>
    <div class="boxStyle"></div>
    <div class="titleTotal">
      <div class="title">
        总体信息<img src="../../../../assets/images/dashed.png" />
      </div>
    </div>

    <div class="totalInfoTable">
      <div class="title">总体-管理信息表</div>
      <div class="box">
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          align="center"
        >
          <tbody>
            <tr class="bridgeBim">
              <td>桥名</td>
              <td>总桥长</td>
              <td>建设单位</td>
              <td>项目管理单位</td>
              <td>项目性质</td>
              <td>投资主体</td>
              <td>施工单位</td>
              <td>勘查单位</td>
              <td>设计单位</td>
              <td>建设起始年月</td>
              <td>建成年月</td>
            </tr>
            <tr>
              <td>{{ briageParams.name }}</td>
              <td>{{ briageParams.mile }}</td>
              <td>{{ briageParams.buildUnit }}</td>
              <td>{{ briageParams.projectManagerUnit }}</td>
              <td>{{ briageParams.projectNature }}</td>
              <td>{{ briageParams.invest }}</td>
              <td>{{ briageParams.constructUnit }}</td>
              <td>{{ briageParams.exploreUnit }}</td>
              <td>{{ briageParams.designUnit }}</td>
              <td>{{ briageParams.beginTime }}</td>
              <td>{{ briageParams.endTime }}</td>
            </tr>
            <tr class="bridgeBim">
              <td>竣工验收年月</td>
              <td>建成年月</td>
              <td>管理单位</td>
              <td>养护单位</td>

              <td>接管年月</td>
              <td>移交年月</td>
              <td>接管移交范围</td>
              <td>接管移交移交历史</td>
              <td>执法单位</td>
              <td>管理桥长</td>
              <td>执法桥长</td>
            </tr>
            <tr>
              <td>{{ briageParams.checkTime }}</td>
              <td>{{ briageParams.endTime2 }}</td>
              <td>{{ briageParams.managerUnit }}</td>
              <td>{{ briageParams.maintainUnit }}</td>
              <td>{{ briageParams.takeOverTime }}</td>
              <td>{{ briageParams.turnOverTime }}</td>
              <td>{{ briageParams.overTime }}</td>
              <td>{{ briageParams.overList }}</td>
              <td>{{ briageParams.lawUnit }}</td>
              <td>{{ briageParams.managerMile }}</td>
              <td>{{ briageParams.lawMile }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="totalInfoTable">
      <div class="title">总体-结构信息表</div>
    </div>
    <div class="inputStyle">
      <Form :model="formData" class="right-search" inline :label-width="95">
        <Row type="flex" justify="start">
          <Col :xl="5" :xxl="4">
            <FormItem label="主线/匝道编号:">
              <Input
                v-model="formData.mainCode"
                placeholder="请输入主线/匝道编号"
              ></Input>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="主梁编号:">
              <Input
                v-model="formData.mainBeamCode"
                placeholder="请输入主梁编号"
              ></Input>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="墩号范围:">
              <Input v-model="formData.pierNoRange" placeholder=""></Input>
             <!--  <Select v-model="formData.pierNoRange">
                <Option value="P1-P4" key="1">P1-P4</Option>
              </Select> -->
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
    <div class="tableBorder">
      <Table
        :columns="columns"
        :data="data"
        highlight-row
        @on-row-click="rowClick"
        border
        id="tabletwo"
      ></Table>
    </div>
  </div>
</template>

<script>
import { exportFileService } from "@/view/utils/myFetch";
import { getbridgeStructInfo } from "@/util/api";
import { filterParams } from "@/util/commonFilter";
import { getbridgeBridgeInfo } from "@/util/api";

import { config } from "@/view/utils/common";
import Motor from "../../../../../library/motor";
Motor.Config.serverUrl = config.bridge.bimServer;

export default {
  data() {
    return {
      current: 1,
      isShowFullscreen:true,
      pageSize: 10,
      ContentHeight: 500,
      drawerImg: require("../../../../assets/images/down.png"),
      value3: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static",
        backgroundColor: "#04232c"
      }, //样式
      formData: {
        mainCode: "",
        mainBeamCode: "",
        pierNoRange: ""
      }, // 表单数据
      project: null,
      projectId: null,
       viewer:null,
      bridgeId: this.$route.query.bridgeId,
      briageParams: {}, //桥信息
      columns: [
        {
          title: "主线/匝道编号",
          key: "mainCode",
          align: "center"
        },
        {
          title: "主梁编号",
          key: "mainBeamCode",
          align: "center"
        },
        {
          title: "墩号范围",
          key: "pierNoRange",
          align: "center"
        },
        {
          title: "结构形式",
          /*           key: "", */
          align: "center",
          children: [
            {
              title: "桥跨布置",
              key: "structStyleAssign",
              align: "center"
            },
            {
              title: "桥面宽度(梁顶面宽)",
              key: "structStyleWidth",
              align: "center"
            },
            {
              title: "结构高度",
              key: "structStyleHeight",
              align: "center"
            },
            {
              title: "梁体特征",
              key: "",
              align: "center",
              render:(h,params)=>{return h('div',{},params.row.structStyleFeature1+','+params.row.structStyleFeature2)}
            /*   children: [
                {
                  key: "structStyleFeature1",
                  align: "center",
                  title: "属性设置"

                },
                {
                  key: "structStyleFeature2",
                  align: "center",
                  title: "属性设置"
                }
              ] */
            },
            {
              title: "桥墩",
              key: "structStylePier",
              align: "center"
            },
            {
              title: "基础",
              key: "structStyleBasic",
              align: "center"
            }
          ]
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
                      exportFileService(params.row.picUrl);
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
    this.getBriageList();
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
      this.viewer=viewer;
      let project = viewer.queryProject(projectId);
      var currentSelectedComponent,selectedComponents=[],isolatedComponents=[],hiddenComponents=[],transparentComponents=[];
      this.project = project;
      viewer.initialize().then(function() {
              $(".cesium-viewer-fullscreenContainer").css('display','none')
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
  },
  methods: {
    load() {
      if (document.getElementById("tabletwo")) {
        var oDiv = document
            .getElementById("tabletwo")
            .getElementsByTagName("table")[0],
          H = 0,
          Y = oDiv;
        while (Y) {
          H += Y.offsetTop;
          Y = Y.offsetParent;
        }
        var s = document.body.scrollTop || document.documentElement.scrollTop;
        if (s > H - 500) {
          console.log(oDiv);
          oDiv.style = "position:fixed;top:500px;z-index:99";
        } else {
          oDiv.style = "";
        }
      }
    },
    getbridge() {
      let body = {};
      body = filterParams(this.formData);
      body.bridgeId = this.bridgeId;
      getbridgeStructInfo(body).then(res => {
        this.data = res.data;
      });
    },
    getBriageList() {
      let that = this;
      getbridgeBridgeInfo().then(res => {
        res.data.map(item => {
          if (item.id === localStorage.getItem("bridgeId")) {
            that.briageParams = item;
          }
        });
      });
    },

    onChange(page) {
      this.current = page;
    },
    onSizeChange(paseSize) {
      this.pageSize = pageSize;
    },
    rowClick(params) {},
    handleSubmit(name) {
      this.getbridge();
    },
    handleReset(name) {
      for (let key in this.formData) {
        this.formData[key] = "";
      }
      this.getbridge();
    },
    drawProject(projectId, isInSubScene, aBd) {
      let that = this;
      this.project
        .open({
          drawEdge: isInSubScene
        })
        .then(function() {
          that.flag = false;
            $('#loading').hide();
            window.addEventListener("scroll", that.load);
            /* 初始化 */
            $(".fullscreenButton").click(function(){
              if(that.isShowFullscreen){
                $("#container").css('height',$(window).height()+'px');
                that.isShowFullscreen=!that.isShowFullscreen;
              }else{
                $("#container").css('height','500px');
                that.isShowFullscreen=!that.isShowFullscreen;
              }
            })
          if (isInSubScene) {
            that.project.getTreeStructure().then(data => {
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
                    enable: true //设置是否显示checkbox复选框
                  },
                  callback: {
                    onCheck: function(e, id, treeNode) {
                      if (that.project.drawEdge) {
                        that.project.drawEdge = false;
                      }
                      that.project.setVisiblityFromTree(treeNode);
                      let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                      let nodes = treeObj.getCheckedNodes();
                      let designIds = [];
                      $.each(nodes, function(i, item) {
                        designIds.push(item.id);
                        item.checkedOld = item.checked;
                      });
                    },
                    onClick: function(e, id, treeNode) {
                      that.project.setComponentsColorFromTree(
                        treeNode,
                        Motor.Color.CYAN
                      );
                      $("#infobox").hide();
                    },
                    onDblClick: function(e, id, treeNode) {
                      if (!treeNode.children && treeNode.level === 4) {
                        let component = that.project.getComponentFromTree(
                          treeNode
                        );
                        let innerHTML = "";
                        for (var key in component.infos) {
                          innerHTML +=
                            "<div title=" +
                            component.infos[key] +
                            ">" +
                            key +
                            ": " +
                            component.infos[key] +
                            "</div>";
                        }
                        $("#infobox").html(
                          "<div title=" +
                            component.guid +
                            ">" +
                            component.guid +
                            "</div>" +
                            innerHTML
                        );
                        $("#infobox").show();
                        that.viewer.flyTo(component);
                      } else {
                        $("#infobox").hide();
                      }
                    },
                    onExpand: function(event, treeId, treeNode) {
                      if (
                        treeNode.level === 3 &&
                        (!treeNode.children || tree.children.length)
                      ) {
                        that.dynamicloadNodes(treeNode).then(function(data) {
                          treeNode.children = [];
                          zTreeObj.addNodes(treeNode, data);
                          reSetNodes(zTreeObj);
                        });
                      }
                    }
                  }
                };
                zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, pTree);
                zTreeObj.checkAllNodes(true);
                reSetNodes(zTreeObj);
                $(".tree_container").show();
              }
            });
          }
        });
    },
    // 动态加载数据
    dynamicloadNodes(treeNode) {
      return Motor.Project.getChildNodesFromTree(treeNode);
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

.tableBox {
  padding-bottom: 100px;
}
.inputStyle {
  margin-top: 40px;
  // margin-bottom: 30px;
}

.totalInfoTable {
  .title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .box {
    margin-left: 35px;
    margin-right: 35px;
  }
  table {
    border-top: 1pt solid #33405a;
    border-left: 1pt solid #33405a;
    margin: 0 auto;

    margin-bottom: 60px;
  }
  td {
    padding: 10px 10px;
    text-align: center;
    border-right: 1pt solid #33405a;
    border-bottom: 1pt solid #33405a;
    color: #515a6e;
  }

  .bridgeBim td {
    color: #fff;
    font-weight: bold;
  }

  tr:nth-of-type(odd) {
    // background: #c6f9f7;
  } /* odd 标识奇数行，even标识偶数行 */
  tr:hover {
    // background: #e0f0f0;
  } /*鼠标悬停后表格背景颜色*/
  
}

</style>
