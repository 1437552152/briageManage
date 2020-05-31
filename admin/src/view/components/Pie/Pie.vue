<template>
  <div style="display:flex;justify-content: center">
    <div
      class="chartStyle"
      :ref="className"
      style="width:500px;height:150px"
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
      console.log(this.dataObj);
      let myChart = this.$echarts.init(this.$refs[this.className]);
      const colorList = ["#ae41fd ", "#34ccff", "#6bcb60"];
      const that = this;
      myChart.setOption(
        {
          title: [
            {
              text: this.dataObj.title,
              left: "10%",
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
          tooltip: {
            trigger: "item"
          },
          legend: {
            type: "scroll",
            orient: "vertical",
            right: "0%",
            top: "center",
            itemGap: 5,
            selectedMode: false,
            icon: "pin",
            data: this.dataObj.value,
            textStyle: {
              color: "#77899c",
              rich: {
                uname: {
                  width: 50
                },
                unum: {
                  color: "rgba(255, 255, 255, 0.65)",
                  width: 40,
                  align: "right"
                }
              }
            },
            // formatter(name) {
            //   return `{uname|${name}}`;
            // }
            formatter: function(params) {
              let text = "";
              that.dataObj.data.map((item, index) => {
                if (item.name == params) {
                  text = params + ":" + item.value + "%";
                }
              });
              return text;
            }
          },
          color: colorList,
          series: [
            {
              name: this.dataObj.title,
              type: "pie",
              radius: [50, 60],
              center: ["50%", "50%"],
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              itemStyle: {
                borderWidth: 3,
                borderColor: "transparent"
              },
              data: this.dataObj.data
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
