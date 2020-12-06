<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2020-12-03 22:05:34
 * @LastEditTime: 2020-12-06 23:32:31
 * @LastEditors: yfye
-->
<template>
    <div class="module">
      <div id="container" style="height:590px" />
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
#loading {
  display: block;
}
.cesium-viewer-fullscreenContainer {
  display: none;
}
</style>