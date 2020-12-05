<template>
  <div class="tableBox">
   <div class="qiehuanPosition">
    <RadioGroup v-model="type"  @on-change="onChangeType">
        <Radio label="2">广联达</Radio>
        <Radio label="1">鲁班</Radio>
    </RadioGroup>
  </div>
    <BIMInfo v-if="type==1" />
    <BIMFACE  v-if="type==2" flag=2 />
    <div class="boxStyle"></div>
    <div class="titleTotal">
      <div class="title">
        动挠度<img src="../../../../assets/images/dashed.png" />
      </div>
    </div>
    <div class="module">
      <div class="partS">
        <div class="line" v-if="flag">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
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

    <div class="inputStyle">
      <Form
        :model="formData"
        label-position="right"
        class="right-search"
        inline
        :label-width="90"
      >
        <Row type="flex" justify="start">
          <Col :xl="5" :xxl="4">
            <FormItem label="开始时间">
              <DatePicker
                type="date"
                v-model="formData.startTime"
                placeholder="请选择开始时间"
                style="width: 100%;"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="结束时间">
              <DatePicker
                type="date"
                v-model="formData.endTime"
                placeholder="请选择结束时间"
                style="width: 100%;"
              ></DatePicker>
            </FormItem>
          </Col>

          <Col :xl="5" :xxl="4">
            <FormItem label="采样频率">
              <Input v-model="formData.inspectStaff" placeholder=""></Input>
            </FormItem>
          </Col>
          <Col :xl="3" :xxl="3">
            <Button type="primary" @click="handleSubmit('formValidate')"
              >查询</Button
            >
            <Button @click="handleReset" style="margin-left: 8px">重置</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="selectStyle">
      <Table
        :columns="columns"
        :data="data"
        highlight-row
        @on-row-click="rowClick"
        style="margin-bottom:50px;"
        id="tablefive"
      ></Table>
    </div>
  </div>
</template>
<script>
import { exportFileService } from "@/view/utils/myFetch";
import ModuleTwo from "@/view/components/ModuleTwo/ModuleTwo.vue";
import ModuleThree from "@/view/components/ModuleThree/ModuleThree.vue";
import ModuleFour from "@/view/components/ModuleFour/ModuleFour.vue";
import BIMInfo from "@/components/BIMInfo/index";
import BIMFACE from "@/components/BIMFACE/index";
import dataTotal from "./exportData";
export default {
  components: {
    ModuleTwo,
    ModuleThree,
    ModuleFour,
    BIMInfo,
    BIMFACE
  },
  data() {
    return {
      bridgeId: this.$route.query.bridgeId,   
      formInline: {
        name: ""
      },
      data2: {
        title: "动扰度实时监测图"
      },
      data3: {
        title: "传感器1动挠度实时监测图"
      },
      data4: {
        title: "最大车重实时监测图"
      },
      formData: {
        startTime: "",
        endTime: "",
        inspectStaff: ""
      },
      productTypeList:dataTotal.data3,
      columns:dataTotal.data1,
      data:dataTotal.data2 ,
    type: localStorage.getItem('type')||"2"
    };
  },
  methods: {
    rowClick(params) {
     
    },
    IconClick() {},
    handleSubmit(name) {
      this.getbridge();
    },
    handleReset(name) {
      for (let key in this.formData) {
        this.formData[key] = "";
      }
      this.getbridge();
    },
         onChangeType(type){
      localStorage.setItem('type',type)
    }
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
      position: relative;
    .line {
      position: absolute;
      top: 48%;
      z-index:9;
      width: 300px;
      transform: rotate(32deg);
      left: 35%;
      .line1,.line2,.line3 {
        height: 2px;
        border-radius: 2px;
        margin-top:25px;
        width:50%;
      }
.line1{
  background-color: #ba72bf;
}
.line2{
  background-color:  #ba72bf;
}
.line3{
   background-color: #ba72bf;
 
}

     
    }
  }
}
</style>
