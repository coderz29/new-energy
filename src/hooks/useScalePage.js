import { onMounted, onUnmounted } from "vue";
import { myThrottle } from "@/utils/myThrottle";
/**
 * 大屏适配的hooks
 */
export default function useScalePage(options) {
  const resizeFunc = myThrottle(function () {
    triggerScale();
  }, 100);

  onMounted(() => {
    triggerScale();

    window.addEventListener("resize", resizeFunc);
  });

  onUnmounted(() => {
    // 组件卸载的时候释放资源
    window.removeEventListener("resize", resizeFunc);
  });

  function triggerScale() {
    // 大屏的适配
    let targetX = options.targetX || 1920;
    let targetY = options.targetY || 1080;
    let targetRatio = options.targetRatio || 16 / 9;

    let currentX = document.documentElement.clientWidth || document.body.clientWidth;
    let currentY = document.documentElement.clientHeight || document.body.clientHeight;

    let scaleRatio = currentX / targetX;
    let currentRatio = currentX / currentY;

    if (currentRatio > targetRatio) {
      scaleRatio = currentY / targetY;
      document.body.style = `transform:scale(${scaleRatio}) translateX(-50%); left:50%;`;
    } else {
      document.body.style = `transform:scale(${scaleRatio})`;
    }
  }
}
