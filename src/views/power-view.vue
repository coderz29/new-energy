<script setup>
import usePowerScreenData from "@/hooks/usePowerScreenData";
import lineEcharts from "../components/line-echarts.vue";
import pieEcharts from "../components/pie-echarts.vue";
import barEcharts from "../components/bar-echarts.vue";
import rightBottomSvg from "../components/right-bottom-svg.vue";
import centerSvg from '../components/center-svg.vue'
import bottomPenal from "../components/bottom-penal.vue";
import rightTopPanel from "../components/right-top-panel.vue";

const {
  chargingPie,
  processMonitoring,
  chargingStatistics,
  exceptionMonitoring,
  dataAnalysis,
  chargingTop4,
  percentage,
  loading,
  error,
  reload
} = usePowerScreenData();
</script>

<template>
  <main class="screen-bg">
    <div class="header"></div>

    <div v-if="loading" class="loading-mask">
      <div class="loading-title">º”‘ÿ÷–...</div>
      <div class="loading-skeleton">
        <div class="skeleton-block w-lg h-md"></div>
        <div class="skeleton-block w-md h-sm"></div>
        <div class="skeleton-block w-lg h-sm"></div>
      </div>
    </div>
    <div v-else-if="error" class="status error">
      <span>{{ error }}</span>
      <button class="retry" type="button" @click="reload">ÈáçËØï</button>
    </div>

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
.loading-mask {
  position: absolute;
  inset: 0;
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: rgba(2, 7, 14, 0.55);
  backdrop-filter: blur(1px);
}
.loading-title {
  font-size: 14px;
  color: #e6f1ff;
  letter-spacing: 1px;
}
.loading-skeleton {
  display: grid;
  gap: 12px;
}
.skeleton-block {
  border-radius: 6px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.08) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite;
}
.w-lg { width: 420px; }
.w-md { width: 300px; }
.w-sm { width: 180px; }
.h-lg { height: 20px; }
.h-md { height: 16px; }
.h-sm { height: 12px; }
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.status {
  position: absolute;
  top: 8px;
  right: 16px;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  font-size: 12px;
  color: #e6f1ff;
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
.status.error {
  color: #ffd6d6;
  border-color: rgba(255, 90, 90, 0.35);
}
.retry {
  padding: 2px 6px;
  font-size: 12px;
  color: inherit;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 3px;
  cursor: pointer;
}
.retry:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>


