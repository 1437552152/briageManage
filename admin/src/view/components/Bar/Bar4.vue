<template>
  <div class="chartStyle"
      :ref="className"
      style="width:100%;height:100%">
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  data() {
    return {};
  },
  methods: {
    initCharts() {
      let myChart = this.$echarts.init(this.$refs[this.className]);
      console.log(myChart);
      var data = [];
var labelData = [];
for (var i = 0; i < 100; ++i) {
    data.push({
        value: Math.random() * 10 + 10 - Math.abs(i - 12),
        name: i + ':00'
    });
    labelData.push({
        value: 1,
        name: this.flag=='1'?20:(this.flag=='2'?i:100),
        itemStyle:{
            normal: {
                color: "#094754"
            }
        }
    });
}
for(var i=0;i<labelData.length;++i){
    if(labelData[i].name < 60){
        labelData[i].itemStyle = {
            normal: {
             color: "#03f700"
         }
        }
    }
}

      myChart.setOption(
        {
    title: {
        text: this.dataObj.title,
        left: '47%',  
        textAlign: 'center',
        top: '40%',
        textStyle:{
            fontSize:20,
            color:'#fff'
        }
    },
    grid: {
        top: '0%',
        right: '0%',
        left: '0%',
        bottom: '1%'
    },
    series: [{
        hoverAnimation:false,
        type: 'pie',
        data: labelData,
        radius: ['45%', '60%'],
        itemStyle: {
            normal: {
                borderWidth:2,
                borderColor: '#094754'
            }
        },
        label: {
            normal: {
                position: 'inside',
                show:false,
            }
        }
    }]
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
    },
      flag: {
      type: String,
      default: "1"
    },
  }
};
</script>

<style lang="less"></style>
