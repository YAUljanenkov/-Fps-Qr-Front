import React, {useEffect, useState} from 'react';
import {Card, Groups, Button} from 'vienna-ui';
import {ResponseData} from "../../App/App";
import styles from './QRView.module.css';
import {token} from "../../private";


interface QRViewProps {
    responseData: ResponseData | undefined
    setStep: (arg: number) => void
}

const QRView: React.FunctionComponent<QRViewProps> = ({responseData, setStep} : QRViewProps) => {
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
        <Groups design={'vertical'}>
            <img className={styles.qrBorder} src={responseData && responseData.qrUrl} alt="QR"/>
            <Button design={'outline'} onClick={()=> setStep(0)}>
                Создать новый
            </Button>
        </Groups>
      </>
    )
}

export default QRView;