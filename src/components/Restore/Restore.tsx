import React from "react";
import {Button, Card, FormField, Input, InputPassword} from "vienna-ui";
import styles from './Restore.module.css';
import logo from '../../static/logo.jpg';

const Restore = () => {
    return (
        <div className={styles.space}>
            <Card className={styles.loginView}>
                <div className={styles.wrapper}>
                    <img width={'125px'} height={'30px'} src={logo} alt="logo" className={styles.logo}/>
                    <h2 className={styles.title}>Восстановление пароля</h2>
                    <FormField className={styles.marginTop10}>
                        <FormField.Label required>Вставьте ключ авторизации</FormField.Label>
                        <FormField.Content>
                            <Input placeholder={'Ключ авторизации'} />
                        </FormField.Content>
                    </FormField>
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
                            <Button design={'accent'}>Войти</Button>
                        </FormField.Content>
                    </FormField>
                </div>
            </Card>
        </div>
    )
}

export default Restore;