import classNames from "classnames";
import {Button, Card, FormField, Groups, Input, Select, Tooltip} from "vienna-ui";
import {Add, Trash} from 'vienna.icons';
import React, {FormEvent, useEffect, useState} from "react";
import styles from './ReceiptConfigurator.module.css';
import {ReceiptItem} from "../../../../types/ReceiptItem";
import {defaultReceiptItem} from "../QRView";
import {handleFloat, restoreFloat} from "../../../../utils";

interface ReceiptConfiguratorProps {
    receipt: ReceiptItem[] | undefined,
    edit: boolean
    setEdit: (arg: boolean) => void
    setReceipt: (arg: ReceiptItem[] | undefined) => void
}

const ReceiptConfigurator = ({receipt, setReceipt, edit, setEdit}: ReceiptConfiguratorProps) => {
    const taxOptions = [{ value: 'NONE', text: 'Без НДС' }, { value: 'VAT0', text: '0%' }, { value: 'VAT10', text: '10%' }, { value: 'VAT110', text: '10/110' }, { value: 'VAT20', text: '20%' }, { value: 'VAT120', text: '20/120' }]
    const [filled, setFilled] = useState(false);

    useEffect(() => {
        checkFilled();
    }, [receipt])
    const handleNameChange = (changedIndex: number, e: FormEvent<HTMLElement>) => {
        setReceipt(receipt?.map((item, index) => {
            if(index === changedIndex) {
                let newItem = {...item}
                newItem.name = (e.target as HTMLTextAreaElement).value
                return newItem
            } else return item
        }))
    }

    const handlePriceChange = (changedIndex: number, e: FormEvent<HTMLElement>) => {
        setReceipt(receipt?.map((item, index) => {
            if(index === changedIndex) {
                let newItem = {...item}
                let value = (e.target as HTMLTextAreaElement).value
                newItem.price = handleFloat(value, 8, 2)
                newItem.amount = restoreFloat(newItem.price) * restoreFloat(newItem.quantity)
                return newItem
            } else return item
        }))
    }

    const handleQuantityChange = (changedIndex: number, e: FormEvent<HTMLElement>) => {
        setReceipt(receipt?.map((item, index) => {
            if(index === changedIndex) {
                let newItem = {...item}
                let value = (e.target as HTMLTextAreaElement).value
                newItem.quantity = handleFloat(value, 5, 2)
                newItem.amount = restoreFloat(newItem.price) * restoreFloat(newItem.quantity)
                return newItem
            } else return item
        }))
    }

    const handleTaxSelect = (e: FormEvent, data: any, changedIndex: number) => {
        setReceipt(receipt?.map((item, index) => {
            if(index === changedIndex) {
                let newItem = {...item}
                newItem.vatType = data.value.value
                return newItem
            } else return item
        }))
    }

    const deleteItem = (deleteIndex: number) => {
        setReceipt(receipt?.filter((item, index) => index !== deleteIndex))
    }

    const addItem = () => {
        let newItem = {...defaultReceiptItem}
        if(receipt) {
            setReceipt([...receipt, newItem])
        }
        else {
            setReceipt([newItem])
        }
    }

    const countFinalSum = () => {
      return (receipt?.length ?? 0) > 0 ? receipt?.map(elem => elem.amount)?.reduce((prev, curr) => prev + curr) : 0
    }

    const checkFilled = () => {
        if(receipt && receipt.length > 0) {
            for (const item of receipt) {
                if(!item.name || item.amount === 0) {
                    setFilled(false);
                    return;
                }
            }
        } else {
            setFilled(false);
            return;
        }
        setFilled(true);
    }

    return (
      <Card className={classNames(styles.card)}>
          <Card.Title>Формирование чека</Card.Title>
          {
              receipt?.map((item, index) =>
                  <div key={index}>
                      <Card.ContentTitle style={{marginTop: '10px'}}>Позиция {index + 1} <Trash className={styles.trash} onClick={() => deleteItem(index)}/></Card.ContentTitle>
                      <FormField style={{marginTop: '10px'}}>
                          <FormField.Label>Название позиции</FormField.Label>
                          <FormField.Content>
                              <Input disabled={edit} placeholder={'Название'} value={item.name} onChange={(e) => handleNameChange(index, e)}/>
                          </FormField.Content>
                      </FormField>
                      <FormField style={{marginTop: '10px'}}>
                          <FormField.Label>Цена за единицу позиции</FormField.Label>
                          <FormField.Content>
                              <Input disabled={edit} value={`${item.price}`} postfix={<b>₽</b>} placeholder={'Цена'} onChange={(e) => handlePriceChange(index, e)}/>
                          </FormField.Content>
                      </FormField>
                      <FormField style={{marginTop: '10px'}}>
                          <FormField.Label>Количество или вес</FormField.Label>
                          <FormField.Content>
                              <Input disabled={edit} value={`${item.quantity}`} placeholder={'Количество/вес'} onChange={(e) => handleQuantityChange(index, e)}/>
                              <FormField.Message>Введите количество в тех единицах, за которые определяется цена.</FormField.Message>
                          </FormField.Content>
                      </FormField>
                      <FormField style={{marginTop: '10px'}}>
                          <FormField.Label>Сумма за позицию</FormField.Label>
                          <FormField.Content>
                              {item.amount ? item.amount.toFixed(2) : '0'} <b>₽</b>
                              <FormField.Message>Высчитывается автоматически как произведение цены на количество.</FormField.Message>
                          </FormField.Content>
                      </FormField>
                      <FormField style={{marginTop: '10px'}}>
                          <FormField.Label>Ставка НДС</FormField.Label>
                          <FormField.Content>
                              <Select
                                  disabled={edit}
                                  placeholder='Выберите значение'
                                  valueToString={(item) => item && item.text}
                                  value={taxOptions.filter((opt)=> opt.value === item.vatType)[0]}
                                  options={taxOptions}
                                  onSelect={(e, d) => handleTaxSelect(e, d, index)}
                              >
                              </Select>
                          </FormField.Content>
                      </FormField>
                      <hr style={{border: '1px dotted lightgray', margin: '20px 0'}}/>
                  </div>
              )
          }
          <Groups design={'vertical'}>
              <Groups design={'horizontal'} justifyContent={'flex-end'}>
                  <span>{`Итого: ${countFinalSum()??'0'}`}<b>₽</b></span>
              </Groups>
              <Groups design={'horizontal'} justifyContent={'space-between'}>
                  <Button design={'primary'} onClick={addItem}>
                      Добавить <Add/>
                  </Button>
                  {/*@ts-ignore*/}
                  <Tooltip anchor={'top'} content={filled? 'Нажмите для создания заказа': 'Заполните все поля'}>
                      <Button design={'accent'} disabled={!filled}>
                          Отправить
                      </Button>
                  </Tooltip>
              </Groups>
          </Groups>
      </Card>
    )
}

export default ReceiptConfigurator;