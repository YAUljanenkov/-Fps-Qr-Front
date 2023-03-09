import React, {useEffect, useState} from 'react';
import {Groups, Button, Card, Input} from 'vienna-ui';
import {QR} from "../../App/App";
import styles from './QRView.module.css';
import {token} from "../../private";
import {Edit} from "vienna.icons";
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import classNames from "classnames";

interface OrderResponseData {
    amount: number,
    expirationDate: string,
    id: string,
    qr: {
        id: string
    }
    status: {
        date: string,
        value: string
    }
}

export async function loader({ params }: LoaderFunctionArgs): Promise<QR>  {
    const response = await fetch(`/qr/${params.qrId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': token
        }
    })
    return response.json();
}

const QRView = () => {
    const qrData = useLoaderData() as QR;
    const [sum, setSum] = useState<number>(0);
    const [load, setLoad] = useState(false);
    const [edit, setEdit] = useState(false);

    const setQr = async () => {
        if(edit) {
            setEdit(false);
            return;
        }
        setLoad(true);
        await fetch("/order/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                amount: sum,
                qr: {
                    id: qrData.qrId,
                }
            })
        });

        setLoad(false);
        setEdit(true);
    }


    return (
      <>
          <Card className={classNames(styles.card)}>
            <Groups design={'vertical'} alignItems={'center'} justifyContent={"center"}>
                <b>{qrData.qrId}</b>
                <img
                    className={styles.qrBorder}
                    src={qrData.qrUrl}
                    alt="QR"
                    style={{margin: "10px auto"}}
                />


                <Card.ContentTitle>Введите сумму для активации QR кода:</Card.ContentTitle>
                <Groups design={'horizontal'} style={{marginLeft: "50px"}}>
                    <Input disabled={edit} placeholder='Сумма списания' value={sum === 0? "" : String(sum)} onChange={(e) => {
                        const value = (e.target as HTMLTextAreaElement).value.replace(/[^\d.]/g, '');
                        setSum(Number(value));
                    }} />
                    <Button loading={load} disabled={sum === 0} onClick={setQr}>{edit? <Edit/> : 'OK'}</Button>
                </Groups>
            </Groups>
          </Card>
      </>
    )
}

export default QRView;