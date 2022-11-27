import { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../contexts/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { authApi } from '../contexts/AuthApi';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [isInfotoolPopupOpen, setIsInfotoolPopupOpen] = useState(false);
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
    const [isLoginError, setIsLoginError] = useState(false);

    const cbAuthenticate = useCallback((data) => {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
    }, [])

    const checkToken = useCallback(async () => {
        try {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                throw new Error('no token')
            }
            const user = await authApi.checkToken(jwt);
            if (!user.data) {
                throw new Error('invalid user')
            }
            setLoggedIn(true);

        } catch (err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        checkToken()
    }, [])

    const cbRegister = useCallback(async (email, password) => {
        try {
            const data = await authApi.register(email, password);
            setUserEmail(email);
            setIsRegisterSuccess(true);
            setIsLoginError(false);
            return data;
        } catch (err) {
            console.log(err);
            setIsRegisterSuccess(false);
            setIsLoginError(true);
        }
    }, [cbAuthenticate])

    const cbLogin = useCallback(async (email, password) => {
        try {
            const data = await authApi.login(email, password);
            if (!data) {
                throw new Error('Неверный email или пароль пользователя')
            }
            if (data.token) {
                await cbAuthenticate(data);
                setUserEmail(email);
                setIsRegisterSuccess(false);
                setIsLoginError(false);
                return data;
            }
        } catch (err) {
            console.log(err);
            setIsLoginError(true);
        }
    }, [cbAuthenticate])

    const cbLogOut = useCallback(() => {
        localStorage.clear();
        setLoggedIn(false);
        setIsRegisterSuccess(false);
        setIsLoginError(false);
    }, [])

    const handleInfotoolClick = () => {
        setIsInfotoolPopupOpen(true);
    }

    useEffect(() => {
        if (!loggedIn){
            return;
        }
        api.getInitialCards(cards)
            .then((data) => {
                const cards = data;
                setCards(cards);
            })
            .catch(err => console.log('Ошибка', err));
        api.getUserInfo()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch(err => console.log('Ошибка', err));
    }, [loggedIn])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.setCardLike(card._id, isLiked)
            .then((newCard) => {
                setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log('Ошибка при установке лайка', err));
    }
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch(err => console.log('Ошибка при удалении карточки', err));
    }
    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }
    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
        setIsImagePopupOpen(false);
        setIsInfotoolPopupOpen(false);
    }
    function handleUpdateUser(currentUserUpdated) {
        api.setUserInfo(currentUserUpdated)
            .then((currentUserUpdated) => {
                setCurrentUser(currentUserUpdated);
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка редактирования профиля', err));
    }
    function handleUpdateAvatar(link) {
        api.updateAvatar(link)
            .then((link) => {
                setCurrentUser(link);
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка при обновлении аватара', err));
    }
    function handleAddPlace(newCard) {
        api.addCard(newCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка при добавлении карточки', err));
    }

    return (
        <div className='body'>
            <div className='page'>
                <CurrentUserContext.Provider value={currentUser}>
                    <Header email={userEmail} isLoggedIn={loggedIn} onLogOut={cbLogOut} />
                    <Switch>
                        <ProtectedRoute path="/" exact loggedIn={loggedIn} component={Main}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete} />

                        <Route path="/sign-up">
                            <Register 
                            onRegister={cbRegister} 
                            isRegisterSuccess={isRegisterSuccess} 
                            isLoginError={isLoginError}
                            onClick={handleInfotoolClick} 
                            isOpen={isInfotoolPopupOpen} 
                            onClose={closeAllPopups} 
                            toLogin={cbLogin} />
                        </Route>
                        
                        <Route path="/sign-in">
                            <Login 
                            onLogin={cbLogin} 
                            isRegisterSuccess={isRegisterSuccess} 
                            isLoginError={isLoginError}
                            onClick={handleInfotoolClick} 
                            isOpen={isInfotoolPopupOpen} 
                            onClose={closeAllPopups} />
                        </Route>
                    </Switch>
                    <Route path="*">
                        {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
                    </Route>
                    <Footer />
                    <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
                    <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
                    <AddPlacePopup onAddPlace={handleAddPlace} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
                    <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />

                </CurrentUserContext.Provider>
            </div>
        </div>
    )
}
export default App;
