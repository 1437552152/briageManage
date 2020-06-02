<template>
  <div class="tableBox">
    <iframe
      align="center"
      width="100%"
      :height="ContentHeight"
      :src="src"
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      scrolling="no"
    />
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
export default {
  components: {
    ModuleTwo,
    ModuleThree,
    ModuleFour
  },
  data() {
    return {
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
      src: localStorage.getItem("bimUrl"),
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
          title: "图纸下载",
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
          fileUrl: "http://111.4.119.69:40605/download/data.zip"
        },
        {
          time: "2020/2/16 0:00",
          p1: 8.277712127,
          p2: 8.602212127,
          p3: 8.926712127,
          fileUrl: "http://111.4.119.69:40605/download/data.xls"
        },
        {
          time: "2020/2/16 1:00",
          p1: 8.204359364,
          p2: 8.528859364,
          p3: 8.853359364,
          fileUrl: "http://111.4.119.69:40605/download/data.xls"
        }
      ]
    };
  },
  mounted() {
      window.addEventListener('scroll', this.load)
  },
  methods: {
     load(){
             var oDiv =document.getElementById('tablesix').getElementsByTagName('table')[0],
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
    onChange(page) {
      this.current = page;
    },
    onSizeChange(paseSize) {
      this.pageSize = pageSize;
    },
    rowClick(params) {
      this.src = params.row.bimUrl;
    },
    IconClick() {}
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
