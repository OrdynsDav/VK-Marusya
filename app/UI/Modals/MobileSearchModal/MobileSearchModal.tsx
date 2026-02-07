'use client';

import { useEffect, useRef, useState } from 'react';
import '../modal.scss';
import './MobileSearchModal.scss';
import { createPortal } from 'react-dom';
import { MovieSchema } from '../../../api/schemas';
import { Loader } from '../../Loader/Loader';
import dynamic from 'next/dynamic';

const DynamicSearchResponse = dynamic(() => import("../../SearchResponse/SearchResponse"), {
    loading: () => <Loader size="large" />,
    ssr: false,
})

export default function MobileSearchModal({
    handleSearch,
    searchValue,
    setSearchValue,
    isOpen,
    onclose,
    searchResults,
    isNotFound,
    isLoading,
    setIsLoading
}: {
    handleSearch: (value: string) => void;
    searchValue: string;
    setSearchValue: (value: string) => void;
    isOpen: boolean;
    onclose: () => void;
    searchResults: MovieSchema[];
    isNotFound: boolean;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}) {
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            const raf = requestAnimationFrame(() => {
                if (modalRef.current) {
                    modalRef.current.getBoundingClientRect();
                }

                setIsVisible(true);
            });

            return () => {
                cancelAnimationFrame(raf);
            };
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div
            ref={modalRef}
            className={`mobile-search-modal modal modal-overlay ${isVisible ? 'is-show' : ''}`}
        >
            <div className="container">
                <form className="mobile-search-modal__form" action="#">
                    <label className='mobile-search-modal__label' htmlFor="search" aria-label="Иконка поиска">
                        <svg width="24" height="24">
                            <use href="/sprite.svg#icon-search"></use>
                        </svg>
                    </label>
                    <input
                        className="mobile-search-modal__field"
                        type="text"
                        id="search"
                        placeholder="Поиск"
                        onInput={(event) => {
                            setSearchValue(event.currentTarget.value);
                            if (event.currentTarget.value.length > 0) {
                                setIsLoading(true);
                            }
                            handleSearch(event.currentTarget.value);
                        }}
                        value={searchValue}
                        autoFocus
                    />
                    <button className='mobile-search-modal__close' type="button"
                        onClick={() => {
                            setIsVisible(false);
                            setTimeout(() => {
                                onclose()
                            }, 400)

                        }}
                    >
                        <svg width="13" height="13">
                            <use href="/sprite.svg#icon-close"></use>
                        </svg>
                    </button>
                </form>
                {(searchResults.length > 0 || isNotFound || isLoading) && (
                    <DynamicSearchResponse
                        movies={searchResults}
                        notFound={isNotFound}
                        slider={true}
                        isMobile={true}
                        isLoading={isLoading} />
                )}
            </div>
        </div>,
        document.body
    );
}