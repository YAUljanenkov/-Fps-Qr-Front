import React, {useState} from "react";
import {Button, Card, Flex, FormField, Groups, H5, Input, InputPassword, Modal, Text} from "vienna-ui";
import styles from './Registration.module.css';
import logo from '../../static/logo.jpg';
import {useNavigate} from "react-router-dom";
import {register} from "../../network/requests";
import {setCookie} from "typescript-cookie";

const Registration = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [merchantId, setMerchantId] = useState('');
    const [token, setToken] = useState('');
    const [chatId, setChatId] = useState('');
    const navigate = useNavigate();

    const checkFilled = () => {
        return !login || !password || !checkPassword || !merchantId || !token || !chatId || password !== checkPassword;
    }

    const registerAction = async () => {
        try {
            let intChatId: number | undefined = isNaN(parseInt(chatId))? undefined: parseInt(chatId);
            let accessToken = await (await register(login, password, merchantId, token, intChatId)).data;
            setCookie('access_token', accessToken.access_token, {secure: true, expires: 1/24});
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
                    <h2 className={styles.title}>Регистрация</h2>
                    <FormField>
                        <FormField.Label required>Придумайте логин</FormField.Label>
                        <FormField.Content>
                            <Input placeholder={'логин'} value={login} onChange={(e) =>
                                setLogin((e.target as HTMLTextAreaElement).value)}/>
                        </FormField.Content>
                    </FormField>
                    <FormField className={styles.marginTop10}>
                        <FormField.Label required>Придумайте пароль</FormField.Label>
                        <FormField.Content>
                            <InputPassword placeholder={'пароль'} value={password} onChange={(e) =>
                                setPassword((e.target as HTMLTextAreaElement).value)}/>
                        </FormField.Content>
                    </FormField>
                    <FormField className={styles.marginTop10}>
                        <FormField.Label required>Повторите пароль</FormField.Label>
                        <FormField.Content>
                            <InputPassword invalid={password !== checkPassword} placeholder={'пароль'} value={checkPassword} onChange={(e) =>
                                setCheckPassword((e.target as HTMLTextAreaElement).value)}/>
                        </FormField.Content>
                    </FormField>
                    <FormField className={styles.marginTop10}>
                        <FormField.Label required>Вставьте Merchant ID</FormField.Label>
                        <FormField.Content>
                            <Input placeholder={'Merchant ID'} value={merchantId} onChange={(e) =>
                                setMerchantId((e.target as HTMLTextAreaElement).value)}/>
                        </FormField.Content>
                    </FormField>
                    <FormField className={styles.marginTop10}>
                        <FormField.Label required>Вставьте ключ авторизации</FormField.Label>
                        <FormField.Content>
                            <Input placeholder={'Ключ авторизации'} value={token} onChange={(e) =>
                                setToken((e.target as HTMLTextAreaElement).value)}/>
                            <FormField.Message className={styles.label}>Ключ авторизации можно получить в сервисе&nbsp;</FormField.Message>
                            <a className={styles.link} href={'https://pay.raif.ru/account/#/auth'}>Raif Pay</a>
                        </FormField.Content>
                    </FormField>
                    <FormField className={styles.marginTop10}>
                        <FormField.Label>Вставьте ID чата в Telegram</FormField.Label>
                        <FormField.Content>
                            <Input placeholder={'ID чата'} value={chatId} onChange={(e) =>
                                setChatId((e.target as HTMLTextAreaElement).value.replace(/[^\d.-]+/g, ''))}/>
                            <FormField.Message className={styles.label}>ID чата можно получить в нашем&nbsp;</FormField.Message>
                            <a className={styles.link} href={'/'}>Telegram-боте</a>
                        </FormField.Content>
                    </FormField>
                    <FormField className={styles.marginTop20}>
                        <FormField.Content>
                            <Button disabled={checkFilled()} onClick={registerAction} design={'accent'}>Создать</Button>
                        </FormField.Content>
                    </FormField>
                    <Flex center className={styles.marginTop10}>
                        <Text size={'s'} color={'seattle100'}>Есть аккаунт?&nbsp;
                            <button className={styles.link} onClick={() => navigate('/login')}>Войти</button>
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
                            <H5 style={{fontSize: '16px'}}>Аккаунт с таким логином, Merchant ID,ключом<br/> авторизации
                            или ID чата уже зарегистрирован.</H5>
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

export default Registration;