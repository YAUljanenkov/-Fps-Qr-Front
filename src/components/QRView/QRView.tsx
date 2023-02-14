import React, {useEffect, useState} from 'react';
import {Groups, Button, Card, Input} from 'vienna-ui';
import {ResponseData} from "../../App/App";
import styles from './QRView.module.css';
import {token} from "../../private";
import {Edit} from "vienna.icons";


interface QRViewProps {
    responseData: ResponseData | undefined
    setStep: (arg: number) => void
}

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

const QRView: React.FC<QRViewProps> = ({responseData, setStep} : QRViewProps) => {
    const [isInvalid, setIsInvalid] = useState(false);
    const [sum, setSum] = useState<number>(0);
    const [load, setLoad] = useState(false);
    const [edit, setEdit] = useState(false);
    const [orderId, setOrderId] = useState<string | undefined>(undefined);

    const chargeQr = async () => {
        setIsInvalid(true);
        const response = await fetch("/order/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': token
            },
            body: JSON.stringify({
                amount: sum,
                qr: {
                    id: responseData?.qrId
                }
            })
        });

        const result: OrderResponseData = await response.json();
        console.log(result);
        setOrderId(result.id);
    }

    const stopQr = async (id: string) => {
        setIsInvalid(true);
        await fetch(`/order/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': token
            },
            body: JSON.stringify({
                amount: sum,
                qr: {
                    id: responseData?.qrId
                }
            })
        });
    }

    const setQr = async () => {
        if(edit) {
            setIsInvalid(false);
            setEdit(false);
            return;
        }
        setLoad(true);
        if (orderId !== undefined) {
            await stopQr(orderId);
        }

        await chargeQr();
        setLoad(false);
        setEdit(true);
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
            <Groups design={'horizontal'} style={{marginLeft: "50px"}}>
                <Input disabled={isInvalid} placeholder='Сумма списания' value={sum === 0? "" : String(sum)} onChange={(e) => {
                    const value = (e.target as HTMLTextAreaElement).value.replace(/[^\d.]/g, '');
                    setSum(Number(value));
                    setIsInvalid(value === "")
                }} />
                <Button loading={load} disabled={sum === 0} onClick={setQr}>{edit? <Edit/> : 'OK'}</Button>
            </Groups>
        </Groups>
      </>
    )
}

export default QRView;