import React, {useState} from 'react';
import styles from './QRCreate.module.css';
import {Card, Groups, Input, Button, Modal} from 'vienna-ui';
import raif_qr from "../../../static/raif_qr.jpg"
import {ActionFunctionArgs, Form, redirect} from "react-router-dom";
import {createQR} from "../../../network/requests";

interface QRCreateProps {
    isOpen: boolean,
    setIsOpen: (arg0: boolean) => void
}


export async function createAction({request}: ActionFunctionArgs) {
    const {account, redirectUrl, sbpMerchantId} = Object.fromEntries(await request.formData());

    try {
        await createQR(account, redirectUrl, sbpMerchantId);
    } catch (e) {
        console.error(e);
    }

    return redirect(window.location.href.replace('create', ''));
}

const QRCreate: React.FunctionComponent<QRCreateProps> = ({isOpen, setIsOpen}: QRCreateProps) => {
    const [account, setAccount] = useState<string>("");
    const [redirectUrl, setRedirectUrl] = useState<string>("");
    const [sbpMerchantId, setSbpMerchantId] = useState<string>("");
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const [qrID, setQRID] = useState<string>("");

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <Card footer={
                <>
                    <Card.ContentTitle className={styles.topBorder}>
                        Или введите ID QR-кода вручную
                    </Card.ContentTitle>
                    <Groups design={'horizontal'}>
                        <Input size={'m'} className={styles.inputLength} placeholder='QR ID' value={qrID} onChange={
                            (e) => {
                                const value = (e.target as HTMLTextAreaElement).value;
                                setQRID(value);
                            }
                        }/>
                        <Button size={'m'} disabled={qrID.length === 0}>Сохранить</Button>
                    </Groups>
                </>
            }>
                <Card.ContentTitle>Cоздайте новый QR-код</Card.ContentTitle>
                <Groups alignItems={"flex-start"}>
                    <Form method={'post'} action={'/qr/create'} onSubmit={() => {
                        setIsOpen(false);
                    }}>
                        <Groups design={'vertical'}>
                            <Input name={'sbpMerchantId'} size={'m'} className={styles.inputLength} invalid={isInvalid}
                                   placeholder='Merchant ID' value={sbpMerchantId} onChange={(e) => {
                                const value = (e.target as HTMLTextAreaElement).value;
                                setSbpMerchantId(value);
                                setIsInvalid(value === "")
                            }}/>
                            <Input name={'account'} size={'m'} className={styles.inputLength} placeholder='Счёт'
                                   value={account}
                                   onChange={(e) =>
                                       setAccount((e.target as HTMLTextAreaElement).value)}/>
                            <Input name={'redirectUrl'} size={'m'} className={styles.inputLength}
                                   placeholder='URL переадресации'
                                   value={redirectUrl} onChange={(e) =>
                                setRedirectUrl((e.target as HTMLTextAreaElement).value)}/>
                            <Button size={'m'} design='accent' type={'submit'} disabled={sbpMerchantId === ""}>
                                Создать
                            </Button>
                        </Groups>
                    </Form>
                    <img src={raif_qr} className={styles.qrImage} alt="Raif qr"/>
                </Groups>
            </Card>
        </Modal>
    )
}

export default QRCreate;
