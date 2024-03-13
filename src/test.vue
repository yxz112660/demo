<template>
    <div>
        WebSocket Example
</div>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, ref} from 'vue';

export default defineComponent({
    setup() {
        const socket = new WebSocket('ws://localhost:3000'); // 替换为你的 WebSocket 服务器地址
        const message = ref<string>('');

        socket.onopen = () => {
            console.log('WebSocket连接已建立');
            // 在这里可以做一些初始化操作，或者向服务器发送数据
        };

        socket.onmessage = (event) => {
            console.log('收到WebSocket消息:', event.data);
            message.value = event.data; // 更新消息内容
        };

        socket.onclose = () => {
            console.log('WebSocket连接已关闭');
        };

        socket.onerror = (error) => {
            console.error('WebSocket错误:', error);
        };

        // 在组件卸载前关闭 WebSocket 连接
        onBeforeUnmount(() => {
            socket.close();
        });

        return {
            message
        };
    }
});
</script>
