import React, {FormEvent, useState} from 'react';
import {Button, Card, FormField, Input} from "vienna-ui";
import styles from './ReceiptsFinder.module.css';
import {Accordion, AccordionItem as Item, AccordionItemProps} from '@szhsin/react-accordion';
import {Down} from 'vienna.icons';
import {Receipt} from "../../types/Receipt";
import ReceiptView from "../ReceiptView/ReceiptView";
import {parsedDate} from "../../utils";

const ReceiptsFinder = () => {
    const [receipts, setReceipts] = useState<Receipt[] | null>(null);
    const [phone, setPhone] = useState<string>();

    const changePhone = (e: FormEvent) => {
        let number = (e.target as HTMLTextAreaElement).value
        setPhone(number);
    }

    const sendPhone = () => {
        let receipts: Receipt[] = [
            {
                items: [
                    {
                        name: 'Салат горький с солью',
                        quantity: '1.45',
                        price: '20.1',
                        amount: 29.15,
                        vatType: 'VAT20'
                    },
                    {
                        name: 'Маца иерусалимская',
                        quantity: '150',
                        price: '5',
                        amount: 750,
                        vatType: 'VAT20'
                    }
                ],
                total: 779.15,
                date: '2023/04/05 19:30'
            },
            {
                items: [
                    {
                        name: 'Macbook pro 13 2020',
                        quantity: '1',
                        price: '175000',
                        amount: 175000,
                        vatType: 'VAT20'
                    },
                    {
                        name: 'Переходник USB-C на HDMI',
                        quantity: '1',
                        price: '2000',
                        amount: 2000,
                        vatType: 'VAT20'
                    }
                ],
                total: 177000,
                date: '2020/08/12 14:43'
            }
        ]
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
                receipts && <>
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
                </>
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