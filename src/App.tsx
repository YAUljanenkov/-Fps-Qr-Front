import React, {useState} from 'react';
import classNames from "classnames";
import './App.css';
import { Header } from 'vienna-ui';
import QRForm from "./containers/QRForm";

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
                    <></>
                }
            </div>
        </>
    );
}

export default App;
