<template>
    <Loading v-if="isLoading" />
    <Screen v-if="!isLoading" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Store } from './Store';
import Loading from './components/Loading.vue';
import Screen from './pages/Screen.vue';

const isLoading = ref(true);

const loadAssets = async () => {
    for (const assets of Object.values(Store.assetsMap)) {
        if (assets.type === 'image') {
            await new Promise<void>((resolve, reject) => {
                const imageElement = document.createElement('img');
                imageElement.src = assets.src;
                imageElement.addEventListener('load', () => resolve());
                imageElement.addEventListener('error', reject);
            })
        }
    }
};

onMounted(async () => {
    isLoading.value = true;
    await loadAssets();
    isLoading.value = false;
});
</script>

<style scoped></style>
