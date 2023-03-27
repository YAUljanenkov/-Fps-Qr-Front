import {Header} from "vienna-ui";
import React, {useEffect} from "react";
import logo from '../../static/logo.jpg';
import styles from './App.module.css';
import {Outlet, useNavigate} from "react-router-dom";

const App = () => {
    const navigate = useNavigate();
    const items = [
        {value: '/qrs', label: 'Метки'},
        {value: '/orders', label: 'Платежи'},
    ];
    const [state, setState] = React.useState(window.location.pathname === '/' ?
        {value: '/qrs'} : {value: window.location.pathname});
    const handleChange = (e: React.FormEvent, value: string) => {
        setState({value});
    }

    useEffect(() => {
        navigate(state.value)
    }, [state.value])

    return (
        <>
            <Header size={'m'} logo={
                <img className={styles.logo} alt={'sellable logo'} src={logo}/>
            }
                    items={
                        <Header.Items onChange={handleChange} value={state.value}>
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