// 这些是模拟用的假数据

export const robotData = {
    robotOperationMode: "在线",
    robotStatus: "运行中"
};

export const planData = {
    planCount: 1002,
    completeCount: 932,
    lossCount: 24
};

export const vacuumFurnaceData = {
    vacuumFurnaceCurrentProduct: "涡轮叶片",
    vacuumFurnaceMeltingTime: 40
};

export const preheatingFurnaceData: any = {
    preheatingFurnaceList: []
}

preheatingFurnaceData.preheatingFurnaceList.push({
    temperature: 200 + '℃',
    product: '玻璃纤维',
    roastedTime: 120 + 'min'
});

preheatingFurnaceData.preheatingFurnaceList.push({
    temperature: 500 + '℃',
    product: '钛合金',
    roastedTime: 120 + 'min'
});

preheatingFurnaceData.preheatingFurnaceList.push({
    temperature: 800 + '℃',
    product: '钴基',
    roastedTime: 120 + 'min'
});

export const insulationWarehouseData: any = {
    insulationWarehouseList: []
};

insulationWarehouseData.insulationWarehouseList.push({
    temperature: 650 + '℃',
    product: '高速钢',
    roastedTime: 105 + 'min'
});

insulationWarehouseData.insulationWarehouseList.push({
    temperature: 440 + '℃',
    product: '铝合金',
    roastedTime: '14h'
});

insulationWarehouseData.insulationWarehouseList.push({
    temperature: 630 + '℃',
    product: '不锈钢',
    roastedTime: '80min'
});