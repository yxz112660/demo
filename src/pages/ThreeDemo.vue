<template>
    <canvas class="three-canvas" ref="threeCanvas"></canvas>
    <div class="control-container">
        <el-form :label-position="'left'" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
<!--            <el-form-item label="钻头旋转">-->
<!--                <el-slider v-model="formLabelAlign.drillBitRotation" :min="-360" :max="360" @input="modelParamsChange" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="底座平移">-->
<!--                <el-slider v-model="formLabelAlign.baseTranslation" :min="-50" :max="50" @input="baseTranslationChange" />-->
<!--            </el-form-item>-->
        </el-form>
    </div>
</template>



<script setup lang="ts">
import {ref, reactive, onMounted, onBeforeUnmount} from 'vue'
import { ThreeExample } from '../three/main';


let ws: WebSocket | null = null;

// 创建 WebSocket 连接
const createWebSocketConnection = () => {
  ws = new WebSocket('ws://106.12.148.121:8090/api/websocket'); // 替换为你的 WebSocket 服务器地址

  ws.onopen = () => {
    console.log('WebSocket连接已建立');
  };

  ws.onmessage = (event) => {
    console.log(event)
    const data = JSON.parse(event.data);
    // 在这里处理接收到的 WebSocket 消息，更新模型位置和旋转状态等
    if (event.type === 'message') {

        formLabelAlign.drillBitRotation =data.xxx;
        formLabelAlign.baseTranslation =data.yyy;
        if (threeExample && threeExample.model) {
          const Cylinder017 = threeExample.model.getObjectByName("Cylinder017");

          Cylinder017 && (Cylinder017.rotation.y = formLabelAlign.drillBitRotation / 57);
          // Cylinder019.rotation.y = formLabelAlign.drillBitRotation;
          // Cylinder020.rotation.y = formLabelAlign.drillBitRotation;
          // Cube003.rotation.y = formLabelAlign.drillBitRotation;
          // Cube004.rotation.y = formLabelAlign.drillBitRotation;
        }
        if (threeExample && threeExample.model) {
          const Cube002 = threeExample.model.getObjectByName("Cube002");
          Cube002 && (Cube002.position.x = formLabelAlign.baseTranslation / 72);
        }
        console.log(data)
        // 根据接收到的消息，更新模型的位置和旋转状态
        // 例如：model.position.x = data.position.x;
        //       model.rotation.y = data.rotation.y;

    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket错误:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket连接已关闭');
    // 此处可以根据需要进行重连等处理
  };
};

let threeExample: ThreeExample | null = null;

const threeCanvas = ref<HTMLCanvasElement | null>(null)

const formLabelAlign = reactive({
    drillBitRotation: -360,
    baseTranslation: -50,
    drillBitRotation_:1,
    baseTranslation_: 1,
})



// const setDrillBitRotationPolling = () => {
//   setTimeout(() => {
//     if (formLabelAlign.drillBitRotation < 360) {
//       formLabelAlign.drillBitRotation ++;
//       if (threeExample&&threeExample.model){
//         const Cylinder017 = threeExample.model.getObjectByName("Cylinder017");
//         Cylinder017 && (Cylinder017.rotation.y = formLabelAlign.drillBitRotation / 57);
//         setDrillBitRotationPolling();
//       }
//     }
//   }, 50);
// }



 //
 // setInterval(() => {
 //    if (formLabelAlign.drillBitRotation==-360){
 //      formLabelAlign.drillBitRotation_=1;
 //    }
 //    if (formLabelAlign.drillBitRotation==360){
 //      formLabelAlign.drillBitRotation_=-1;
 //    }
 //    if (formLabelAlign.baseTranslation==-50){
 //      formLabelAlign.baseTranslation_=1;
 //    }
 //    if (formLabelAlign.baseTranslation==50){
 //      formLabelAlign.baseTranslation_=-1;
 //    }
 //    formLabelAlign.drillBitRotation +=formLabelAlign.drillBitRotation_;
 //    formLabelAlign.baseTranslation +=formLabelAlign.baseTranslation_;
 //   if (threeExample && threeExample.model) {
 //     const Cylinder017 = threeExample.model.getObjectByName("Cylinder017");
 //
 //     Cylinder017 && (Cylinder017.rotation.y = formLabelAlign.drillBitRotation / 57);
 //     // Cylinder019.rotation.y = formLabelAlign.drillBitRotation;
 //     // Cylinder020.rotation.y = formLabelAlign.drillBitRotation;
 //     // Cube003.rotation.y = formLabelAlign.drillBitRotation;
 //     // Cube004.rotation.y = formLabelAlign.drillBitRotation;
 //   }
 //   if (threeExample && threeExample.model) {
 //     const Cube002 = threeExample.model.getObjectByName("Cube002");
 //
 //     Cube002 && (Cube002.position.x = formLabelAlign.baseTranslation / 72);
 //   }
 //
 //
 //    }, 50); // 设置间隔为50毫秒






onMounted(() => {
    if (threeCanvas.value) {
        threeExample = new ThreeExample({
            canvas: threeCanvas.value
        });
    }
  createWebSocketConnection();
})

// 在组件卸载前关闭 WebSocket 连接
onBeforeUnmount(() => {
  if (ws) {
    ws.close();
  }
});

</script>

<style scoped>
.three-canvas {
    width: 100vw;
    height: 100vh;
    display: block;
}

.control-container {
    width: 490px;
    /* height: 490px; */
    padding: 15px;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
}
</style>
