import React, {useState} from 'react';
import classNames from "classnames";
import styles from './App.module.css';
import { Header, Card } from 'vienna-ui';
import QRCreate from "../components/QRCreate/QRCreate";
import QRView from "../components/QRView/QRView";
import QRSelect from "../components/QRSelect/QRSelect";

export interface ResponseData {
    qrId: string,
    qrStatus: string,
    payload: string,
    qrUrl: string
}

const App = () => {
    const [response, setResponse] = useState<ResponseData>();
    const [step, setStep] = useState(2);
    const headerNames = ["Создание QR кода", "Выбор существующего QR кода", "QR код"]

    const getCurrentStep = (step: number) => {
        switch (step) {
            case 1:
                return <QRCreate setResponse={setResponse} setStep={setStep} />;
            case 2:
                return <QRSelect/>
            case 3:
                return <QRView responseData={response} setStep={setStep} />;
        }
    }

    return (
        <>
            <Header size={'s'} />
            <div className={classNames(styles.main)}>
                <Card title={headerNames[step]} className={classNames(styles.card)}>
                    {getCurrentStep(step)}
                </Card>
            </div>
        </>
    );
}

export default App;
