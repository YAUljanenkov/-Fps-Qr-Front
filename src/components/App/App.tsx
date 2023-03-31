import {Header} from "vienna-ui";
import React, {useEffect, useState} from "react";
import logo from '../../static/logo.jpg';
import styles from './App.module.css';
import {Outlet, useNavigate} from "react-router-dom";

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

    useEffect(() => {
        if (!window.location.pathname.includes(path)) {
            navigate(path)
        }
    }, [path])

    return (
        <>
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
            />
            <Outlet/>
        </>
    )
}

export default App;