import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleChangeName(e) {
        setName(e.target.value)
    }
    function handleChangeLink(e) {
        setLink(e.target.value)
    }
    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link
        });
    }

    return (
        <PopupWithForm name={'add'} title={'Новое место'} isOpen={isOpen} onClose={onClose} submitTitle={'Создать'} onSubmit={handleAddPlaceSubmit}>
            <label>
                <input onChange={handleChangeName} value={name} type="text" id="title-item" name="name" className="popup__item popup__item_type_title"
                    placeholder="Название" minLength="2" maxLength="30" required />
                <span className="popup__item-error title-item-error"></span>
            </label>
            <label>
                <input onChange={handleChangeLink} value={link} type="url" id="place-item" name="link" className="popup__item popup__item_type_place"
                    placeholder="Ссылка на картинку" required />
                <span className="popup__item-error place-item-error"></span>
            </label>`
        </PopupWithForm>
    )
}

export default AddPlacePopup;