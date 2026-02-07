'use client';

import './HeaderNav.scss';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMediaQuery } from '../../../../hooks';
import { memo, useState } from 'react';
import { HeaderAuthButton } from '../HeaderAuthButton/HeaderAuthButton';
import MobileSearchModal from '../../../Modals/MobileSearchModal/MobileSearchModal';
import HeaderSearch from '../HeaderSearch/HeaderSearch';

const headerItems = [
    { key: 0, href: '/', content: 'Главная' },
    { key: 1, href: '/genres', content: 'Жанры' },
];

function isActive(pathname: string, href: string) {
    return pathname === href || (href === '/genres' && pathname.startsWith('/genres/'));
}

export default memo(function HeaderNav() {
    const pathname = usePathname();
    const isDesktop = useMediaQuery('(min-width: 801px)');
    const [isSearchFieldOpen, setIsSearchFieldOpen] = useState(false);

    if (isDesktop) {
        return (
            <nav className="nav">
                {headerItems.map(({ key, href, content }) => (
                    <Link
                        key={key}
                        href={href}
                        className={`nav__item ${isActive(pathname, href) ? 'nav__item--active' : ''}`}
                    >
                        {content}
                    </Link>
                ))}
            </nav>
        );
    }

    return (
        <>
            <nav className="nav">
                <Link
                    className="nav__item nav__item--tablet"
                    href="/genres"
                    aria-label="Кнопка перехода к жанрам"
                >
                    <svg width="24" height="24">
                        <use href="/sprite.svg#icon-genres"></use>
                    </svg>
                </Link>
                <button
                    className="nav__item nav__item--tablet"
                    aria-label="Кнопка поиска"
                    onClick={() => {
                        setIsSearchFieldOpen(true)
                    }}
                >
                    <svg width="24" height="24">
                        <use href="/sprite.svg#icon-search"></use>
                    </svg>
                </button>
                <HeaderAuthButton isDesktop={false} />
            </nav>
            {isSearchFieldOpen ? <HeaderSearch isSearchFieldOpen={isSearchFieldOpen} setIsSearchFieldOpen={setIsSearchFieldOpen}/> : null}
        </>
    );
})
