import React, { useState } from 'react';
import styles from './QRCreate.module.css';
import {Card, Groups, Input, Button, Modal} from 'vienna-ui';
import {ResponseData} from "../../App/App";
import raif_qr from "../../static/raif_qr.jpg"

interface QRCreateProps {
    isOpen: boolean,
    setIsOpen: (arg0: boolean) => void
}

const QRCreate: React.FunctionComponent<QRCreateProps> = ({ isOpen, setIsOpen }: QRCreateProps) => {
    const [account, setAccount] = useState<string>("");
    const [redirectUrl, setRedirectUrl] = useState<string>("");
    const [sbpMerchantId, setSbpMerchantId] = useState<string>("");
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const [qrID, setQRID] = useState<string>("");

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

        // const result: ResponseData = await response.json();
        setIsOpen(false);
    }

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <Card footer={
                <>
                    <Card.ContentTitle className={styles.topBorder}>
                        Или введите ID QR-кода вручную
                    </Card.ContentTitle>
                    <Groups design={'horizontal'}>
                    <Input size={'m'} className={styles.inputLength} placeholder='QR ID' value={qrID} onChange={
                        (e) => {
                            const value = (e.target as HTMLTextAreaElement).value;
                            setQRID(value);
                        }
                    }/>
                    <Button size={'m'} disabled={qrID.length === 0}>Сохранить</Button>
                    </Groups>
                </>
            }>
                <Card.ContentTitle>Cоздайте новый QR-код</Card.ContentTitle>
                <Groups alignItems={"flex-start"}>
                    <Groups design={'vertical'}>
                        <Input size={'m'} className={styles.inputLength} invalid={isInvalid} placeholder='Merchant ID' value={sbpMerchantId} onChange={(e) => {
                            const value = (e.target as HTMLTextAreaElement).value;
                            setSbpMerchantId(value);
                            setIsInvalid(value === "")
                        }} />
                        <Input size={'m'} className={styles.inputLength} placeholder='Счёт' value={account} onChange={(e) =>
                            setAccount((e.target as HTMLTextAreaElement).value)}/>
                        <Input size={'m'} className={styles.inputLength} placeholder='URL переадресации' value={redirectUrl} onChange={(e) =>
                            setRedirectUrl((e.target as HTMLTextAreaElement).value)}/>
                        <Button size={'m'} design='accent' onClick={sendRequest} disabled={sbpMerchantId === ""}>
                            Создать
                        </Button>
                    </Groups>
                    <img src={raif_qr} className={styles.qrImage} alt="Raif qr"/>
                </Groups>
            </Card>
        </Modal>
    )
}

export default QRCreate;
