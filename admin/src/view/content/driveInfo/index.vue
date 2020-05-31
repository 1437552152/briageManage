<template>
  <div class="homePic"></div>
</template>

<script>
export default {
  data() {
    return {
      bridgeId: this.$route.query.bridgeId,
    };
  },
  created() {},
  mounted() {},
  methods: {
    initCharts() {
      let myChart = this.$echarts.init(document.getElementById("two"));
      let option = {
        tooltip: {},
        backgroundColor: "#fff",
        visualMap: {
          show: false,
          dimension: 2,
          min: -1,
          max: 1,
          inRange: {
            color: [
              "#313695",
              "#4575b4",
              "#74add1",
              "#abd9e9",
              "#e0f3f8",
              "#ffffbf",
              "#fee090",
              "#fdae61",
              "#f46d43",
              "#d73027",
              "#a50026",
            ],
          },
        },
        xAxis3D: {
          type: "value",
        },
        yAxis3D: {
          type: "value",
        },
        zAxis3D: {
          type: "value",
        },
        grid3D: {
          viewControl: {},
        },
        series: [
          {
            type: "surface",
            equation: {
              x: {
                step: 0.05,
              },
              y: {
                step: 0.05,
              },
              z: function (x, y) {
                if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
                  return "-";
                }
                return Math.sin(x * Math.PI) * Math.sin(y * Math.PI);
              },
            },
          },
        ],
      };
      myChart.setOption(option, true);
    },
  },
};
</script>

<style lang="less" scoped>
.homePic {
  background: url(../../../assets/images/driveBg.png) no-repeat center center;
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
