export function fontSize(size: number) {
    let res = size / 100;
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return size;
    let fontSize = 100 * (clientWidth / 1920);
    return res * fontSize;
}