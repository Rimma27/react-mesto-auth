import React from "react";
import logo from '../images/success.svg';
import logos from '../images/error.svg';

function InfoTooltip({ isOpen, onClose, isRegisterSuccess, isLoginError, onErrorClose }) {
    return (
        <>
            {isRegisterSuccess && (<>
                <div className={`popup auth-popup ${isOpen ? 'popup-opened' : ''}`}>
                    <div className="popup__container">
                        <img src={logo} className="auth-popup__logo" alt="Success" />
                        <h2 className="auth-popup__title">Вы успешно зарегистрировались!</h2>
                        <button onClick={onClose} type="button" className="popup__button_type_close"></button>
                    </div>
                </div>
            </>
            )}
            {isLoginError && (<div className={`popup auth-popup ${isOpen ? 'popup-opened' : ''}`}>
                <div className="popup__container">
                    <img src={logos} className="auth-popup__logo" alt="Error" />
                    <h2 className="auth-popup__title">Что-то пошло не так! Попробуйте ещё раз.</h2>
                    <button onClick={onErrorClose} type="button" className="popup__button_type_close"></button>
                </div>
            </div>
            )
            }
        </>
    )
}

export default InfoTooltip;