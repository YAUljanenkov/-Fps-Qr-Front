import React, {useState} from 'react';
import {Card, Groups, Input, Button} from 'vienna-ui';
import styles from './QRSelect.module.css';
import {QrScanner} from '@yudiel/react-qr-scanner'

interface QRSelectProps {
}

const QRSelect: React.FunctionComponent<QRSelectProps> = () => {
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const [qrId, setQrId] = useState("");

    return (
        <>
            <Card title={"Выбор существующего QR кода"} className={styles.card}>
                <Card.ContentTitle>Отсканируйте QR код с помощью камеры</Card.ContentTitle>
                <QrScanner
                    onDecode={(result) => setQrId(result)}
                    onError={(error) => console.log(error?.message)}
                />
                <Card.ContentTitle>Или введите ID QR кода вручную:</Card.ContentTitle>
                <Groups design={'horizontal'}>
                    <Input invalid={isInvalid} placeholder='QR ID' value={qrId} onChange={(e) => {
                        const value = (e.target as HTMLTextAreaElement).value;
                        setQrId(value);
                        setIsInvalid(value === "")
                    }} />
                    <Button>Сохранить</Button>
                </Groups>
            </Card>
        </>
    )
}

export default QRSelect;