import React, {useEffect, useState} from 'react';
import {Groups, Button, Card, Input, Tooltip, Modal, H5} from 'vienna-ui';
import styles from './QRView.module.css';
import {Edit, Cancel, InfoFilled, Printer, Download} from "vienna.icons";
import {LoaderFunctionArgs, useLoaderData, Form, ActionFunctionArgs, redirect, useNavigate} from "react-router-dom";
import classNames from "classnames";
import {QR} from "../../../types/QR";
import {getQrOrder, getQR, createOrder, saveReceipt, cancelOrder, getReceipt} from "../../../network/requests";
import Switch from 'react-switch';
import {ReceiptItem} from "../../../types/ReceiptItem";
import ReceiptConfigurator from './ReceiptConfigurator/ReceiptConfigurator';
import {countFinalSum, downloadImage, handleFloat, PrintImage, restoreFloat} from "../../../utils";
import {Order} from "../../../types/Order";

export async function stopAction({request, params}: ActionFunctionArgs) {
    if (params.qrId) {
        try {
            let order = await (await getQrOrder(params.qrId)).data
            await cancelOrder(order.id);
        } catch (e) {
            console.error(e);
        }
    }

    return redirect(request.url.replace(`/stop/${params.orderId}`, ''));
}

export async function loader({ params }: LoaderFunctionArgs): Promise<QR | null>  {
    if (!params.qrId) {
        return null;
    }
    let qrData: QR;
    try {
        const responseQR = await getQR(params.qrId);
        qrData = await responseQR.data;

    } catch (e) {
        console.error(e);
        return null;
    }
    if (qrData.qrStatus === 'NEW') {
        try {
            const responseOrder = await getQrOrder(params.qrId);
            qrData.order = await responseOrder.data;
        } catch (e) {
            console.error(e);
        }
    }

    if (qrData?.order?.receiptNumber) {
        try {
            const responseReceipt = await getReceipt(qrData.order.receiptNumber);
            qrData.order.receipt = await responseReceipt.data;
        } catch (e) {
            console.error(e);
        }
    }
    return qrData;
}

export const defaultReceiptItem: ReceiptItem = {
    name: '',
    price: '',
    quantity: '1',
    amount: 0,
    vatType: 'VAT20',
}

const QRView = () => {
    const qrData = useLoaderData() as QR | null;
    const [sum, setSum] = useState('');
    const [load, setLoad] = useState(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hasReceipt, setHasReceipt] = useState<boolean>(qrData?.order?.receipt !== undefined);
    const [receipt, setReceipt] = useState<ReceiptItem[] | undefined>(qrData?.order?.receipt?.items ?? undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const amount = qrData?.order?.amount
        let newSum = `${amount ? amount : ''}`;
        setSum(newSum)
        setHasReceipt(qrData?.order?.receipt !== undefined);
        setReceipt(qrData?.order?.receipt?.items ?? undefined)
        setEdit(newSum !== '')
    }, [qrData])

    useEffect(() => {
        const countFinalSum = () => {
            return (receipt?.length ?? 0) > 0 ? receipt?.map(elem => elem.amount)?.reduce((prev, curr) => prev + curr) : 0
        }
        if(hasReceipt) {
            setSum(`${countFinalSum() ?? 0}`);
        }
    }, [receipt, hasReceipt])

    const setQr = async (): Promise<Order | null> => {
        if (!qrData?.qrId) {
            // add error alert.
            return null;
        }

        if(edit) {
            setEdit(false);
            return null;
        }

        setLoad(true);
        let order: Order | null = null;
        try {
            order = await (await createOrder(restoreFloat(sum), qrData?.qrId)).data
        } catch (e) {
            console.error(e);
        }

        setLoad(false);
        setEdit(true);
        return order;
    }

    const printCode = () => {
        if (qrData) {
            PrintImage(qrData.qrUrl);
        }
    }

    const createOrderReceipt = async () => {
        if(edit) {
            setEdit(false);
            return;
        }

        let order = await setQr();
        if (order && receipt) {
            await saveReceipt(order.id, {items: receipt, total: countFinalSum(receipt)});
        }
        navigate(window.location.pathname);
    }

    return (
      <>
          <Card className={classNames(styles.card)}>
            <Groups design={'vertical'} alignItems={'center'} justifyContent={"center"}>
                <b>{qrData?.qrId}
                    <Button style={{top: '3px', left: '5px'}} design={'ghost'} onClick={() => qrData && downloadImage(qrData.qrUrl)}><Download/></Button>
                    <Button style={{top: '3px'}} design={'ghost'} onClick={printCode}><Printer/></Button>
                </b>
                <img
                    className={styles.qrBorder}
                    src={qrData?.qrUrl}
                    alt="QR"
                    style={{margin: "10px auto"}}
                />
                <Card.ContentTitle>Введите сумму для активации QR кода:</Card.ContentTitle>
                <Groups design={'horizontal'} justifyContent={'center'}>
                    <Input postfix={<b>₽</b>} disabled={edit || hasReceipt} placeholder='Сумма списания' value={sum === ''? "" : String(sum)} onChange={(e) => {
                        const value = handleFloat((e.target as HTMLTextAreaElement).value, 16, 2);
                        setSum(value);
                    }} />
                    {/* @ts-ignore */ /* This is needed due to bug in vienna-ui */}
                    <Tooltip content={'Изменить сумму'} anchor={'top'}>
                        <Button loading={load} disabled={sum === '' || hasReceipt} onClick={setQr}>{edit? <Edit/> : 'OK'}</Button>
                    </Tooltip>
                    {/* @ts-ignore */ /* This is needed due to bug in vienna-ui */}
                    <Tooltip content={'Отменить заказ'} anchor={'top'}>
                        <Button disabled={sum === ''} onClick={() => setIsOpen(true)} square design={'critical'}><Cancel/></Button>
                    </Tooltip>
                </Groups>
                <Groups design={'horizontal'} style={{marginTop: "10px", borderTop: '1px solid lightgray', paddingTop: '10px'}} justifyContent={'center'}>
                    {'Включить фискализацию'}
                    <Switch onColor={'#FFCC00'} onChange={() => {
                        setHasReceipt(!hasReceipt)
                        if (!receipt) {
                            setSum('')
                            setEdit(false)
                            setReceipt( [{...defaultReceiptItem}])
                        }
                    }} checked={hasReceipt} checkedIcon={false} uncheckedIcon={false}/>
                </Groups>
            </Groups>
          </Card>
          {
              hasReceipt &&
              <ReceiptConfigurator sendRequest={createOrderReceipt} edit={edit} setEdit={setEdit} receipt={receipt} setReceipt={setReceipt} load={load}/>
          }
          <Modal isOpen={isOpen}>
              <Card.ContentTitle style={{margin: '20px 0 0 20px', fontSize: '16px'}} >Подтвердите действие</Card.ContentTitle>
              <div style={{margin: '25px 40px 20px 20px'}}>
                  <Groups design={'vertical'} style={{marginTop: '20px'}}>
                      <Groups
                          design={'horizontal'}
                          alignItems={'center'}
                          justifyContent={'center'}
                      >
                          <InfoFilled color={'#0f0f0f'} size={'l'}/><H5 style={{fontSize: '20px'}}>Отменить заказ?</H5>
                      </Groups>
                      <Groups
                          design={'horizontal'}
                          style={{paddingTop: '5px'}}
                          justifyContent={'flex-end'}>
                          <Button size={'l'} design={'ghost'} onClick={() => setIsOpen(false)}>Нет</Button>
                          <Form action={`stop/${qrData?.qrId}`} method={'delete'} onSubmit={() => setIsOpen(false)}>
                              <Button type={'submit'} size={'s'}>Да</Button>
                          </Form>
                      </Groups>
                  </Groups>
              </div>
          </Modal>
      </>
    )
}

export default QRView;