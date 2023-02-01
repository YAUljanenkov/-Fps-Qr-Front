import React, {useState} from 'react';
import {Card, Groups, Input, Button} from 'vienna-ui';
import {QrScanner} from '@yudiel/react-qr-scanner';
import {token} from "../../private";
import {ResponseData} from "../../App/App";

interface QRSelectProps {
    setResponse: (arg: ResponseData) => void
    setStep: (arg: number) => void
}

const QRSelect: React.FunctionComponent<QRSelectProps> = ({setResponse, setStep}: QRSelectProps) => {
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const [qrId, setQrId] = useState("");

    const getQrIdFromLink = (link: string): string | null => {
        // https://qr.nspk.ru/AS7F6AD20F204B30A0D0C8D3996D298D?type=01&bank=10000001&cur=RUB&crc=C08B
        if (link.includes("https://qr.nspk.ru/") && link.indexOf("https://qr.nspk.ru/") === 0) {
            return link.substring(19, 51);
        }
        return null;
    }

    const getQrDataFromId = async () => {
        const response = await fetch(`/qr/status/${qrId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': token
            }
        });

        const result: ResponseData = await response.json();
        setResponse(result);
        console.log(result);
        setStep(3);
    }

    return (
        <>
            <Card.ContentTitle>Отсканируйте QR код с помощью камеры</Card.ContentTitle>
            <QrScanner
                onDecode={(result) => {
                    const value = getQrIdFromLink(result);
                    console.log(value);
                    if (value && value !== "") {
                        setQrId(value);
                    }
                }
            }
                onError={(error) => console.log(error?.message)}
            />
            <Card.ContentTitle>Или введите ID QR кода вручную:</Card.ContentTitle>
            <Groups design={'horizontal'}>
                <Input invalid={isInvalid} placeholder='QR ID' value={qrId} onChange={(e) => {
                    const value = (e.target as HTMLTextAreaElement).value;
                    setQrId(value);
                    setIsInvalid(value === "")
                }} />
                <Button disabled={qrId === ""} onClick={getQrDataFromId}>Сохранить</Button>
            </Groups>
        </>
    )
}

export default QRSelect;