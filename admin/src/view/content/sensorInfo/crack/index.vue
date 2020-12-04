<template>
  <div class="tableBox">
    <BIMInfo />     
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
  </div>
</template>
<script>
import { exportFileService } from "@/view/utils/myFetch";
import ModuleTwo from "@/view/components/ModuleTwo/ModuleTwo.vue";
import ModuleThree from "@/view/components/ModuleThree/ModuleThree.vue";
import ModuleFour from "@/view/components/ModuleFour/ModuleFour.vue";
import BIMInfo from "@/components/BIMInfo/index";
import dataTotal from "./exportData";
export default {
  components: {
    ModuleTwo,
    ModuleThree,
    ModuleFour,
    BIMInfo
  },
  data() {
    return {
      bridgeId: this.$route.query.bridgeId,
      current: 1,
      pageSize: 10,
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
      columns:dataTotal.data1,
      data:dataTotal.data2
    };
  },
  methods: {
    rowClick(params) {
     
    },
    IconClick() {},
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
