import React, {useState} from "react";
import {Button, Card, FormField, Input} from "vienna-ui";
import styles from './Login.module.css';
import logo from '../../static/logo.jpg';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const handleLogin = () => {
      localStorage.setItem('token', token);
      navigate('/');
    }

  return (
      <div className={styles.space}>
          <Card className={styles.loginView}>
              <div className={styles.wrapper}>
                  <img width={'125px'} height={'30px'} src={logo} alt="logo" className={styles.logo}/>
                  <h2 className={styles.title}>Вход</h2>
                  <FormField>
                      <Card.ContentTitle>Вставьте ключ авторизации</Card.ContentTitle>
                      <FormField.Content>
                          <Input placeholder={'Ключ авторизации'} value={token} onChange={(e) => setToken((e.target as HTMLTextAreaElement).value)}/>
                          <FormField.Message className={styles.label}>Ключ авторизации можно получить в сервисе&nbsp;</FormField.Message>
                          <a className={styles.link} href={'https://pay.raif.ru/account/#/auth'}>Raif Pay</a>
                      </FormField.Content>
                  </FormField>
                  <FormField style={{marginTop: '20px'}}>
                      <FormField.Content>
                          <Button onClick={handleLogin} disabled={token === ''} design={'accent'}>Войти</Button>
                      </FormField.Content>
                  </FormField>
              </div>
          </Card>
      </div>
  )
}

export default Login;