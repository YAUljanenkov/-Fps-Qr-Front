import React, {useEffect, useState} from 'react';
import {Card, Groups, Button} from 'vienna-ui';
import {ResponseData} from "../../App";
import styles from './QRView.module.css';
import {token} from "../../private";


interface QRViewProps {
    responseData: ResponseData | undefined
    setFinished: (arg: boolean) => void
}

const QRView = ({responseData, setFinished} : QRViewProps) => {
    useEffect( () => {
        (async () => {
            await fetch("/order/refresh", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': token
                },
                body: JSON.stringify({
                    "amount": 1500,
                    "qr": {
                        "id": responseData?.qrId
                    }
                })
            });
        })();
    }, [responseData?.qrId]);

    return (
      <>
        <Card title={"QR код"} className={styles.card}>
            <Groups design={'vertical'}>
                <img className={styles.qrBorder} src={responseData && responseData.qrUrl} alt="QR"/>
                <Button design={'outline'} onClick={()=> setFinished(false)}>
                    Создать новый
                </Button>
            </Groups>
        </Card>
      </>
    )
}

export default QRView;