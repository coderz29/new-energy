<script setup>
import { nextTick, onMounted, watch } from 'vue';
import {CountUp} from 'countup.js'

const props = defineProps({
  penalItem:{
    type:Array,
    default:() => []
  }
})

watch(() => props.penalItem, (newValue,  oldValue) => {
  nextTick(() => {
    startAnimate(newValue)
  })
})

onMounted(() => {
  startAnimate(props.penalItem)
})

function startAnimate(penalItem = []) {
  const option1 = {
    decimalPlaces:1,  // 保留几位小数
    duration:2,
    useGrouping:false
  }
  const option2 = {
    decimalPlaces:1,
    duration:2,
    useGrouping:false,
    suffix:'%'
  }

  penalItem.forEach((item) => {
    new CountUp(`count_${item.id}`,item.totalNum,option1).start()
    new CountUp(`percentage_${item.id}`,item.percentage,option2).start()
  })
}

</script>

<template>
  <div class="bottom-penal">
      <template v-for="(item, index) in penalItem" :key="index" >
        <div class="bottom-box">
          <div class="title">{{ item.title }}</div>
          <div class="bottom-count">
            <span :id="'count_' + (index + 1)" class="count">{{ item.totalNum }}</span>
            <span class="text">万</span>
            <template v-if="item.isUp">
              <span class="icon1"></span>
              <span :id="'percentage_' + (index + 1)" class="percent1">{{ item.percentage }}%</span>
            </template>
            <template v-else>
              <span class="icon2"></span>
              <span :id="'percentage_' + (index + 1)" class="percent2">{{ item.percentage }}%</span>
            </template>
          </div>
        </div>
      </template>
  </div>
</template>

<style scoped>
.bottom-penal {
  color: aliceblue;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.bottom-count {
  margin-top: 15px;
}
.count {
  font-size: 30px;
  font-weight: 600;
  color: #198DEE;
}
.text {
  color: #198DEE;
}
.icon1 {
  margin-left: 20px;
  color: #AD183D;
}
.icon2 {
  margin-left: 20px;
  color: #4F8C4F;
}
.percent1 {
  color: #AD183D;
}
.percent2 {
  color: #4F8C4F;
}
</style> 