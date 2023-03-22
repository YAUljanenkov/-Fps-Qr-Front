import React, {useState} from 'react';
import styles from './QRSelect.module.css';
import {Link, Outlet, useLoaderData} from "react-router-dom";
import {Header, Grid, Sidebar, Button, H5} from 'vienna-ui';
import logo from '../../static/logo.jpg' ;
import {CodeQr, Add} from 'vienna.icons';
import {token} from '../../private';
import QRCreate from "../QRCreate/QRCreate";

export interface ResponseData {
    qrId: string,
    qrStatus: string,
    payload: string,
    qrUrl: string
    qrExpirationDate: string | null
}

export interface QR   {
    qrId: string,
    qrStatus: string,
    qrExpirationDate: string,
    payload: string,
    qrUrl: string,
    subscriptionId: string
}

export async function loader(): Promise<QR[]>  {
    try {
        const response = await fetch("/qr", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': token
            }
        })

        if (!response.ok) {
            return [];
        }

        return response.json();
    } catch (e) {
        return [];
    }
}

const QRSelect = () => {
    const qrs = useLoaderData() as QR[];
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Header  size={'m'} logo={
                <img className={styles.logo} alt={'sellable logo'} src={logo}/>
            }/>
            <Grid.Row className={styles.gridHeight}>
                <Grid.Col size={4}>
                    <Sidebar size={'l'} header={
                        <H5 color={'seattle100'} style={{margin: '0'}}>
                            {qrs.length === 0? `Cписок QR кодов пуст.`: `Выберите QR ID`}
                        </H5>
                    } width={'100%'} className={styles.sidebar}>
                        {qrs.map((elem, index) => {
                            return <Link to={`/tag/${elem.qrId}`} key={index}>
                                <Sidebar.Item icon={<CodeQr/>} >{elem.qrId}</Sidebar.Item>
                            </Link>
                        })}
                    </Sidebar>
                </Grid.Col>
                <Grid.Col size={8}>
                        <Outlet/>
                </Grid.Col>
            </Grid.Row>
            <div className={styles.addQrButton}>
                <Button size={'xl'} square design={'accent'} onClick={() => setIsOpen(true)}>
                    <Add size={'l'}/>
                </Button>
            </div>
            <QRCreate isOpen={isOpen} setIsOpen={setIsOpen}/>
        </>
    );
}

export default QRSelect;
