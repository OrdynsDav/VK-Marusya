import "./HeaderSearch.scss"
import { memo, useEffect, useState } from "react";
import { MovieSchema } from "../../../../api/schemas";
import { fetchGetMovie } from "../../../../api/fetches";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const DynamicSearchResponse = dynamic(() => import("../../../SearchResponse/SearchResponse"), {
    ssr: false,
})

const DynamicMobileSearchModal = dynamic(() => import("../../../Modals/MobileSearchModal/MobileSearchModal"), {
    ssr: false,
})

function debounce<T extends (...args: Parameters<T>) => void>(func: T, delay: number):
    (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return function (...args: Parameters<T>) {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func.apply(this, args);
            timeoutId = null;
        }, delay);
    };
}

export default memo(function HeaderSearch({
    isSearchFieldOpen, 
    setIsSearchFieldOpen
}: { 
    isSearchFieldOpen?: boolean, 
    setIsSearchFieldOpen?: (state: boolean) => void 
}) {
    const [searchResults, setSearchResults] = useState<MovieSchema[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [isNotFound, setisNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setSearchValue('');
        setSearchResults([]);
    }, [pathname]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const searchInput = document.getElementById('search');
            const searchResponse = document.querySelector('.search-response');
            if (
                searchResponse &&
                searchInput &&
                !searchInput.contains(event.target as Node) &&
                !searchResponse.contains(event.target as Node)
            ) {
                setSearchResults([]);
            }
        }

        document.addEventListener('pointerdown', handleClickOutside);
        return () => {
            document.removeEventListener('pointerdown', handleClickOutside);
        };
    }, [searchResults]);

    function handleSearch(searchValue: string) {
        if (searchValue.length > 0) {
            setisNotFound(false)
            setIsLoading(true);

            fetchGetMovie({ title: searchValue, count: 5 })
                .then((movies) => {
                    if (movies && movies.length > 0) {
                        setSearchResults(movies);
                    } else {
                        setSearchResults([]);
                        setisNotFound(true)
                    }
                })
                .catch(() => {
                    setSearchResults([]);
                    setisNotFound(true)
                })
                .finally(() => {
                    setIsLoading(false);
                })
        } else {
            setSearchResults([]);
            setisNotFound(false);
            setIsLoading(false);
        }
    }

    const debouncedSearch = debounce(handleSearch, 300);

    return (
        <>
            {isSearchFieldOpen && (
                <DynamicMobileSearchModal
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    handleSearch={handleSearch}
                    isOpen={isSearchFieldOpen}
                    onclose={() => {
                        setIsSearchFieldOpen(false)
                    }}
                    isNotFound={isNotFound}
                    searchResults={searchResults}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            )}
            <form className="header__form" action="#">
                <label className="header__label" htmlFor="search" aria-label="Иконка поиска">
                    <svg width="24" height="24">
                        <use href="/sprite.svg#icon-search"></use>
                    </svg>
                </label>
                <input
                    className="header__input"
                    type="text"
                    id="search"
                    placeholder="Поиск"
                    onInput={(event) => {
                        setSearchValue(event.currentTarget.value)
                        debouncedSearch(event.currentTarget.value)
                    }}
                    value={searchValue}
                />
                {searchValue !== '' && (
                    <button className='header__reset' type="button"
                        onClick={() => {
                            setSearchValue('');
                            setSearchResults([]);
                            setisNotFound(false)
                        }}
                    >
                        <svg width="13" height="13">
                            <use href="/sprite.svg#icon-close"></use>
                        </svg>
                    </button>
                )}
            </form>
            {
                (searchResults.length > 0 || isNotFound || isLoading) && (
                    isSearchFieldOpen
                        ? null
                        : <DynamicSearchResponse
                            movies={searchResults}
                            notFound={isNotFound}
                            isLoading={isLoading} />
                )
            }
        </>
    )
})