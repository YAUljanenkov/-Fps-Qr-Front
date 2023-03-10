import React from 'react';
import styles from './App.module.css';
import {Link, Outlet, useLoaderData} from "react-router-dom";
import {Header, Grid, Sidebar, Card, H5} from 'vienna-ui';
import logo from '../static/logo.jpg' ;
import {CodeQr} from 'vienna.icons';
import {token} from '../private';

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
    const response = await fetch("/qr", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': token
        }
    })
    return response.json();
}

const App = () => {
    const qrs = useLoaderData() as QR[];
    return (
        <>
            <Header size={'m'} logo={
                <img className={styles.logo} alt={'sellable logo'} src={logo}/>
            }/>
            <Grid.Row>
                {/* This is for "Add QR" button */}
                <Grid.Col size={12}>
                </Grid.Col>
            </Grid.Row>
            <Grid.Row>
                <Grid.Col size={4}>
                    <Sidebar size={'l'} header={<H5 color={'seattle100'} style={{margin: '0'}}>Выберите QR ID</H5>} width={'100%'} className={styles.sidebar}>
                        {qrs.map((elem, index) => {
                            return <Link to={`/tag/${elem.qrId}`}>
                                <Sidebar.Item icon={<CodeQr/>} key={index}>{elem.qrId}</Sidebar.Item>
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

export default App;
