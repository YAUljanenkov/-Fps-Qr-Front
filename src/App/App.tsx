import React, {useState} from 'react';
import classNames from "classnames";
import styles from './App.module.css';
import { Header, Card, Groups, Button } from 'vienna-ui';
import QRCreate from "../components/QRCreate/QRCreate";
import QRView from "../components/QRView/QRView";
import QRSelect from "../components/QRSelect/QRSelect";
import {LeftSmall} from "vienna.icons";
import QRChoose from "../components/QRChoose/QRChoose";

export interface ResponseData {
    qrId: string,
    qrStatus: string,
    payload: string,
    qrUrl: string
    qrExpirationDate: string | null
}

const App = () => {
    const [response, setResponse] = useState<ResponseData>();
    const [step, setStep] = useState(0);
    const headerNames = ["Выберите действие", "Создание QR кода", "Выбор существующего QR кода", "QR код"]

    const getCurrentStep = (step: number) => {
        switch (step) {
            case 0:
                return <QRChoose moveToNew={() => setStep(1)}
                                 moveToExisting={() => setStep(2)}
                />;
            case 1:
                return <QRCreate setResponse={setResponse} setStep={setStep} />;
            case 2:
                return <QRSelect setResponse={setResponse} setStep={setStep} />
            case 3:
                return <QRView responseData={response} setStep={setStep} />;
        }
    }

    return (
        <>
            <Header size={'m'} />
            <div className={classNames(styles.main)}>
                <Card
                    className={classNames(styles.card)}
                    header={
                        <Groups design='horizontal' size='xl'>
                            { step > 0 &&
                                <div className={classNames(styles.ButtonLeft)}>
                                    <Button square design={'ghost'} onClick={() => setStep(0)}>
                                        <LeftSmall/>
                                    </Button>
                                </div>
                            }
                            <Card.Title>{headerNames[step]}</Card.Title>
                        </Groups>
                    }
                >
                    {getCurrentStep(step)}
                </Card>
            </div>
        </>
    );
}

export default App;
