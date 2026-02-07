import './ProfileAbout.scss'
import { Button } from "../Button/Button"
import { PofileAboutProps } from "../interfaces"

export function ProfileAbout({name, surname, email, logout}: PofileAboutProps) {
    return (
        <>
            <ul className="profile__about">
                <li className="profile__item">
                    <div className="profile__avatar">
                        <span className='profile__avatar-inner'>{`${name[0].toUpperCase()}${surname[0].toUpperCase()}`}</span>
                    </div>
                    <div className="profile__user">
                        <span className='profile__description'>Имя Фамилия</span>
                        <span className='profile__info'>{`${name} ${surname}`}</span>
                    </div>
                </li>
                <li className="profile__item">
                    <div className="profile__avatar">
                        <svg width='24' height='24'>
                            <use href="/sprite.svg#icon-email"></use>
                        </svg>
                    </div>
                    <div className="profile__user">
                        <span className='profile__description'>Электронная почта</span>
                        <span className='profile__info'>{email}</span>
                    </div>
                </li>
            </ul>
            <Button
                className='profile__link'
                size='medium'
                type='button'
                variant='primary'
                onClick={() => logout()}
            >
                Выйти из аккаунта
            </Button>
        </>
    )
}