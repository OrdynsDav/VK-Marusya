'use client';

import './Header.scss';
import Link from 'next/link';
import { memo } from 'react';
import { useMediaQuery } from '../../hooks';
import HeaderSearch from './components/HeaderSearch/HeaderSearch';
import HeaderNav from './components/HeaderNav/HeaderNav';
import { HeaderAuthButton } from './components/HeaderAuthButton/HeaderAuthButton';

export default memo(function Header() {
  const isDesktop = useMediaQuery('(min-width: 801px)');

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo" href="/" aria-label='Ссылка на главную страницу'>
            <svg width="144" height="32">
              <use href="/sprite.svg#icon-logo"></use>
            </svg>
          </Link>
          <div className="header__inner">
            <HeaderNav />
            <HeaderSearch />
          </div>
          {isDesktop ? <HeaderAuthButton isDesktop={true}/> : null}
        </div>
      </div>
    </header >
  );
});
