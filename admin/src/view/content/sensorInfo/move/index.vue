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
        动挠度<img src="../../../../assets/images/dashed.png" />
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

    <div class="inputStyle">
      <Form
        :model="formData"
        label-position="right"
        class="right-search"
        inline
        :label-width="90"
      >
        <Row  type="flex" justify="start">
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
    ></Table>
    </div>
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
        title: "动扰度实时监测"
      },
      data3: {
        title: "传感器A动挠度实时监测图"
      },
      data4: {
        title: "最大车重实时监测图"
      },
      formData: {
        startTime: "",
        endTime: "",
        inspectStaff: ""
      },
      drawerImg: require("../../../../assets/images/down.png"),
      value3: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static",
        backgroundColor: "#04232c"
      },
      productTypeList: [
        { id: 0, name: "zip格式下载" },
        { id: 1, name: "xls格式下载" },
        { id: 2, name: "txt格式下载" }
      ],
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
            return h(
              "Select",
              {
                props: {
                  value: params.row.time, // 获取选择的下拉框的值
                  size: "small"
                },
                on: {
                  "on-change": e => {
                    console.log(e);

                    exportFileService(this.data[e].fileUrl);
                  }
                }
              },
              this.productTypeList.map(item => {
                // this.productTypeList下拉框里的data
                return h("Option", {
                  // 下拉框的值
                  props: {
                    value: item.id,
                    label: item.name
                  },
                  click: () => {
                    debugger;
                  }
                });
              })
            );
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
  mounted() {},
  methods: {
    onChange(page) {
      this.current = page;
    },
    onSizeChange(paseSize) {
      this.pageSize = pageSize;
    },
    rowClick(params) {
      this.src = params.row.bimUrl;
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
  }
}
</style>