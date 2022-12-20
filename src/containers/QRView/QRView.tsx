import React, { useState } from 'react';
import {Card, Groups, Button} from 'vienna-ui';
import {ResponseData} from "../../App";
import styles from './QRView.module.css';


interface QRViewProps {
    responseData: ResponseData | undefined
}

const QRView = ({responseData} : QRViewProps) => {
  return (
      <>
        <Card title={"QR код"} className={styles.card}>
            <Groups design={'vertical'}>
                <img className={styles.qrBorder} src={responseData && responseData.qrUrl} alt="QR"/>
                <Button design={'outline'} onClick={()=> window.location.reload()}>
                    Создать новый
                </Button>
            </Groups>
        </Card>
      </>
  )
}

export default QRView;