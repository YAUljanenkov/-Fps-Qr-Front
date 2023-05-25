import React, {useState} from "react";
import {Button, Card, FormField, Groups, H5, Input, InputPassword, Modal} from "vienna-ui";
import styles from './Restore.module.css';
import logo from '../../static/logo.jpg';
import {restorePassword} from "../../network/requests";
import {setCookie} from "typescript-cookie";
import {useNavigate} from "react-router-dom";

const Restore = () => {
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [token, setToken] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const restoreAction = async () => {
        try {
            let accessToken = await (await restorePassword(token, password)).data;
            setCookie('access_token', accessToken.access_token, {expires: 1/24});
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
                    <h2 className={styles.title}>Восстановление пароля</h2>
                    <FormField className={styles.marginTop10}>
                        <FormField.Label required>Вставьте ключ авторизации</FormField.Label>
                        <FormField.Content>
                            <Input placeholder={'Ключ авторизации'} value={token} onChange={(e) =>
                                setToken((e.target as HTMLTextAreaElement).value)}/>
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
                    <FormField className={styles.marginTop20}>
                        <FormField.Content>
                            <Button onClick={restoreAction} disabled={!token || !password || password !== checkPassword}
                                    design={'accent'}>Войти</Button>
                        </FormField.Content>
                    </FormField>
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
                            <H5 style={{fontSize: '16px'}}>Токен авторизации не найден.</H5>
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

export default Restore;