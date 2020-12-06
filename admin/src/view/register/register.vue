<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2020-12-02 20:35:02
 * @LastEditTime: 2020-12-06 22:24:21
 * @LastEditors: yfye
-->
<template>
  <div id="container" style="width:100%;height:500px"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const appid = "a3e0bca8c90c4fa6bce0efac843896ae";
    const secret = "26181acfaa21d0f9b94d561d86041aba";
    const projectId = "72142317-1e84-4d64-acb6-2a6de7db9b45";
    let viewer = new Motor.Viewer({
      container: "container",
      viewerMode: Motor.ViewerMode.BIM,
      secret: secret,
      appid: appid,
      antialias: true,
      taaEnabled: true
    });
    viewer.initialize().then(function() {
      let project = viewer.queryProject(projectId);
      project.open().then(function(projects) {
        console.log("加载完成");
      });
    });
  },
  methods: {}
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

