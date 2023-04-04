export const parsedDate = (date: string) => {
    const parsedDate = new Date(Date.parse(date));
    return `${parsedDate.toLocaleDateString('ru-RU')} ${parsedDate.toLocaleTimeString('ru-RU')}`
}

export function handleFloat(number: string, integerSize: number, floatSize: number): string {
    number = number.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
    let numParts = number.split('.');
    if (numParts.length === 2) {
        return `${numParts[0].slice(0, integerSize)}.${numParts[1].slice(0, floatSize)}`;
    } else if (number.includes('.')) {
        return number.slice(0, integerSize + 1);
    } else {
        return number.slice(0, integerSize);
    }
}

export function restoreFloat(num: string): number {
    if (num[num.length] === '.') {
        return Number(num.slice(0, num.length - 1));
    }
    return Number(num);
}