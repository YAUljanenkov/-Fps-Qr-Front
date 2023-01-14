import React, {useState} from 'react';
import classNames from "classnames";
import './App.css';
import { Header } from 'vienna-ui';
import QRCreate from "./components/QRCreate/QRCreate";
import QRView from "./components/QRView/QRView";
import QRSelect from "./components/QRSelect/QRSelect";

export interface ResponseData {
    qrId: string,
    qrStatus: string,
    payload: string,
    qrUrl: string
}

const App = () => {
    const [response, setResponse] = useState<ResponseData>();
    const [step, setStep] = useState(2);

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
            <Header size={'l'} />
            <div className={classNames("main")}>
                {getCurrentStep(step)}
            </div>
        </>
    );
}

export default App;
