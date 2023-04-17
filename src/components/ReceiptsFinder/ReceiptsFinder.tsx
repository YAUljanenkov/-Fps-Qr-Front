import React, {FormEvent, useState} from 'react';
import {Button, Card, FormField, H5, Input} from "vienna-ui";
import styles from './ReceiptsFinder.module.css';
import {Accordion, AccordionItem as Item, AccordionItemProps} from '@szhsin/react-accordion';
import {Down} from 'vienna.icons';
import {Receipt} from "../../types/Receipt";
import ReceiptView from "../ReceiptView/ReceiptView";
import {parsedDate} from "../../utils";
import {getOrders, getReceipt} from "../../network/requests";

const ReceiptsFinder = () => {
    const [receipts, setReceipts] = useState<Receipt[] | null>(null);
    const [phone, setPhone] = useState<string>();

    const changePhone = (e: FormEvent) => {
        let number = (e.target as HTMLTextAreaElement).value
        setPhone(number);
    }

    const sendPhone = async () => {
        let receipts: Receipt[] = []
        try {
            const orderResponse = await getOrders(0, null, phone)
            const orders = orderResponse.data;
            for (const order of orders) {
                if (order.receiptNumber) {
                    const receiptResponse = await getReceipt(order.receiptNumber);
                    const receipt = receiptResponse.data;
                    receipt.date = order.last_time_update;
                    receipts.push(receipt);
                }
            }
        } catch (e) {
            console.error(e);
        }

        setReceipts(receipts);
    }

    return(
        <div className={styles.space}>
            <Card.Title>Проверьте список покупок</Card.Title>
            <FormField style={{margin: '20px 0'}}>
                <FormField.Label>Введите номер телефона, чтобы получить список покупок.</FormField.Label>
                <FormField.Content>
                    <Input value={phone} placeholder={'+79990000000'} onChange={changePhone}/>
                    <FormField.Message>Номер нужен, чтобы найти ваши платежи в нашей базе данных.</FormField.Message>
                </FormField.Content>
            </FormField>
            <FormField>
                <FormField.Content>
                    <Button onClick={sendPhone} design={'accent'}>Отправить</Button>
                </FormField.Content>
            </FormField>
            {
                receipts && (receipts.length > 0 ? <>
                    <Card.ContentTitle>Списки покупок</Card.ContentTitle>
                    <Accordion transition transitionTimeout={200}>
                        {
                            receipts?.map((elem, index) =>
                                <AccordionItem key={index} header={elem.date ? parsedDate(elem.date): ''} initialEntered={index === 0}>
                                    <ReceiptView receipt={elem}/>
                                </AccordionItem>
                            )
                        }
                    </Accordion>
                </> : <Card.ContentTitle>Покупки не найдены</Card.ContentTitle>)
            }

        </div>
    )
}

const AccordionItem = ({ header, ...rest }: AccordionItemProps) => (
    <Item
        {...rest}
        header={
            <>
                {header}
                <Down className={styles.chevron}/>
            </>
        }
        className={styles.item}
        buttonProps={{
            className: ({ isEnter }) =>
                `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`
        }}
        contentProps={{ className: styles.itemContent }}
        panelProps={{ className: styles.itemPanel }}
    />
);

export default ReceiptsFinder;