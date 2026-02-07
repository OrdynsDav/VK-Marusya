'use client';

import "../modal.scss"
import './AuthModal.scss';
import { Button } from '../../Button/Button';
import { Field } from '../../interfaces';
import { useState } from 'react';
import { fetchLogin, fetchProfile, fetchRegister } from '../../../api/fetches';
import { createPortal } from 'react-dom';
import { loginSchema, registerSchema } from '../../../api/schemas';
import { useAuthStore } from "../../../store/authStore";
import dynamic from "next/dynamic";
import { Loader } from "../../Loader/Loader";
import { useMediaQuery } from "../../../hooks";

// Поля для форм
const loginFields: Field[] = [
  { key: 1, id: 'email', type: 'email', placeholder: 'Электронная почта', icon: 'email' },
  { key: 2, id: 'password', type: 'password', placeholder: 'Пароль', icon: 'password' },
];

const registerFields: Field[] = [
  { key: 1, id: 'email', type: 'email', placeholder: 'Электронная почта', icon: 'email' },
  { key: 2, id: 'user-name', type: 'text', placeholder: 'Имя', icon: 'user' },
  { key: 3, id: 'user-surname', type: 'text', placeholder: 'Фамилия', icon: 'user' },
  { key: 4, id: 'password', type: 'password', placeholder: 'Пароль', icon: 'password' },
  { key: 5, id: 'verify-password', type: 'password', placeholder: 'Подтвердите пароль', icon: 'password' },
];

const DynamicAfterRegisterModal = dynamic(() => import("../AfterRegisterModal/AfterRegisterModal"))

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [inputErrors, setInputErrors] = useState<Set<string>>(new Set());
  const [showAfterRegister, setShowAfterRegister] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 801px)');

  const { setAuth } = useAuthStore()

  const fields = isLogin ? loginFields : registerFields;
  const title = isLogin ? null : 'Регистрация';
  const submitText = isLogin ? 'Войти' : 'Создать аккаунт';
  const linkText = isLogin ? 'Регистрация' : 'У меня есть пароль';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = {
      email: formData.get('email'),
      password: formData.get('password'),
      name: formData.get('user-name'),
      surname: formData.get('user-surname'),
      verifyPassword: formData.get('verify-password'),
    };

    let result;

    if (isLogin) {
      result = loginSchema.safeParse(formValues);
    } else {
      result = registerSchema.safeParse(formValues);
    }

    if (!result.success) {
      const newErrors = new Set<string>();

      const fieldIdMap: Record<string, string> = {
        email: 'email',
        password: 'password',
        name: 'user-name',
        surname: 'user-surname',
        verifyPassword: 'verify-password',
      };

      result.error.issues.forEach((issue) => {
        const zodKey = issue.path[0] as string;
        const htmlId = fieldIdMap[zodKey];
        if (htmlId) {
          newErrors.add(htmlId);
        }
      });

      setInputErrors(newErrors);
      return;
    }

    setInputErrors(new Set());

    if (!isLogin) {
      const userData = {
        email: result.data.email,
        password: result.data.password,
        name: result.data.name,
        surname: result.data.surname,
      };

      try {
        await fetchRegister(userData).then(() => {
          setShowAfterRegister(true)
        });

      } catch (error) {
        setInputErrors(new Set(['email']));
      }

    } else {
      const userData = {
        email: result.data.email,
        password: result.data.password
      };
      try {
        await fetchLogin(userData).then(async (response) => {
          if (response.result) {
            const profile = await fetchProfile();
            setAuth(profile.email, profile.name, profile.surname, profile.favorites)
            onClose();
          }
        })
      } catch (error) {
        setInputErrors(new Set(['email', 'password']));
      }
    }
  };

  const switchMode = () => {
    setIsLogin((prev) => !prev);
    setInputErrors(new Set());
  };

  if (showAfterRegister) {
    return <DynamicAfterRegisterModal onClose={onClose} />;
  }

  return createPortal(
    <div
      className="modal-overlay modal modal-auth"
      data-auth-type={fields == registerFields ? 'register' : 'login'}
      data-device={isDesktop ? 'desktop' : 'mobile'}
    >
      <div className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
        {isDesktop && (
          <button className="modal__close" type="button" onClick={onClose}>
            <svg width="24" height="24">
              <use href="/sprite.svg#icon-close"></use>
            </svg>
          </button>
        )
        }
        <form className="modal__form" onSubmit={handleSubmit}>
          {!isDesktop && (
            <button className="modal__close" type="button" onClick={onClose}>
              <svg width="24" height="24">
                <use href="/sprite.svg#icon-close"></use>
              </svg>
            </button>
          )
          }
          <svg className="modal__icon" width="133" height="30">
            <use href="/sprite.svg#icon-logo-modal"></use>
          </svg>

          {title && <h2 className="modal__title">{title}</h2>}

          <ul className="modal__list">
            {fields.map((field) => (
              <li className="modal__item" key={field.key}>
                <div className={`custom-input ${inputErrors.has(field.id) ? 'custom-input--error' : ''}`}>
                  <label className="custom-input__label" htmlFor={field.id}>
                    <svg className="custom-input__icon" width="24" height="24">
                      <use href={`/sprite.svg#icon-${field.icon}`}></use>
                    </svg>
                  </label>
                  <input
                    className="custom-input__field"
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={() => {
                      setInputErrors((prev) => {
                        const next = new Set(prev);
                        next.delete(field.id);
                        return next;
                      });
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <Button className="modal__btn" type="submit">
            {submitText}
          </Button>

          <button className="modal__link" type="button" onClick={switchMode}>
            {linkText}
          </button>
        </form>
      </div>
    </div >,
    document.body
  );
}
