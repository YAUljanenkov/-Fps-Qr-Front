import {Header} from "vienna-ui";
import React, {useEffect, useState} from "react";
import logo from '../../static/logo.jpg';
import styles from './App.module.css';
import {Outlet, useNavigate} from "react-router-dom";

export function handleFloat(number: string, integerSize: number, floatSize: number): string {
    number = number.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
    let numParts = number.split('.');
    if (numParts.length === 2) {
        return `${numParts[0].slice(0, integerSize)}.${numParts[1].slice(0, floatSize)}`;
    } else if (number.includes('.')) {
        return number.slice(0, integerSize + 1);
    } else {
        return number.slice(0, integerSize);
    }
}

export function restoreFloat(num: string): number {
    if(num[num.length] === '.') {
        return Number(num.slice(0, num.length - 1));
    }
    return Number(num);
}

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
            <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', backgroundColor: 'white', zIndex: '100'}}>
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
            </div>
            <div style={{width: '100vw', height: '80px'}}></div>
            <Outlet/>
        </>
    )
}

export default App;