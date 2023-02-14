import React, {useState} from 'react';
import classNames from "classnames";
import './App.css';
import { Header } from 'vienna-ui';
import QRForm from "./containers/QRForm/QRForm";
import QRView from "./containers/QRView/QRView";

export interface ResponseData {
    qrId: string,
    qrStatus: string,
    payload: string,
    qrUrl: string
}

const App = () => {
    const [response, setResponse] = useState<ResponseData>();
    const [finished, setFinished] = useState(false);

    return (
        <>
            <Header size={'l'} />
            <div className={classNames("main")}>
                {!finished?
                    <QRForm setResponse={setResponse} setFinished={setFinished} />:
                    <QRView responseData={response} setFinished={setFinished} />
                }
            </div>
        </>
    );
}

export default App;
