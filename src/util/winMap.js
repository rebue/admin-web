// window对象无法存到localStorage, sessionStorage中
let winMap = [];
export function setWin(win) {
    winMap.push(win);
}
export function clearWin() {
    winMap = [];
}
export function closeAllWin() {
    winMap.forEach(win => {
        win.close();
    });
    clearWin();
}
