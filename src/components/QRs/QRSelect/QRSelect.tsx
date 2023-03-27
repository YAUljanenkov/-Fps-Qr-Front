import React, {useState} from 'react';
import styles from './QRSelect.module.css';
import {Link, Outlet, useLoaderData} from "react-router-dom";
import {Grid, Sidebar, Button, H5} from 'vienna-ui';
import {CodeQr, Add} from 'vienna.icons';
import QRCreate from "../QRCreate/QRCreate";
import {getQRs} from "../../../network/requests";
import {QR} from "../../../types/QR";

export async function loader()  {
    try {
        const response = await getQRs();
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const QRSelect = () => {
    const qrs = useLoaderData() as QR[];
    const [isOpen, setIsOpen] = useState(false);
    const [activeQR, setActiveQR] = useState<string | null>(null)
    return (
        <>
            <Grid.Row className={styles.gridHeight}>
                <Grid.Col size={4}>
                    <Sidebar size={'l'} header={
                        <H5 color={'seattle100'} style={{margin: '0'}}>
                            {qrs.length === 0? `Cписок QR кодов пуст.`: `Выберите QR ID`}
                        </H5>
                    } width={'100%'} className={styles.sidebar}>
                        {qrs.map((elem, index) => {
                            return <Link to={`/qrs/tag/${elem.qrId}`} key={index}>
                                <Sidebar.Item icon={<CodeQr/>}
                                              active={elem.qrId === activeQR}
                                              onClick={() => setActiveQR(elem.qrId)}>
                                    {elem.qrId}
                                </Sidebar.Item>
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
