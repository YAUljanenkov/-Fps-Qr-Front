import React, {useState} from 'react';
import styles from './OrderSelect.module.css';
import {Link, Outlet, useLoaderData} from "react-router-dom";
import {Grid, Sidebar, H5} from 'vienna-ui';
import {Invoice1} from 'vienna.icons';
import {Order} from "../../../types/Order";
import {getOrders} from "../../../network/requests";

export async function loader(): Promise<Order[]>  {
    try {
        const response = await getOrders();
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const parsedDate = (date: string) => {
    const parsedDate = new Date(Date.parse(date));
    return `${parsedDate.toLocaleDateString('ru-RU')} ${parsedDate.toLocaleTimeString('ru-RU')}`
}

const OrderSelect = () => {
    const orders = useLoaderData() as Order[];
    const [activeOrder, setActiveOrder] = useState<string | null>(null);

    return (
        <>
            <Grid.Row className={styles.gridHeight}>
                <Grid.Col size={4}>
                    <Sidebar size={'l'} active={activeOrder} header={
                        <H5 color={'seattle100'} style={{margin: '0'}}>
                            {orders.length === 0? `Cписок платежей пуст.`: `Выберите платёж`}
                        </H5>
                    } width={'100%'} className={styles.sidebar}>
                        {orders.map((elem, index) => {
                            return <Link to={`/orders/order/${elem.id}`} key={index}>
                                <Sidebar.Item id={elem.id}
                                              active={activeOrder === elem.id}
                                              icon={<Invoice1/>}
                                              onClick={() => setActiveOrder(elem.id)}>
                                    <span className={activeOrder !== elem.id ? styles.price : ''}> {elem.amount.toFixed(2)}₽</span> &nbsp; {parsedDate(elem.expirationDate)}
                                </Sidebar.Item>
                            </Link>
                        })}
                    </Sidebar>
                </Grid.Col>
                <Grid.Col size={8}>
                    <Outlet/>
                </Grid.Col>
            </Grid.Row>
        </>
    );
}

export default OrderSelect;
