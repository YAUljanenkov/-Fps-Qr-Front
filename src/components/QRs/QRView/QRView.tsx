import React, {useEffect, useState} from 'react';
import {Groups, Button, Card, Input} from 'vienna-ui';
import styles from './QRView.module.css';
import {Edit} from "vienna.icons";
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import classNames from "classnames";
import {QrOrder} from "../../../types/QrOrder";
import {getQrOrder, getQR, createOrder} from "../../../network/requests";

export async function loader({ params }: LoaderFunctionArgs): Promise<QrOrder | null>  {
    if (!params.qrId) {
        return null;
    }
    let qrData: QrOrder;
    try {
        const responseQR = await getQR(params.qrId);
        qrData = {order: null, ...await responseQR.data};

    } catch (e) {
        console.error(e);
        return null;
    }

    try {
        const responseOrder = await getQrOrder(params.qrId);
        qrData.order = await responseOrder.data;
    } catch (e) {
        console.error(e);
    }

    return qrData;
}

const QRView = () => {
    const qrData = useLoaderData() as QrOrder | null;
    const [sum, setSum] = useState<number>(0);
    const [load, setLoad] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const amount = qrData?.order?.amount ?? 0
        setSum(amount)
        setEdit(amount !== 0)
    }, [qrData])

    const setQr = async () => {
        if (!qrData?.qrId) {
            // add error alert.
            return;
        }

        if(edit) {
            setEdit(false);
            return;
        }

        setLoad(true);
        try {
            await createOrder(sum, qrData?.qrId)
        } catch (e) {
            console.error(e);
        }

        setLoad(false);
        setEdit(true);
    }


    return (
      <>
          <Card className={classNames(styles.card)}>
            <Groups design={'vertical'} alignItems={'center'} justifyContent={"center"}>
                <b>{qrData?.qrId}</b>
                <img
                    className={styles.qrBorder}
                    src={qrData?.qrUrl}
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