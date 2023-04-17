import React from "react";
import {Card, Grid} from "vienna-ui";
import classNames from "classnames";
import styles from './OrderView.module.css';
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import {Order} from "../../../types/Order";
import {getOrder, getReceipt} from "../../../network/requests";
import {parsedDate} from "../../../utils";
import ReceiptView from "../../ReceiptView/ReceiptView";

export async function loader({params}: LoaderFunctionArgs): Promise<Order | null> {
    let order: Order | null = null;

    if (!params.orderId) {
        return null;
    }
    try {
        const responseOrder = await getOrder(params.orderId);
        order =  await responseOrder.data;
    } catch (e) {
        console.log(e);
        return null;
    }

    if (order?.receiptNumber) {
        try {
            const responseReceipt = await getReceipt(order.receiptNumber);
            order.receipt = await responseReceipt.data;
        } catch (e) {
            console.log(e);
        }
    }
    return order;
}

const OrderView = () => {
    const order = useLoaderData() as Order | null;
    let statusName = {
        'NEW': 'Новый',
        'PAID': 'Оплачен',
        'CANCELED': 'Отменен'
    }
    return (
        <Card className={styles.card}>
            <div className={styles.cardContent}>
                <b className={styles.payInfo}>{order?.amount.toFixed(2)}₽</b>
                <br/>
                <Grid.Row className={styles.row}>
                    <Grid.Col size={4}>
                        <b>id</b>
                    </Grid.Col>
                    <Grid.Col size={8} className={styles.col}>
                        {order?.id}
                    </Grid.Col>
                </Grid.Row>
                <Grid.Row className={classNames(styles.row, styles.rowBorder)}>
                    <Grid.Col size={4}>
                        <b>QR ID</b>
                    </Grid.Col>
                    <Grid.Col size={8} className={styles.col}>
                        {order?.qr.id}
                    </Grid.Col>
                </Grid.Row>
                <Grid.Row className={classNames(styles.row, styles.rowBorder)}>
                    <Grid.Col size={4}>
                        <b>Cтатус</b>
                    </Grid.Col>
                    <Grid.Col size={8} className={styles.col}>
                        {/*@ts-ignore*/}
                        {statusName[order?.status.value]}
                    </Grid.Col>
                </Grid.Row>
                { order?.status.value === 'PAID'?
                    <Grid.Row className={classNames(styles.row, styles.rowBorder)}>
                        <Grid.Col size={4} className={styles.col}>
                            <b>Дата оплаты</b>
                        </Grid.Col>
                        <Grid.Col size={8} className={styles.col}>
                            {parsedDate(order?.last_time_update ?? "")}
                        </Grid.Col>
                    </Grid.Row> : order?.status.value === 'CANCELED'?
                    <Grid.Row className={classNames(styles.row, styles.rowBorder)}>
                        <Grid.Col size={4} className={styles.col}>
                            <b>Дата отмены</b>
                        </Grid.Col>
                        <Grid.Col size={8} className={styles.col}>
                            {parsedDate(order?.last_time_update ?? "")}
                        </Grid.Col>
                    </Grid.Row> :
                        <Grid.Row className={classNames(styles.row, styles.rowBorder)}>
                            <Grid.Col size={4} className={styles.col}>
                                <b>Валиден до</b>
                            </Grid.Col>
                            <Grid.Col size={8} className={styles.col}>
                                {parsedDate(order?.expirationDate ?? "")}
                            </Grid.Col>
                        </Grid.Row>
                }
            </div>
            { order?.receipt &&
                <div className={styles.receiptView}>
                    <b className={styles.receiptInfo}>Cписок товаров</b>
                    <ReceiptView receipt={order.receipt}/>
                </div>
            }

        </Card>
    )
}

export default OrderView;
