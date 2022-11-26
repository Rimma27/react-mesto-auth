import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
    
    const currentUser = useContext(CurrentUserContext);

    return (
            <main className="content">
                <section className="profile">
                    <button onClick={onEditAvatar} type="button" className="profile__edit-avatar-button">
                        <img src={currentUser.avatar} className="profile__avatar" alt="Ваша фотография" />
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button onClick={onEditProfile} type="button" className="profile__edit-button" aria-label="Редактировать"></button>
                        <h2 className="profile__subtitle">{currentUser.about}</h2>
                    </div>
                    <button onClick={onAddPlace} type="button" className="profile__add-button" aria-label="Добавить"></button>
                </section>
                <section className="elements">

                    {cards.map((card) => (

                        <Card
                            card={card}
                            key={card._id}
                            name={card.name}
                            countLikes={card.likes.length}
                            image={card.link}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />)
                    )}
                </section>
            </main>
        )
    };
    export default Main;