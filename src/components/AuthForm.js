import React from 'react';

function AuthForm({ title, valueEmail, valuePassword, submitTitle, onChange, onSubmit, onClick }) {
    return (
        <div className="auth">
            <h2 className="auth__heading">{title}</h2>
            <form className="auth__form" onSubmit={onSubmit}>
                <label>
                    <input value={valueEmail} className="auth__input" onChange={onChange} type="email" id="email-item" name="email" placeholder="Email" required />
                    <span className="auth__input-error email-item-error"></span>
                </label>
                <label>
                    <input value={valuePassword} className="auth__input" onChange={onChange} type="password" id="password-item" name="password" placeholder="Пароль" required />
                    <span className="auth__input-error password-item-error"></span>
                </label>
                <button onClick={onClick} type="submit" className="auth__submit">{submitTitle}</button>
            </form>
        </div>
    )
}
export default AuthForm;