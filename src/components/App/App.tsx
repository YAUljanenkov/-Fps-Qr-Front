import {Button, Header} from "vienna-ui";
import React, {useEffect, useState} from "react";
import logo from '../../static/logo.jpg';
import styles from './App.module.css';
import {Navigate, Outlet, useNavigate} from "react-router-dom";

const App = () => {
    const getCurrentLocation = () => {
        if (window.location.pathname.includes('/orders')) {
            return '/orders';
        }
        return '/qrs';
    }

    const items = [
        {value: '/qrs', label: 'Метки'},
        {value: '/orders', label: 'Платежи'},
    ];

    const [path, setPath] = useState<string>(getCurrentLocation());
    const navigate = useNavigate();
    const handleChange = (e: React.FormEvent, value: string) => {
        setPath(value);
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    useEffect(() => {
        if (!window.location.pathname.includes(path) && !window.location.pathname.includes('/login')) {
            navigate(path)
        }
    }, [path])

    return (!localStorage.getItem('token') ? <Navigate to={'/login'}/> :
            <>
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    backgroundColor: 'white',
                    zIndex: '100'
                }}>
                    <Header size={'m'} logo={
                        <img className={styles.logo} alt={'sellable logo'} src={logo}/>
                    }
                            items={
                                <Header.Items onChange={handleChange} value={path}>
                                    {items.map(({value, label}) => (
                                        <Header.Item key={value} value={value} label={label}/>
                                    ))}
                                </Header.Items>
                            }
                            action={<div className={styles.logout}><Button onClick={handleLogout}
                                                                           design={'ghost'}>Выйти</Button></div>}
                    />
                </div>
                <div style={{width: '100vw', height: '80px'}}></div>
                <Outlet/>
            </>
    )
}

export default App;