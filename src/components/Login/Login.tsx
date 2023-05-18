import React from "react";
import {Button, Card, Flex, FormField, Input, InputPassword, Text} from "vienna-ui";
import styles from './Login.module.css';
import logo from '../../static/logo.jpg';

const Login = () => {
  return (
      <div className={styles.space}>
          <Card className={styles.loginView}>
              <div className={styles.wrapper}>
                  <img width={'125px'} height={'30px'} src={logo} alt="logo" className={styles.logo}/>
                  <h2 className={styles.title}>Вход</h2>
                  <FormField>
                      <FormField.Label required>Введите логин</FormField.Label>
                      <FormField.Content>
                          <Input placeholder={'логин'} />
                      </FormField.Content>
                  </FormField>
                  <FormField className={styles.marginTop10}>
                      <FormField.Label required>Введите пароль</FormField.Label>
                      <FormField.Content>
                          <InputPassword placeholder={'пароль'} />
                          <FormField.Message><a className={styles.link} href={'/restore'}>Забыли пароль?</a></FormField.Message>
                      </FormField.Content>
                  </FormField>
                  <FormField className={styles.marginTop20}>
                      <FormField.Content>
                          <Button design={'accent'}>Войти</Button>
                      </FormField.Content>
                  </FormField>
                  <Flex center className={styles.marginTop10}>
                      <Text size={'s'} color={'seattle100'}>Нет аккаунта?&nbsp;
                          <a className={styles.link} href={'/register'}>Создать</a>
                      </Text>
                  </Flex>
              </div>
          </Card>
      </div>
  )
}

export default Login;