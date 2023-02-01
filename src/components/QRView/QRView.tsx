import React, {useEffect, useState} from 'react';
import {Groups, Button, Card, Input} from 'vienna-ui';
import {ResponseData} from "../../App/App";
import styles from './QRView.module.css';
import {token} from "../../private";


interface QRViewProps {
    responseData: ResponseData | undefined
    setStep: (arg: number) => void
}

const QRView: React.FC<QRViewProps> = ({responseData, setStep} : QRViewProps) => {
    const [isInvalid, setIsInvalid] = useState(false);
    const [sum, setSum] = useState<number>(0);

    const chargeQr = async () => {
        setIsInvalid(true);
        await fetch("/order/refresh", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': token
            },
            body: JSON.stringify({
                "amount": sum,
                "qr": {
                    "id": responseData?.qrId
                }
            })
        });
    }

    return (
      <>
        <Groups design={'vertical'} alignItems={'center'} justifyContent={"center"}>
            <img
                className={styles.qrBorder}
                src={responseData && responseData.qrUrl}
                alt="QR"
                style={{margin: "10px auto"}}
            />


            <Card.ContentTitle>Введите сумму для активации QR кода:</Card.ContentTitle>
            <Groups design={'horizontal'}>
                <Input disabled={isInvalid} placeholder='Сумма списания' value={sum === 0? "" : String(sum)} onChange={(e) => {
                    const value = (e.target as HTMLTextAreaElement).value.replace(/[^\d.]/g, '');
                    setSum(Number(value));
                    setIsInvalid(value === "")
                }} />
                <Button disabled={sum === 0 || isInvalid} onClick={chargeQr}>Сохранить</Button>
            </Groups>
        </Groups>
      </>
    )
}

export default QRView;