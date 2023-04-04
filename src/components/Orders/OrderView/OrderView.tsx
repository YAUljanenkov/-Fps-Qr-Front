import React from "react";
import {Card, Grid} from "vienna-ui";
import classNames from "classnames";
import styles from './OrderView.module.css';
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import {Order} from "../../../types/Order";
import {getOrder} from "../../../network/requests";
import {parsedDate} from "../../../utils";

export async function loader({params}: LoaderFunctionArgs): Promise<Order | null> {
    if (!params.orderId) {
        return null;
    }
    try {
        const responseOrder = await getOrder(params.orderId);
        return await responseOrder.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const OrderView = () => {
    const order = useLoaderData() as Order | null;
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
                        {order?.status.value}
                    </Grid.Col>
                </Grid.Row>
                <Grid.Row className={classNames(styles.row, styles.rowBorder)}>
                    <Grid.Col size={4} className={styles.col}>
                        <b>Валиден до</b>
                    </Grid.Col>
                    <Grid.Col size={8} className={styles.col}>
                        {parsedDate(order?.expirationDate ?? "")}
                    </Grid.Col>
                </Grid.Row>
            </div>
        </Card>
    )
}

export default OrderView;
