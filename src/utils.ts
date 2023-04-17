import {ReceiptItem} from "./types/ReceiptItem";

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

function ImagetoPrint(source: string)
{
    return "<html><head><script>function step1(){\n" +
        "setTimeout('step2()', 10);}\n" +
        "function step2(){window.print();window.close()}\n" +
        "</script></head><body onload='step1()'>\n" +
        "<img src='" + source + "' /></body></html>";
}

export function PrintImage(source: string)
{
    const Pagelink = "about:blank";
    const pwa = window.open(Pagelink, "_new");
    pwa?.document.open();
    pwa?.document.write(ImagetoPrint(source));
    pwa?.document.close();
}

export async function downloadImage(imageSrc: string) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'image file name here'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

export const countFinalSum = (receipt: ReceiptItem[]) => {
    return (receipt?.length ?? 0) > 0 ? receipt?.map(elem => elem.amount)?.reduce((prev, curr) => prev + curr) : 0
}