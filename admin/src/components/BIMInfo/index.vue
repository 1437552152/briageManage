<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2020-12-03 22:05:34
 * @LastEditTime: 2020-12-07 21:36:38
 * @LastEditors: yfye
-->
<template>
<div style="position: sticky;top: 0;z-index: 101;">
 <img src="../../assets/images/big.png" class="fullscreenButton">
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
   <!--  <div class="moduleRe">
       <div id="loading">
          <div class="loading-image" style="background-image:url('http://47.107.180.202:40605/ezgif.com-crop.gif');">
              <div class="loadingNuliLoading">正在努力加载中...</div>
          </div>
        </div>
    </div> -->
    <div id="container" style="height:500px" />
    <div class="tree_container">
      <ul id="treeDemo" class="ztree"></ul>
    </div>
    </div>
</template>


<script>
  const appid = "a3e0bca8c90c4fa6bce0efac843896ae";
  const secret = "26181acfaa21d0f9b94d561d86041aba";
  const projectId =localStorage.getItem("bridgeId");
export default {
  data() {
    return {
      project: null,
      flag: true,
      isShowFullscreen:true,
    };
  },
  mounted() {
    const that = this;
    var viewer = new Motor.Viewer({
      container: "container",
      antialias: true,
      viewerMode: Motor.ViewerMode.BIM,
      appid,
      secret,
      backgroundImageCss: "url('/assets/images/login-bg.jpg')"
    });
    var currentSelectedComponent,
      selectedComponents = [],
      isolatedComponents = [],
      hiddenComponents = [],
      transparentComponents = [];
   
    viewer.initialize().then(function() {
      $(".cesium-viewer-fullscreenContainer").css("display", "none");
        let project = viewer.queryProject(projectId);
       that.project = project;
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
  methods:{
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
        // 动态加载数据
    dynamicloadNodes(treeNode) {
      return Motor.Project.getChildNodesFromTree(treeNode);
    },
    sing(params){
      const that = this;
      this.project.resetComponentsDefaultColor();
      this.project.setComponentsColor(Motor.Color.GREEN.withAlpha(0.4), [
        params
      ]);
    }
  }
};
</script>
<style lang="less" scoped>
#loading {
  display: block;
}
.cesium-viewer-fullscreenContainer {
  display: none;
}
#container{
  top:30px
}
</style>