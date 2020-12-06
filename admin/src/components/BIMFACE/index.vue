<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2020-12-02 20:35:02
 * @LastEditTime: 2020-12-06 23:22:10
 * @LastEditors: yfye
-->
<template>
   <div :class="{module:flag==1?true:false}">
    <div id="domId" :style="{height:flag==1?'100%':'500px'}"></div>
   </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
     viewer3D:null,
     app:null,
     viewToken:localStorage.getItem("viewToken")||'9f8850874f5d4cada47e9700c4e0ad95',

    };
  },
  props: {
    flag: {
        default:1
    }
},
  mounted() {
        var options = new BimfaceSDKLoaderConfig();
        options.viewToken = this.viewToken;
        BimfaceSDKLoader.load(options, this.successCallback, this.failureCallback);
  },
  methods: {
    failureCallback(error) {
      console.log(error);
    },
    successCallback(viewMetaData) {
       const that=this;
       if (viewMetaData.viewType == "3DView") {
               // 获取DOM元素
                var dom4Show = document.getElementById('domId');
                var webAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
                webAppConfig.domElement = dom4Show;
                // 创建WebApplication
                that.app = new Glodon.Bimface.Application.WebApplication3D(webAppConfig);

                var color1 = new Glodon.Web.Graphics.Color("#0b212b", 0.8);
               
                // 添加待显示的模型
                that.app.addView(that.viewToken);
                // 从WebApplication获取viewer3D对象
                that.viewer3D = that.app.getViewer();
                 that.viewer3D.setBackgroundColor(color1);
                // 监听添加view完成的事件
                that.viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, function () {

                    // 调用viewer3D对象的Method，可以继续扩展功能
                    //自适应屏幕大小
                    window.onresize = function () {
                        that.viewer3D.resize(document.documentElement.clientWidth, document.documentElement
                            .clientHeight - 40);
                    }
                    // 渲染3D模型
                    that.viewer3D.render();
                });
            }
  }
}
}
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
/* #domId {
  flex: 1;
  height: 500px;
} */
</style>