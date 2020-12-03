<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2020-12-02 20:35:02
 * @LastEditTime: 2020-12-03 23:13:33
 * @LastEditors: yfye
-->
<template>
  <div class="main">
    <div id="domId"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      viewToken: "10c649e8832743119d856e00ff9aea0e",
      viewer2D: "",
      app: "",
      viewLoaded: false,
      drawingFrame: null,
      drawingCount: null
    };
  },
  mounted() {
    var loaderConfig = new BimfaceSDKLoaderConfig();
    loaderConfig.viewToken = this.viewToken;
    BimfaceSDKLoader.load(
      loaderConfig,
      this.successCallback,
      this.failureCallback
    );
  },
  methods: {
    failureCallback(error) {
      console.log(error);
    },
    successCallback(viewMetaData) {
      var dom4Show = document.getElementById("domId");
      // 设置WebApplicationDrawing的配置项
      var webAppConfig = new Glodon.Bimface.Application.WebApplicationDrawingConfig();
      webAppConfig.domElement = dom4Show;
      // 创建WebApplicationDrawing，用以显示模型
      this.app = new Glodon.Bimface.Application.WebApplicationDrawing(
        webAppConfig
      );
      this.app.load(this.viewToken);
      this.viewer2D = this.app.getViewer();
      // 添加视口变化的监听事件
      this.viewer2D.addEventListener(
        Glodon.Bimface.Viewer.ViewerDrawingEvent.Loaded,
        function(data) {
          window.onresize = function() {
            this.viewer2D.resize(
              document.documentElement.clientWidth,
              document.documentElement.clientHeight - 40
            );
          };
          this.viewLoaded = true;
          // 获取拆图结果
          if (!drawingCount) {
            this.viewer2D.getDrawingFrame(function(data) {
              this.drawingFrame = data.data[0].frames;
              this.drawingCount = drawingFrame.length;
            });
          }
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

.buttons {
  font-size: 0;
}

.button {
  margin: 5px 0 5px 5px;
  width: 100px;
  height: 30px;
  border-radius: 3px;
  border: none;
  background: #32d3a6;
  color: #ffffff;
}

.main {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}
#domId {
  flex: 1;
  height: 500px;
}
</style>

