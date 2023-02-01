import React from 'react';
import {Card, Groups} from 'vienna-ui';
import qrSearch from '../../static/qr-search.svg';
import qrAdd from '../../static/qr-add.svg';
import styles from './QRChoose.module.css';

interface QRChooseProps {
    moveToNew: () => void,
    moveToExisting: () => void
}

const QRChoose: React.FC<QRChooseProps> = ({moveToNew, moveToExisting}: QRChooseProps) => {
    return (
        <>
            <Groups design={'horizontal'}>
                    <Groups
                        design={'vertical'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        className={styles.buttonView}
                        onClick={moveToNew}
                    >
                        <Card.ContentTitle>Добавить новый QR</Card.ContentTitle>
                        <div className={styles.iconWrapper}>
                            <img src={qrAdd} alt="Add" className={styles.buttonIcon}/>
                        </div>
                    </Groups>
                    <Groups
                        design={'vertical'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        className={styles.buttonView}
                        onClick={moveToExisting}
                    >
                        <Card.ContentTitle>Существующий QR</Card.ContentTitle>
                        <div className={styles.iconWrapper}>
                            <img src={qrSearch} alt="search" className={styles.buttonIcon}/>
                        </div>
                    </Groups>
            </Groups>
        </>
    )
}

export default QRChoose;