import React, {useState} from "react";
import {Button, Card, FormField, Groups, H5, Input, InputPassword, Modal} from "vienna-ui";
import styles from './Settings.module.css'
import {restorePassword, addTg} from "../../network/requests";
import {getCookie, setCookie} from "typescript-cookie";
import {useNavigate} from "react-router-dom";
import {CheckmarkFilled} from 'vienna.icons';


const Settings = () => {
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [chatId, setChatId] = useState('');
    const navigate = useNavigate();

    const restoreAction = async () => {
        try {
            const token = getCookie('access_token');
            if (!token) {
                return navigate('/login');
            }
            const accessToken = await (await restorePassword(token, password)).data;
            setCookie('access_token', accessToken.access_token, {secure: true, expires: 1/24});
            setIsSuccessOpen(true);
        } catch (e) {
            setIsErrorOpen(true);
            console.error(e);
        }
    }

    const addTgAction = async () => {
        try {
            let intChatId: number | undefined = isNaN(parseInt(chatId))? undefined: parseInt(chatId);
            if(!intChatId) {
                setIsErrorOpen(true);
                return;
            }
            await addTg(intChatId);
            setIsSuccessOpen(true);
        } catch (e) {
            setIsErrorOpen(true);
            console.error(e);
        }
    }

  return (
      <>
          <Card className={styles.wrapper}>
              <Card.Title>Настройки</Card.Title>
              <Card.ContentTitle>Cмена пароля</Card.ContentTitle>
              <FormField className={styles.marginTop10}>
                  <FormField.Label required>Придумайте новый пароль</FormField.Label>
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
                      <Button onClick={restoreAction} disabled={!password || password !== checkPassword}
                              design={'accent'}>Сохранить</Button>
                  </FormField.Content>
              </FormField>
              <hr style={{border: '1px dotted rgb(213, 213, 214)'}} />
              <Card.ContentTitle>Привязка ID чата в Telegram</Card.ContentTitle>
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
                      <Button design={'primary'} disabled={!chatId} onClick={addTgAction}>Привязать</Button>
                  </FormField.Content>
              </FormField>
          </Card>
          <Modal isOpen={isSuccessOpen}>
              <Card.ContentTitle style={{margin: '20px 0 0 20px', fontSize: '16px'}} >Уведомление</Card.ContentTitle>
              <div style={{margin: '25px 40px 20px 20px'}}>
                  <Groups design={'vertical'} style={{marginTop: '20px'}}>
                      <Groups
                          design={'horizontal'}
                          alignItems={'center'}
                          justifyContent={'center'}
                      >
                          <CheckmarkFilled color={'#0f0f0f'} size={'l'}/><H5 style={{fontSize: '16px'}}>Успешно!</H5>
                      </Groups>
                      <Groups
                          design={'horizontal'}
                          style={{paddingTop: '5px'}}
                          justifyContent={'flex-end'}>
                          <Button onClick={() => setIsSuccessOpen(false)} size={'s'}>OK</Button>
                      </Groups>
                  </Groups>
              </div>
          </Modal>
          <Modal isOpen={isErrorOpen}>
              <Card.ContentTitle style={{margin: '20px 0 0 20px', fontSize: '16px'}} >Ошибка</Card.ContentTitle>
              <div style={{margin: '25px 40px 20px 20px'}}>
                  <Groups design={'vertical'} style={{marginTop: '20px'}}>
                      <Groups
                          design={'horizontal'}
                          alignItems={'center'}
                          justifyContent={'center'}
                      >
                          <CheckmarkFilled color={'#0f0f0f'} size={'l'}/><H5 style={{fontSize: '16px'}}>Неизвестная ошибка</H5>
                      </Groups>
                      <Groups
                          design={'horizontal'}
                          style={{paddingTop: '5px'}}
                          justifyContent={'flex-end'}>
                          <Button onClick={() => setIsErrorOpen(false)} size={'s'}>OK</Button>
                      </Groups>
                  </Groups>
              </div>
          </Modal>
      </>
  )
}

export default Settings;