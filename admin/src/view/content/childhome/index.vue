<template>
  <div class="tableBox">
    <div class="leftPart">
      <BIMLUBAN />
      <div class="moduleB">
        <div style="width:100%;height:100%">
          <Bar1 class="container1" type="InstrumentPanel" :dataObj="data1" v-if="data1.valueX" />
        </div>
      </div>
    </div>
    <div class="leftPart rightPart">
      <div class="module">
        <div class="partTop">
          <div
            style="color:#4EECEE;font-size:20px;padding:20px 0;box-sizing:border-box;height:60px;line-height:30px"
          >各类传感器利用率</div>
          <div style="width:100%;height:calc((100% - 80px) / 3 )">
            <div style="width:100%;height:100%">
              <Bar3 class="container1" type="InstrumentPanel" :dataObj="data3" v-if="data3.value" />
            </div>
          </div>
          <div style="width:100%;height:calc((100% - 80px) / 3 );margin-top:10px">
            <div style="width:100%;height:100%">
              <Bar3 class="container1" type="InstrumentPanel" :dataObj="data4" v-if="data4.value" />
            </div>
          </div>
          <div style="width:100%;height:calc((100% - 80px) / 3 );margin-top:10px">
            <div style="width:100%;height:100%">
              <Bar3 class="container1" type="InstrumentPanel" :dataObj="data5" v-if="data5.value" />
            </div>
          </div>
        </div>
        <div class="partBot">
          <div style="width:calc((100% - 20px) / 3 );height:100%;float:left">
            <div
              style="color:#4EECEE;font-size:20px;height:30px;padding:30px 0;box-sizing:border-box;text-align:center"
            >结构状态</div>
            <div style="width:100%;height:calc(100% - 30px)">
              <Bar4
                class="container1"
                type="InstrumentPanel"
                :dataObj="data6"
                flag="1"
                v-if="data6.value"
              />
            </div>
          </div>

          <div style="width:calc((100% - 20px) / 3 );height:100%;float:left;margin-left:10px">
            <div
              style="color:#4EECEE;font-size:20px;height:30px;padding:30px 0;box-sizing:border-box;text-align:center"
            >最近巡检状况</div>
            <div style="width:100%;height:calc(100% - 30px)">
              <Bar4
                class="container1"
                type="InstrumentPanel"
                :dataObj="data7"
                flag="2"
                v-if="data7.value"
              />
            </div>
          </div>

          <div style="width:calc((100% - 20px) / 3 );height:100%;float:left;margin-left:10px">
            <div
              style="color:#4EECEE;font-size:20px;font-weight:bold;height:30px;padding:30px 0;box-sizing:border-box;text-align:center"
            >预警信息</div>
            <div style="width:100%;height:calc(100% - 30px)">
              <Bar4
                class="container1"
                type="InstrumentPanel"
                flag="3"
                :dataObj="data8"
                v-if="data8.value"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="moduleB">
        <div style="width:100%;height:100%">
          <Bar2 class="container1" type="InstrumentPanel" :dataObj="data2" v-if="data2.valueX" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bar1 from "@/view/components/Bar/Bar1";
import Bar2 from "@/view/components/Bar/Bar2";
import Bar3 from "@/view/components/Bar/Bar3";
import Bar4 from "@/view/components/Bar/Bar4";
import BIMLUBAN from "@/components/BIMLUBAN/index";
import dataTotal from "./exportData";
export default {
  components: {
    Bar1,
    Bar2,
    Bar3,
    Bar4,
    BIMLUBAN
  },
  data() {
    return {
      data1: dataTotal.data1,
      data2: dataTotal.data2,
      data3: dataTotal.data3,
      data4: dataTotal.data4,
      data5: dataTotal.data5,
      data6: dataTotal.data6,
      data7: dataTotal.data7,
      data8: dataTotal.data8,
      ContentHeight: "100%"
    };
  }
};
</script>

<style lang="less" scoped>
.tableBox {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.leftPart {
  width: calc((100% - 70px) / 2);
  height: 100%;
  float: left;
  position: relative;
}
.rightPart {
  margin-left: 70px;
}
.module {
  width: 100%;
  height: calc(((100% - 52px) / 3) * 2);
  position: relative;
}
.moduleB {
  width: 100%;
  height: calc((100% - 52px) / 3);
  margin-top: 50px;
  border: 1px solid #4eecee;
  border-radius: 10px;
}
.partTop {
  width: 100%;
  height: 60%;
}
.partBot {
  width: 100%;
  height: 40%;
}
</style>
