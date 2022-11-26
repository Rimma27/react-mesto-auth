import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault(); 
        onUpdateUser({
          name: name,
          about: description,
        });
      }

    return (
        <>
            <PopupWithForm name={'profile'} title={'Редактировать профиль'} isOpen={isOpen} onClose={onClose} submitTitle={'Сохранить'} onSubmit={handleSubmit}>
                <label>
                    <input value={name || ''} onChange={handleChangeName} type="text" id="name-item" name="name" className="popup__item popup__item_type_name"
                        placeholder="Имя" required minLength="2" maxLength="40" />
                    <span className="popup__item-error name-item-error"></span>
                </label>
                <label>
                    <input value={description || ''} onChange={handleChangeDescription} type="text" id="job-item" name="job" className="popup__item popup__item_type_job"
                        placeholder="Сфера деятельности" required minLength="2" maxLength="200" />
                    <span className="popup__item-error job-item-error"></span>
                </label>`
            </PopupWithForm>


        </>
    )
}

export default EditProfilePopup;