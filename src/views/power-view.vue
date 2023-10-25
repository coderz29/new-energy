<script setup>
import { ref } from "vue";
import { getPowerScreenData } from "@/services/index";
import lineEcharts from "../components/line-echarts.vue";
import pieEcharts from "../components/pie-echarts.vue";
import barEcharts from "../components/bar-echarts.vue";
import rightBottomSvg from "../components/right-bottom-svg.vue";
import centerSvg from '../components/center-svg.vue'
import bottomPenal from "../components/bottom-penal.vue";
import rightTopPanel from "../components/right-top-panel.vue";

import {
  chargingPieData,
  processMonitoringData,
  chargingStatisticsData,
  exceptionMonitoringData,
  dataAnalysisData,
  chargingTop4Data
} from "./config/home-data";

const chargingPie = ref(chargingPieData);
const processMonitoring = ref(processMonitoringData);
const chargingStatistics = ref(chargingStatisticsData);
const exceptionMonitoring = ref(exceptionMonitoringData);
const dataAnalysis = ref(dataAnalysisData);
const chargingTop4 = ref(chargingTop4Data)
const percentage = ref(0)

getPowerScreenData().then((res) => {
  chargingPie.value = res.data.chargingPile.data;
  processMonitoring.value = res.data.processMonitoring.data;
  chargingStatistics.value = res.data.chargingStatistics.data;
  exceptionMonitoring.value = res.data.exceptionMonitoring.data;
  dataAnalysis.value = res.data.dataAnalysis.data;
  chargingTop4.value = res.data.chargingTop4.data;
  percentage.value = res.data.chargingTop4.totalPercentage
});
</script>

<template>
  <main class="screen-bg">
    <div class="header"></div>

    <div class="left-top">
      <pie-echarts :echart-datas="chargingPie" />
    </div>
    <div class="left-bottom">
      <line-echarts :echart-datas="processMonitoring" />
    </div>

    <div class="right-top">
      <right-top-panel :panel-items="chargingTop4" :percentage="percentage"/>
    </div>
    <div class="right-center">
      <bar-echarts :echart-datas="chargingStatistics" />
    </div>
    <div class="right-bottom">
      <right-bottom-svg :dots="exceptionMonitoring" />
    </div>

    <div class="center">
      <center-svg />
    </div>
    <div class="bottom">
      <bottom-penal :penal-item="dataAnalysis"/>
    </div>
  </main>
</template>

<style scoped>
.screen-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  /* background-color:red */
  background: url(@/assets/images/bg.png) no-repeat;
}
.header {
  position: absolute;
  top: 21px;
  left: 0;
  right: 0;
  height: 56px;
  background: url(@/assets/images/bg_header.svg) no-repeat;
}
.left-top {
  position: absolute;
  top: 116px;
  left: 16px;
  width: 536px;
  height: 443px;
  background: url(@/assets/images/bg_left-top.svg) no-repeat;
}
.left-bottom {
  position: absolute;
  bottom: 49px;
  left: 16px;
  width: 536px;
  height: 443px;
  background: url(@/assets/images/bg_left_bottom.svg) no-repeat;
}
.right-top {
  position: absolute;
  right: 17px;
  top: 96px;
  width: 519px;
  height: 327px;
  background: url(@/assets/images/bg_right_top.svg) no-repeat;
}
.right-center {
  position: absolute;
  right: 17px;
  top: 443px;
  width: 519px;
  height: 327px;
  background: url(@/assets/images/bg_right_center.svg) no-repeat;
}
.right-bottom {
  position: absolute;
  right: 17px;
  bottom: 49px;
  width: 519px;
  height: 242px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: url(@/assets/images/bg_right_bottom.svg) no-repeat;
}
.center {
  position: absolute;
  right: 540px;
  bottom: 272px;
  width: 823px;
  height: 710px;
}
.bottom {
  position: absolute;
  right: 540px;
  bottom: 49px;
  width: 823px;
  height: 209px;
  background: url(@/assets/images/bg_bottom.svg) no-repeat;
}
</style>
