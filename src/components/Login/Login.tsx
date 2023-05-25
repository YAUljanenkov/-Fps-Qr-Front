import React, {useState} from "react";
import {Button, Card, Flex, FormField, Groups, H5, Input, InputPassword, Modal, Text} from "vienna-ui";
import styles from './Login.module.css';
import logo from '../../static/logo.jpg';
import {useNavigate} from "react-router-dom";
import {login as loginRequest} from "../../network/requests";
import {setCookie} from "typescript-cookie";

const Login = () => {
    const [login, setLogin] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginAction = async () => {
        try {
            let token = await (await loginRequest(login, password)).data;
            setCookie('access_token', token.access_token, {expires: 1/24});
            navigate('/');
        } catch (e) {
            setIsOpen(true);
            console.error(e);
        }
    }

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
                          <Button type={'button'} onClick={loginAction} disabled={!login || !password} design={'accent'}>Войти</Button>
                      </FormField.Content>
                  </FormField>
                  <Flex center className={styles.marginTop10}>
                      <Text size={'s'} color={'seattle100'}>Нет аккаунта?&nbsp;
                          <button onClick={() => navigate('/register')} className={styles.link}>Создать</button>
                      </Text>
                  </Flex>
              </div>
          </Card>
          <Modal isOpen={isOpen}>
              <Card.ContentTitle style={{margin: '20px 0 0 20px', fontSize: '16px'}} >Ошибка</Card.ContentTitle>
              <div style={{margin: '25px 40px 20px 20px'}}>
                  <Groups design={'vertical'} style={{marginTop: '20px'}}>
                      <Groups
                          design={'horizontal'}
                          alignItems={'center'}
                          justifyContent={'center'}
                      >
                          <H5 style={{fontSize: '16px'}}>Неверный логин или пароль</H5>
                      </Groups>
                      <Groups
                          design={'horizontal'}
                          style={{paddingTop: '5px'}}
                          justifyContent={'flex-end'}>
                          <Button onClick={() => setIsOpen(false)} size={'s'}>OK</Button>
                      </Groups>
                  </Groups>
              </div>
          </Modal>
      </div>
  )
}

export default Login;