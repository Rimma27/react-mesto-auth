import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} name={'update-avatar'} title={'Обновить аватар'} isOpen={isOpen} onClose={onClose} submitTitle={'Сохранить'}>
            `<label>
                <input ref={avatarRef} type="url" id="avatar" name="link" className="popup__item popup__item_type_place"
                    placeholder="Ссылка на фотографию" required />
                <span className="popup__item-error avatar-error"></span>
            </label>`
        </PopupWithForm>
    )
}

export default EditAvatarPopup;