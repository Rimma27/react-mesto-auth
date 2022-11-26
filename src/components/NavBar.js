import { Link, useLocation } from "react-router-dom";

function NavBar({ isLoggedIn, onLogOut, email }) {
    const location = useLocation(); 
    return (
        <div className="navbar">
            {isLoggedIn &&
                <div className="navbar__nav">
                    <div className="navbar__item navbar__item_email">{email}</div>
                    <button onClick={onLogOut} className="navbar__button">Выйти</button>
                </div>
            }

            { location.pathname === '/sign-up' &&
                <Link to='sign-in' className="navbar__item">Войти</Link>
            }

            { location.pathname === '/sign-in' &&
                <Link to='sign-up' className="navbar__item">Регистрация</Link>
            }

        </div>
    )
}

export default NavBar;