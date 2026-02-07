import "./SearchResponseSkeleton.scss"

export function SearchResponseSkeleton({ isMobile }: { isMobile: boolean }) {
    return (
        <div className={`search-response-skeleton ${isMobile ? 'search-response-skeleton--mobile' : ''}`}>
            <div className="search-response-skeleton__item">
                <div className="search-response-skeleton__movie">
                    <div className="search-response-skeleton__img"></div>
                    <div className="search-response-skeleton__description">
                        <div className="search-response-skeleton__info">
                            <div className="search-response-skeleton__rating"></div>
                            <div className="search-response-skeleton__year"></div>
                            <div className="search-response-skeleton__genre"></div>
                            <div className="search-response-skeleton__runtime"></div>
                        </div>
                        <div className="search-response-skeleton__title"></div>
                    </div>
                </div>

            </div>
            {isMobile ? (
                <div className="search-response-skeleton__item search-response-skeleton__item--second">
                    <div className="search-response-skeleton__movie">
                        <div className="search-response-skeleton__img"></div>
                        <div className="search-response-skeleton__description">
                            <div className="search-response-skeleton__info">
                                <div className="search-response-skeleton__rating"></div>
                                <div className="search-response-skeleton__year"></div>
                                <div className="search-response-skeleton__genre"></div>
                                <div className="search-response-skeleton__runtime"></div>
                            </div>
                            <div className="search-response-skeleton__title"></div>
                        </div>
                    </div>

                </div>
            ) : null}
        </div>
    )
}