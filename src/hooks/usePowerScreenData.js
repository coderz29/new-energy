import { ref, onMounted } from "vue";
import { getPowerScreenData } from "@/services/index";
import { createPowerScreenDefaults } from "@/views/config/home-data";

export default function usePowerScreenData() {
  let lastGood = createPowerScreenDefaults();

  const chargingPie = ref(lastGood.chargingPie);
  const processMonitoring = ref(lastGood.processMonitoring);
  const chargingStatistics = ref(lastGood.chargingStatistics);
  const exceptionMonitoring = ref(lastGood.exceptionMonitoring);
  const dataAnalysis = ref(lastGood.dataAnalysis);
  const chargingTop4 = ref(lastGood.chargingTop4);
  const percentage = ref(lastGood.percentage);

  const loading = ref(true);
  const error = ref("");

  const load = async () => {
    loading.value = true;
    error.value = "";
    try {
      const res = await getPowerScreenData();
      const data = res?.data || {};

      const next = {
        chargingPie: data.chargingPile?.data ?? lastGood.chargingPie,
        processMonitoring: data.processMonitoring?.data ?? lastGood.processMonitoring,
        chargingStatistics: data.chargingStatistics?.data ?? lastGood.chargingStatistics,
        exceptionMonitoring: data.exceptionMonitoring?.data ?? lastGood.exceptionMonitoring,
        dataAnalysis: data.dataAnalysis?.data ?? lastGood.dataAnalysis,
        chargingTop4: data.chargingTop4?.data ?? lastGood.chargingTop4,
        percentage: data.chargingTop4?.totalPercentage ?? lastGood.percentage
      };

      chargingPie.value = next.chargingPie;
      processMonitoring.value = next.processMonitoring;
      chargingStatistics.value = next.chargingStatistics;
      exceptionMonitoring.value = next.exceptionMonitoring;
      dataAnalysis.value = next.dataAnalysis;
      chargingTop4.value = next.chargingTop4;
      percentage.value = next.percentage;

      lastGood = next;
    } catch (err) {
      error.value = err?.message || "数据加载失败";
    } finally {
      loading.value = false;
    }
  };

  onMounted(load);

  return {
    chargingPie,
    processMonitoring,
    chargingStatistics,
    exceptionMonitoring,
    dataAnalysis,
    chargingTop4,
    percentage,
    loading,
    error,
    reload: load
  };
}
