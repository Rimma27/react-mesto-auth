import {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, name, countLikes, image, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (`${isOwn ? 'element__basket element__basket_visible' : 'element__basket'}`);
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`${isLiked ? 'element__like element__like_active' : 'element__like'}`);

    function handleDeleteClick() {
        onCardDelete(card);
    }
    function handleLikeClick() {
        onCardLike(card);
    }

    return (
        <article className="element">
            <button onClick={handleDeleteClick} type="button" className={cardDeleteButtonClassName}></button>
            <button onClick={() => onCardClick(card)} type="button" className="element__button-image"><img className="element__image" src={image} alt={name} /></button>
            <div className="element__group">
                <h3 className="element__title">{name}</h3>
                <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}></button>
            </div>
            <div className="element__likes">{countLikes}</div>
        </article>
    )
}

export default Card;

