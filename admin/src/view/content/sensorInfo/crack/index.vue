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
        裂缝<img src="../../../../assets/images/dashed.png" />
      </div>
    </div>
    <div class="module">
      <div class="partS">
        <ModuleTwo
          className="container2"
          type="InstrumentPanel2"
          :dataObj="data2"
        ></ModuleTwo>
      </div>
      <div class="partS">
        <ModuleThree
          className="container3"
          type="InstrumentPanel3"
          :dataObj="data3"
        ></ModuleThree>
      </div>
      <div class="partS">
        <ModuleFour
          className="container4"
          type="InstrumentPanel4"
          :dataObj="data4"
        ></ModuleFour>
      </div>
    </div>

    <Table
      :columns="columns"
      :data="data"
      highlight-row
      @on-row-click="rowClick"
      id="tablesix"
    ></Table>
    <!--  <div class="pagePosition pageStyle">
      <Page
        :total="data.length"
        show-elevator
        show-sizer
        :current="current"
        :page-size="pageSize"
        show-total
        @on-change="onChange"
        @on-page-size-change="onSizeChange"
      />
    </div> -->
  </div>
</template>
<script>
import { exportFileService } from "@/view/utils/myFetch";
import ModuleTwo from "@/view/components/ModuleTwo/ModuleTwo.vue";
import ModuleThree from "@/view/components/ModuleThree/ModuleThree.vue";
import ModuleFour from "@/view/components/ModuleFour/ModuleFour.vue";
import { config } from "@/view/utils/common";
import Motor from "../../../../../library/motor";
Motor.Config.serverUrl = config.bridge.bimServer;

export default {
  components: {
    ModuleTwo,
    ModuleThree,
    ModuleFour
  },
  data() {
    return {
        project: null,
      projectId:null,
       viewer:null,
      bridgeId: this.$route.query.bridgeId,
             isShowFullscreen:true,
      current: 1,
      pageSize: 10,
      ContentHeight: 500,
      formInline: {
        name: ""
      },
      data2: {
        title: "主梁裂缝实时检测"
      },
      data3: {
        title: "传感器A裂缝实时监测图"
      },
      data4: {
        title: "最大车重实时监测图"
      },
      columns: [
        {
          title: "时刻",
          key: "time",
          align: "center"
        },
        {
          title: "传感器A",
          key: "p1",
          align: "center"
        },
        {
          title: "传感器B",
          key: "p2",
          align: "center"
        },
        {
          title: "传感器C",
          key: "p3",
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
      data: [
        {
          time: "2020/2/16 0:00",
          p1: 8.403084183,
          p2: 8.727584183,
          p3: 9.052084183,
          fileUrl: "https://mobile.yyf2gml.site/download/data.zip"
        },
        {
          time: "2020/2/16 0:00",
          p1: 8.277712127,
          p2: 8.602212127,
          p3: 8.926712127,
          fileUrl: "https://mobile.yyf2gml.site/download/data.xls"
        },
        {
          time: "2020/2/16 1:00",
          p1: 8.204359364,
          p2: 8.528859364,
          p3: 8.853359364,
          fileUrl: "https://mobile.yyf2gml.site/download/data.xlsx"
        }
      ]
    };
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
   load(){
  if(document.getElementById('tablesix')){
  var oDiv =document.getElementById('tablesix').getElementsByTagName('table')[0],
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

    onChange(page) {
      this.current = page;
    },
    onSizeChange(paseSize) {
      this.pageSize = pageSize;
    },
    rowClick(params) {
     
    },
    IconClick() {},
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

.module {
  display: flex;
  justify-content: space-around;
  margin: 0 30px 15px 30px;

  .partS {
    margin: 20px;
    border: 1px solid rgba(78, 236, 238, 0.33);
    border-radius: 10px;
    border-radius: 10px;
  }
}
</style>
