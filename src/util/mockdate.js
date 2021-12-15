const format = function(date) {
    const dateString = new Date(date),
        month = dateString.getMonth() + 1 < 10 ? '0' + (dateString.getMonth() + 1) : dateString.getMonth() + 1,
        day = dateString.getDate() < 10 ? '0' + dateString.getDate() : dateString.getDate();
    return dateString.getFullYear() + '-' + month + '-' + day;
};
export function rangeDate(min, max) {
    const days = (new Date(max) - new Date(min)) / 1000 / 60 / 60 / 24;
    let i = 0;
    const len = Math.floor(days);
    const dates = [];

    for (; i < len; i++) {
        dates.push(format(new Date(min).getTime() + 1000 * 60 * 60 * 24 * i));
    }
    console.log('---dates', dates);
    return dates;
}
