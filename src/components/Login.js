import { useState } from "react";
import AuthForm from "./AuthForm.js";

function Login({ onLogin, onClick }) {
   
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
        </>
    )
}

export default Login;
