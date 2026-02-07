'use client';

import '../modal.scss';
import './AfterRegisterModal.scss';
import { createPortal } from 'react-dom';
import { Button } from '../../Button/Button';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useMediaQuery } from '../../../hooks';

const DynamicAuthModal = dynamic(() => import('../AuthModal/AuthModal'), {
  ssr: false,
})

export default function AfterRegisterModal({ onClose }: { onClose: () => void }) {
  const [showAuth, setShowAuth] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 801px)');

  if (showAuth) {
    return <DynamicAuthModal onClose={onClose} />;
  }

  return createPortal(
    <div className="modal-overlay modal modal-after-register" data-device={isDesktop ? 'desktop' : 'mobile'}>
      <div className="modal__wrapper">
        {isDesktop && (
          <button className="modal__close" type="button" onClick={onClose}>
            <svg width="24" height="24">
              <use href="/sprite.svg#icon-close"></use>
            </svg>
          </button>
        )
        }
        <div className="modal__inner">
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
          <div className="modal__description">
            <h2 className="modal__title">Регистрация завершена</h2>
            <p className="modal__text">Используйте вашу электронную почту для входа</p>
          </div>
          <Button
            className="modal__link"
            onClick={() => setShowAuth(true)}
          >
            Войти
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};
