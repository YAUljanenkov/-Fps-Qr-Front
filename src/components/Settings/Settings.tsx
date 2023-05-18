import React from "react";
import {Button, Card, FormField, Input, InputPassword} from "vienna-ui";
import styles from './Settings.module.css'


const Settings = () => {
  return (
      <Card className={styles.wrapper}>
          <Card.Title>Настройки</Card.Title>
          <Card.ContentTitle>Cмена пароля</Card.ContentTitle>
          <FormField className={styles.marginTop10}>
              <FormField.Label required>Придумайте новый пароль</FormField.Label>
              <FormField.Content>
                  <InputPassword placeholder={'пароль'} />
              </FormField.Content>
          </FormField>
          <FormField className={styles.marginTop10}>
              <FormField.Label required>Повторите пароль</FormField.Label>
              <FormField.Content>
                  <InputPassword placeholder={'пароль'} />
              </FormField.Content>
          </FormField>
          <FormField className={styles.marginTop20}>
              <FormField.Content>
                  <Button design={'primary'}>Cохранить</Button>
              </FormField.Content>
          </FormField>
          <hr style={{border: '1px dotted rgb(213, 213, 214)'}} />
          <Card.ContentTitle>Привязка ID чата в Telegram</Card.ContentTitle>
          <FormField className={styles.marginTop10}>
              <FormField.Content>
                  <Input placeholder={'ID чата'}/>
                  <FormField.Message className={styles.label}>ID чата можно получить в нашем&nbsp;</FormField.Message>
                  <a className={styles.link} href={'/'}>Telegram-боте</a>
              </FormField.Content>
          </FormField>
          <FormField className={styles.marginTop20}>
              <FormField.Content>
                  <Button design={'primary'}>Привязать</Button>
              </FormField.Content>
          </FormField>
      </Card>
  )
}

export default Settings;