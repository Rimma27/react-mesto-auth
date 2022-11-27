import { useState } from "react";
import AuthForm from "./AuthForm.js";
import InfoTooltip from "./InfoTooltip.js";

function Login({ onLogin, isOpen, onClose, onClick, isRegisterSuccess, isLoginError }) {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
   
    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!userData.email || !userData.password) {
            return
        }
        onLogin(userData.email, userData.password);        
    }

    return (
        <>
            <AuthForm title={'Вход'} valueEmail={userData.email} valuePassword={userData.password} submitTitle={'Войти'}
                onChange={handleChange} onSubmit={handleSubmit} onClick={onClick} />
            <InfoTooltip isOpen={isOpen} onErrorClose={onClose} isRegisterSuccess={isRegisterSuccess} isLoginError={isLoginError} />
        </>
    )
}

export default Login;
