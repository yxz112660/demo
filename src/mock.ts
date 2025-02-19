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
    vacuumFurnaceCurrentProduct: "XXXXXXXXXX",
    vacuumFurnaceMeltingTime: 40
};

export const preheatingFurnaceData: any = {
    preheatingFurnaceList: []
}

for (let i = 0; i < 12; i++) {
    preheatingFurnaceData.preheatingFurnaceList.push({
        temperature: (30 + i) + '℃',
        product: 'XXXXXXXXXX',
        roastedTime: (20 + i) + 'min'
    });
}

export const insulationWarehouseData: any = {
    insulationWarehouseList: []
};

for (let i = 0; i < 6; i++) {
    insulationWarehouseData.insulationWarehouseList.push({
        temperature: (30 + i) + '℃',
        product: 'XXXXXX',
        roastedTime: (20 + i) + 'min'
    });
}