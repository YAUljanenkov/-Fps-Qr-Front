import React from "react";
import {Button, Card, Flex, FormField, Input, InputPassword, Text} from "vienna-ui";
import styles from './Registration.module.css';
import logo from '../../static/logo.jpg';

const Registration = () => {
    return (
        <div className={styles.space}>
            <Card className={styles.loginView}>
                <div className={styles.wrapper}>
                    <img width={'125px'} height={'30px'} src={logo} alt="logo" className={styles.logo}/>
                    <h2 className={styles.title}>Регистрация</h2>
                    <FormField>
                        <FormField.Label required>Придумайте логин</FormField.Label>
                        <FormField.Content>
                            <Input placeholder={'логин'} />
                        </FormField.Content>
                    </FormField>
                    <FormField className={styles.marginTop10}>
                        <FormField.Label required>Придумайте пароль</FormField.Label>
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
                    <FormField className={styles.marginTop10}>
                        <FormField.Label required>Вставьте Merchant ID</FormField.Label>
                        <FormField.Content>
                            <Input placeholder={'Merchant ID'} />
                        </FormField.Content>
                    </FormField>
                    <FormField className={styles.marginTop10}>
                        <FormField.Label required>Вставьте ключ авторизации</FormField.Label>
                        <FormField.Content>
                            <Input placeholder={'Ключ авторизации'} />
                            <FormField.Message className={styles.label}>Ключ авторизации можно получить в сервисе&nbsp;</FormField.Message>
                            <a className={styles.link} href={'https://pay.raif.ru/account/#/auth'}>Raif Pay</a>
                        </FormField.Content>
                    </FormField>
                    <FormField className={styles.marginTop10}>
                        <FormField.Label>Вставьте ID чата в Telegram</FormField.Label>
                        <FormField.Content>
                            <Input placeholder={'ID чата'}/>
                            <FormField.Message className={styles.label}>ID чата можно получить в нашем&nbsp;</FormField.Message>
                            <a className={styles.link} href={'/'}>Telegram-боте</a>
                        </FormField.Content>
                    </FormField>
                    <FormField className={styles.marginTop20}>
                        <FormField.Content>
                            <Button design={'accent'}>Создать</Button>
                        </FormField.Content>
                    </FormField>
                    <Flex center className={styles.marginTop10}>
                        <Text size={'s'} color={'seattle100'}>Есть аккаунт?&nbsp;
                            <a className={styles.link} href={'/login'}>Войти</a>
                        </Text>
                    </Flex>
                </div>
            </Card>
        </div>
    )
}

export default Registration;