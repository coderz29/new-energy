<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue';
import useEcharts from '@/hooks/useEcharts'

const props = defineProps({
  width:{
    type:String,
    default:'100%'
  },
  height:{
    type:String,
    default:'100%'
  },
  echartDatas:{
    type: Array,
    default:() => []
  }
})
// 监听 echartDatas 的变化
watch(() => props.echartDatas,(newValue,oldValue) => {
  setupEchart(newValue)
})

// 获取实例
let divRef = ref()
let myCharts = null
onMounted(() => {
  setupEchart(props.echartDatas)
})

function setupEchart(echartDatas) {
  if(!myCharts) {
    myCharts = useEcharts(divRef.value)
  }
   // 准备数据
  let option = getOptions(echartDatas)
  myCharts.setOption(option)
}

function getOptions(pieDatas = []) {

  let colors = pieDatas.map((item) => {
    return item.color;
  });

  let data = pieDatas.map((item) => {
    return {
      value: item.value,
      name: item.name,
    };
  });

  let total = pieDatas.reduce((a, b) => {
    return a + b.value * 1;
  }, 0);

  const option = {
    color: colors,
    title: {
      text: `{nameSty| 充电桩总数}\n{number|${total}}`,
      top: "50%",
      left: "30%",
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 19,
            color: "white",
            padding: [10, 0],
          },
          number: {
            fontSize: 24,
            color: "white",
            padding: [4, 0, 0, 20],
          },
        },
      },
    },
    legend: {
      orient: "vertical",
      right: "10%",
      top: "18%",
      itemGap: 20,
      itemWidth: 16,
      itemHeigth: 16,
      icon: "rect",
      formatter: function (name) {
        var currentItem = pieDatas.find((item) => item.name === name);
        return (
          "{nameSty|" +
          currentItem.name +
          "}\n" +
          "{numberSty|" +
          currentItem.value +
          "个 }" +
          "{preSty|" +
          currentItem.percentage +
          "}"
        );
      },
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 12,
            color: "#FFFFFF",
            padding: [10, 14],
          },
          numberSty: {
            fontSize: 12,
            color: "#40E6ff",
            padding: [0, 0, 0, 14],
          },
          preSty: {
            fontSize: 12,
            color: "#40E6ff",
          },
        },
      },
    },
    series: [
      {
        type: "pie",
        center: ["40%", "57%"],
        radius: ["30%", "75%"],
        label: {
          show: false,
        },
        data: data,
        roseType: "area",
      },
    ],
  };
  return option
}

</script>

<template>
  <div ref="divRef" :style="{width:width,height:height}"></div>
</template>

<style scoped>

</style> 