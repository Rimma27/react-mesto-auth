import AuthForm from "./AuthForm";
import { Link } from 'react-router-dom';
import { useState } from "react";

function Register({ onRegister, onClick }) {
   
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }
   
    function handleSubmit(e) {
        e.preventDefault();
        onRegister(userData.email, userData.password);
    }

    return (
        <>
            <AuthForm 
            title={'Регистрация'} 
            valueEmail={userData.email} 
            valuePassword={userData.password} 
            submitTitle={'Зарегистрироваться'}
            onChange={handleChange} 
            onSubmit={handleSubmit} 
            onClick={onClick}/>
            <div className="register__signin">
                <p className="register__signin-title">Уже зарегистрированы?</p>
                <Link to="/sign-in" className="register__login-link">Войти</Link>
            </div>
        </>
    )
}

export default Register;