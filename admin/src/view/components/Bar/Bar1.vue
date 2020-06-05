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
      // 指标
var subjects =this.dataObj.valueX;
// 评分
var grade = this.dataObj.valueY;
// 90-100分颜色
var good = '#00D481';
// 80-90分颜色
var pass = '#0E8BF8';
// 0-70分颜色
var noPass = '#E4C205';
var color=[];
// 判断颜色
grade.forEach(function(item,index){
    if(item<=70){
        color.push(noPass);
    }else if(item>70&&item<=90){
        color.push(pass);
    }else{
        color.push(good);
    }
});
      console.log(myChart);
      myChart.setOption(
        {
 title: {
        text: this.dataObj.title,
        x:'left',
        top:'2%',
        textStyle:{
           fontSize:26,
           color:'#4EECEE'
        }
    },
    
legend: {
//   data:['0~70分'],
  top:0,
  icon:'rect',
  left:'right',
  textStyle:{
    color:function(param){
                        return color[param.dataIndex];
                },
  }
},

    grid:{
        left:'4%',
                    right:'3',
                    bottom:'4%',
                    top:'25%',
                    containLabel:true
    },
    xAxis: {
        axisLabel:{
            interval:0,
            textStyle:{
                fontSize:12
            }
        },
        axisLine: {
            show:false,
            lineStyle: {
                color: 'rgba(255,255,255,0.65)'
            }
        },
         splitLine: {
             show:false,
            lineStyle: {
                color: '#1E8A90'
            }
        },
        axisTick:{
            show:false
        },
        data: subjects
    },
    yAxis: {
         axisLabel: {
             show:false,
            color: 'rgba(255,255,255,0.65)',
        },
        axisLine: {
            show: false,
            lineStyle: {
                color: 'rgba(255,255,255,0.65)'
            }
        },
        axisTick:{
            show:false
        },
        splitLine:{show:false},
    },
    series: [{
        // name:'0~70分',
        type: 'bar',
        barWidth:'30%',
        label:{
            normal:{
                show:true,
                position:'top',
                textStyle:{
                    // color:function(param){
                    //     return color[param.dataIndex];
                    // },
                    fontSize:14,
                    color:'rgba(255,255,255,0.65)'
                }
            }
        },
        itemStyle:{
            normal:{
                color:function(param){
                        return color[param.dataIndex];
                },
                barBorderRadius:[50,50,50,50],
                shadowColor:'#BABABA',
                shadowBlur:5
            }
        },
        markLine : {
            symbol:'none',label:{
								position:"start"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
							},
            // lineStyle:{
            //     color:['#00D481','#0E8BF8','#E4C205']
            // },
            data : [
                { name: '90~100分',yAxis:90,itemStyle:{
normal:{
show:true,
color:'#00D481',
fontSize:12
}
}},
                    { name: '80~90分',yAxis:80,itemStyle:{
normal:{
show:true,
color:'#0E8BF8',
fontSize:12
}
}},
                { name: '0~70分',yAxis:70,itemStyle:{
normal:{
show:true,
color:'#E4C205',
fontSize:12
}
}}
            ]
        },
        data:grade
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
    }
  }
};
</script>

<style lang="less"></style>
