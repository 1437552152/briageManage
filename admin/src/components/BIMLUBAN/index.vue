<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2020-12-03 22:05:34
 * @LastEditTime: 2020-12-04 21:26:23
 * @LastEditors: yfye
-->
<template>
  <div>
    <div class="moduleRe">
      <div id="loading">
        <div
          class="loading-image"
          style="background-image:url('http://47.107.180.202:40605/ezgif.com-crop.gif');"
        >
          <div class="loadingNuliLoading">正在努力加载中...</div>
        </div>
      </div>
    </div>
    <div class="module">
      <div id="container" style="height:550px" />
    </div>
  </div>
</template>

<script>
import { config } from "@/view/utils/common";
import Motor from "../../../library/motor";
Motor.Config.serverUrl = config.bridge.bimServer;
export default {
  data() {
    return {
      project: null,
      projectId: null,
      bridgeId: this.$route.query.bridgeId
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
    let project = viewer.queryProject(projectId);
    var currentSelectedComponent,
      selectedComponents = [],
      isolatedComponents = [],
      hiddenComponents = [],
      transparentComponents = [];
    this.project = project;
    viewer.initialize().then(function() {
      $(".cesium-viewer-fullscreenContainer").css("display", "none");
      that.drawProject(projectId, true, false);

      //设置点选后的回调函数
      function highlightComponent(component, multi = false) {
        //改变构件透明度
        if (multi) {
          selectedComponents.push(component);
        } else {
          selectedComponents = [component];
        }
        project.selectComponents(selectedComponents);
        currentSelectedComponent = component;
      }
      /* 监听鼠标事件 */
      viewer.addMouseEventListener(Motor.MouseEventType.LEFT_CLICK, function(
        mouse
      ) {
        var obj = viewer.pick(mouse.position, project);
        if (obj instanceof Motor.Component) {
          var component = obj;
          highlightComponent(component);
        } else {
          project.deselectAllComponents();
          selectedComponents = [];
          currentSelectedComponent = undefined;
        }
        $("#infoBox").hide();
        $("#contextContainer").hide();
      });

      viewer.addMouseEventListener(
        Motor.MouseEventType.LEFT_CLICK,
        function(mouse) {
          var obj = viewer.pick(mouse.position, project);
          if (obj instanceof Motor.Component) {
            var component = obj;
            highlightComponent(component, true);
          } else {
            project.deselectAllComponents();
            selectedComponents = [];
            currentSelectedComponent = undefined;
            $("#infoBox").hide();
          }
          $("#contextContainer").hide();
        },
        Motor.KeyboardEventModifier.CTRL
      );

      //双击飞向构件
      viewer.addMouseEventListener(
        Motor.MouseEventType.LEFT_DOUBLE_CLICK,
        function(mouse) {
          var obj = viewer.pick(mouse.position, project);
          if (obj instanceof Motor.Component) {
            //飞向构件
            viewer.flyTo(obj);
          }
        }
      );
    });
  },
  methods: {
    drawProject(projectId, isInSubScene, aBd) {
      let that = this;
      this.project
        .open({
          drawEdge: isInSubScene
        })
        .then(function() {
          that.flag = false;
          $("#loading").hide();
          $(".cesium-viewer-fullscreenContainer").css("display", "none");
        });
    }
  }
};
</script>
<style lang="less" scoped>
.moduleRe {
  position: absolute;
  width: calc((100% - 70px) / 2);
  height: 50%;
}
#loading {
  display: block;
}
.cesium-viewer-fullscreenContainer {
  display: none;
}
</style>