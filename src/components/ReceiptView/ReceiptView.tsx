import React from "react";
import { Groups, Table } from "vienna-ui";
import {Receipt} from "../../types/Receipt";

interface ReceiptViewProps {
    receipt: Receipt
}

const ReceiptView = ({receipt}: ReceiptViewProps) => {
    const itemsNumbered = receipt.items.map((item, index) => {
        return {id: index,  ...item}
    })
    const mapTaxes = {
        "NONE": "Без НДС",
        "VAT0": "НДС 0%",
        "VAT10": "НДС 10%",
        "VAT110": "НДС 10/110",
        "VAT20": "НДС 20%",
        "VAT120": "НДС 20/120"
    }
  return (
      <>
          <Groups design={'vertical'}>
              <Table data={itemsNumbered} size={'l'} style={{margin: '0 auto'}}>
                  <Table.Column id='#' title='№'>
                      {/*@ts-ignore*/}
                      {(item) => item.id + 1}
                  </Table.Column>
                  <Table.Column id='name' title='Название'>
                      {/*@ts-ignore*/}
                      {(item) => <Groups design={'vertical'}>{item.name}{mapTaxes[item.vatType]}</Groups>}
                  </Table.Column>
                  <Table.Column id='amount' title='Сумма'>
                      {/*@ts-ignore*/}
                      {(item) => `${item.price}₽ × ${item.quantity} = ${item.amount}₽`}
                  </Table.Column>
              </Table>
              <Groups design={'horizontal'} justifyContent={'flex-end'}>
                  <span><b>Итого:&nbsp;</b> {receipt.total}₽</span>
              </Groups>
          </Groups>
      </>
  )
}

export default ReceiptView;