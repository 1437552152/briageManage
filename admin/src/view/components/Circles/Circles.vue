<template>
  <div>
    <div
      class="chartStyle"
      :ref="className"
      style="width:400px;height:150px"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    initCharts() {
      let myChart = this.$echarts.init(this.$refs[this.className]);
      myChart.setOption(
        {
          title: [
            {
              text: this.dataObj.title,
              left: "40%",
              top: "40%",
              textAlign: "center",
              textStyle: {
                fontWeight: "normal",
                fontSize: "14",
                color: "#999",
                textAlign: "center"
              }
            }
          ],
          series: [
            {
              type: "liquidFill",
              data: [
                {
                  name: this.dataObj.value,
                  value: this.dataObj.value / 100
                }
              ],
              radius: "60%",
              center: ["70%", "50%"],
              name: `${this.dataObj.value}${
                this.dataObj.type === 1 ? "分" : "%"
              }`,
              animationDuration: 0,
              animationDurationUpdate: 0,
              outline: {
                borderDistance: 0,
                itemStyle: {
                  borderWidth: 3,
                  borderColor: this.dataObj.color,
                  shadowBlur: 10
                }
              },
              label: {
                formatter: "{b}" + `${this.dataObj.type === 1 ? "分" : "%"}`,
                fontSize: 16,
                color: this.dataObj.color
              }
            }
          ]
        },
        true
      );
    }
  },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      that.initCharts();
    });
  },
  props: {
    type: {
      type: String,
      default: "InstrumentPanel"
    },
    className: {
      type: String,
      default: "container"
    },
    data: {
      type: Array
    },
    dataObj: {
      type: Object,
      default: null
    }
  }
};
</script>

<style lang="less"></style>
