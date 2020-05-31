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
        布置及状态<img src="../../../../assets/images/dashed.png" />
      </div>
    </div>
    <div class="Meter1">
      <Pie
        className="container1"
        type="InstrumentPanel"
        :dataObj="data1"
        v-if="data1.value.length"
      />
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
          <Col :xl="4" :xxl="4">
            <FormItem label="传感器类型:">
              <Select v-model="formData.sensorType">
                <Option value="静挠度" key="1">静挠度</Option>
                <Option value="动挠度" key="2">动挠度</Option>
                <Option value="裂缝计" key="3">裂缝计</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xl="4" :xxl="4">
            <FormItem label="编号:">
              <Input v-model="formData.sensorCode" placeholder="" />
            </FormItem>
          </Col>
          <Col :xl="4" :xxl="4">
            <FormItem label="型号:">
              <Input v-model="formData.sensorModel" placeholder="" />
            </FormItem>
          </Col>
          <Col :xl="4" :xxl="4">
            <FormItem label="坐标:">
              <Input v-model="formData.centerSite" placeholder="" />
            </FormItem>
          </Col>
          <Col :xl="4" :xxl="4">
            <Button type="primary" @click="handleSubmit('formValidate')"
              >查询</Button
            >
            <Button @click="handleReset" style="margin-left: 8px">重置</Button>
          </Col>
        </Row>
      </Form>
    </div>

    <Table
      :columns="columns"
      :data="data"
      highlight-row
      @on-row-click="rowClick"
    ></Table>
    <!--   <div class="pagePosition pageStyle">
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
import { getbridgeSensorInfo, getsensorInfo } from "@/util/api";
import { filterParams } from "@/util/commonFilter";
import Pie from "@/view/components/Pie/Pie";
export default {
  components: {
    Pie
  },
  data() {
    return {
      current: 1,
      pageSize: 10,
      ContentHeight: 500,
      formInline: {
        name: ""
      },
      data1: {
        title: "传感器类型",
        value: [],
        data: []
      },
      bridgeId: this.$route.query.bridgeId,
      formData: {
        sensorType: "",
        sensorCode: "",
        sensorModel: "",
        centerSite: ""
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

      src: localStorage.getItem("bimUrl"),
      columns: [
        {
          title: "传感器类型",
          key: "sensorType",
          align: "center"
        },
        {
          title: "编号",
          key: "sensorCode",
          align: "center"
        },
        {
          title: "型号",
          key: "sensorModel",
          align: "center"
        },
        {
          title: "状态",
          key: "statue",
          align: "center"
        },
        {
          title: "异常原因",
          key: "reason",
          align: "center"
        },
        {
          title: "处理情况",
          key: "dealStatue",
          align: "center"
        },
        {
          title: "附着构件",
          key: "attachStruct",
          align: "center"
        },
        {
          title: "中心坐标",
          key: "centerSite",
          align: "center"
        },
        {
          title: "最新一次维修信息",
          key: "fixMsg",
          align: "center"
        }
      ],
      data: []
    };
  },
  created() {
    this.getbridge();
  },
  mounted() {},
  methods: {
    getbridge() {
      const that = this;
      getsensorInfo().then(res => {
        // this.data1.value = res.data;
        let a = [];
        let b = [];
        for (let key in res) {
          a.push(key);
          let params = {};
          params.name = key;
          params.value = Number(res[key]) * 100;
          b.push(params);
        }
        that.data1.value = a;
        that.data1.data = b;
      });
      let body = {};
      body = filterParams(this.formData);
      body.bridgeId = this.bridgeId;
      getbridgeSensorInfo(body).then(res => {
        this.data = res.data;
      });
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
    handleSubmit(name) {
      this.getbridge();
    },
    handleReset() {
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
.tableBox .inputStyle {
  margin-left: 20px;
}
</style>
