export default function dateTime(date) {
    const month = date.substring(5, 7);
    const day = date.substring(9, 10);
    const time = date.substring(11, 16);
    return `${day}-${month} ${time}`;
}
