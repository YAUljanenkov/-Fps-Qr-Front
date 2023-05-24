import React, {useState} from "react";
import {Button, Card, Flex, FormField, Input, InputPassword, Text} from "vienna-ui";
import styles from './Login.module.css';
import logo from '../../static/logo.jpg';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

  return (
      <div className={styles.space}>
          <Card className={styles.loginView}>
              <div className={styles.wrapper}>
                  <img width={'125px'} height={'30px'} src={logo} alt="logo" className={styles.logo}/>
                  <h2 className={styles.title}>Вход</h2>
                  <FormField>
                      <FormField.Label required>Введите логин</FormField.Label>
                      <FormField.Content>
                          <Input placeholder={'логин'} value={login} onChange={(e) =>
                              setLogin((e.target as HTMLTextAreaElement).value)}/>
                      </FormField.Content>
                  </FormField>
                  <FormField className={styles.marginTop10}>
                      <FormField.Label required>Введите пароль</FormField.Label>
                      <FormField.Content>
                          <InputPassword placeholder={'пароль'} value={password} onChange={(e) =>
                              setPassword((e.target as HTMLTextAreaElement).value)}/>
                          <FormField.Message>
                              <button onClick={() => navigate('/restore')} className={styles.link}>Забыли пароль?</button>
                          </FormField.Message>
                      </FormField.Content>
                  </FormField>
                  <FormField className={styles.marginTop20}>
                      <FormField.Content>
                          <Button disabled={!login || !password} design={'accent'}>Войти</Button>
                      </FormField.Content>
                  </FormField>
                  <Flex center className={styles.marginTop10}>
                      <Text size={'s'} color={'seattle100'}>Нет аккаунта?&nbsp;
                          <button onClick={() => navigate('/register')} className={styles.link}>Создать</button>
                      </Text>
                  </Flex>
              </div>
          </Card>
      </div>
  )
}

export default Login;