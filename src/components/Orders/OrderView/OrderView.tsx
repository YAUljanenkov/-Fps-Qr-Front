import React from "react";
import {Card, Grid} from "vienna-ui";
import classNames from "classnames";
import styles from './OrderView.module.css';
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import {Order, parsedDate} from '../OrderSelect/OrderSelect';
import {token} from "../../../private";

export async function loader({ params }: LoaderFunctionArgs): Promise<Order>  {
    const responseOrder = await fetch(`/order/${params.orderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': token
        }
    })

    return await responseOrder.json();
}

const OrderView = () =>  {
    const order = useLoaderData() as Order;
    return(
        <Card className={styles.card}>
            <div className={styles.cardContent}>
                <b className={styles.payInfo}>{order.amount.toFixed(2)}₽</b>
                <br/>
                <Grid.Row className={styles.row}>
                    <Grid.Col size={4}>
                        <b>id</b>
                    </Grid.Col>
                    <Grid.Col size={8}>
                        {order.id}
                    </Grid.Col>
                </Grid.Row>
                <Grid.Row className={classNames(styles.row, styles.rowBorder)}>
                    <Grid.Col size={4}>
                        <b>QR ID</b>
                    </Grid.Col>
                    <Grid.Col size={8}>
                        {order.qr.id}
                    </Grid.Col>
                </Grid.Row>
                <Grid.Row className={classNames(styles.row, styles.rowBorder)}>
                    <Grid.Col size={4}>
                        <b>Cтатус</b>
                    </Grid.Col>
                    <Grid.Col size={8}>
                        {order.status.value}
                    </Grid.Col>
                </Grid.Row>
                <Grid.Row className={classNames(styles.row, styles.rowBorder)}>
                    <Grid.Col size={4}>
                        <b>Валиден до</b>
                    </Grid.Col>
                    <Grid.Col size={8}>
                        {parsedDate(order.expirationDate)}
                    </Grid.Col>
                </Grid.Row>
            </div>
        </Card>
    )
}

export default OrderView;
