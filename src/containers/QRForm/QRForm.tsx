import React, { useState } from 'react';
import styles from './QRForm.module.css';
import classNames from "classnames";
import {Card, Groups, Input, Button} from 'vienna-ui';
import {ResponseData} from "../../App";
import raif_qr from "../../static/raif_qr.jpg"

interface RequestData {
    account: string,
    redirectUrl: string,
    sbpMerchantId: string
}

interface QRFormProps {
    setResponse: (arg: ResponseData) => void
    setFinished: (arg: boolean) => void
}

const QRForm = ({ setResponse, setFinished }: QRFormProps) => {
    const [account, setAccount] = useState<string>();
    const [redirectUrl, setRedirectUrl] = useState<string>();
    const [sbpMerchantId, setSbpMerchantId] = useState<string>();
    const [isInvalid, setIsInvalid] = useState<boolean>(false);

    const sendRequest = async () => {
        if (sbpMerchantId === "") {
            setIsInvalid(true);
            return;
        }

        const response = await fetch("/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({account, redirectUrl, sbpMerchantId})
        });

        const result: ResponseData = await response.json();
        setResponse(result);
        setFinished(true);
    }

    return (
        <>
            <Card title={'Создание QR кода'} className={classNames(styles.card)}>
                <Card.ContentTitle>Введите данные:</Card.ContentTitle>
                <Groups alignItems={"flex-start"}>
                    <Groups design={'vertical'}>
                        <Input placeholder='Счёт' value={account} onChange={(e) =>
                            setAccount((e.target as HTMLTextAreaElement).value)}/>
                        <Input placeholder='URL переадресации' value={redirectUrl} onChange={(e) =>
                            setRedirectUrl((e.target as HTMLTextAreaElement).value)}/>
                        <Input invalid={isInvalid} placeholder='Merchant ID' value={sbpMerchantId} onChange={(e) => {
                            const value = (e.target as HTMLTextAreaElement).value;
                            setSbpMerchantId(value);
                            setIsInvalid(value === "")
                        }} />
                        <Button design='accent' onClick={sendRequest}>
                            Создать
                        </Button>
                    </Groups>
                    <img src={raif_qr} className={styles.qrImage} alt="Raif qr"/>
                </Groups>
            </Card>
        </>
    )
}

export default QRForm;
