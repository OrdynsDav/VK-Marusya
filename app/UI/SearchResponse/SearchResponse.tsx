import "./SearchResponse.scss";
import Link from "next/link";
import { MovieSchema } from "../../api/schemas";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { SearchResponseSkeleton } from "./skeleton/SearchResponseSkeleton";

export default function SearchResponse({
  movies,
  notFound,
  slider,
  isMobile,
  isLoading = false
}: {
  movies: MovieSchema[];
  notFound: boolean;
  slider?: boolean;
  isMobile?: boolean;
  isLoading?: boolean;
}) {

  function getClassNameRating(movie: MovieSchema): string {
    const rating = movie?.tmdbRating;
    if (rating >= 8) return 'search-response__rating--extra-high';
    if (rating >= 7) return 'search-response__rating--high';
    if (rating >= 5) return 'search-response__rating--middle';
    return 'search-response__rating--low';
  }

  function formatRuntime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} мин`;
    if (mins === 0) return `${hours} ч`;
    return `${hours} ч ${mins} мин`;
  }

  if (isLoading) {
    return <SearchResponseSkeleton isMobile={isMobile} />;
  }

  if (notFound) {
    return (
      <div className={`search-response search-response--not-found ${isMobile ? "search-response-mobile search-response--not-found-mobile" : ""}`}>
        <div className="search-response__wrapper">
            <svg width="24" height="24">
              <use href="/sprite.svg#icon-search"></use>
            </svg>
            <p className="search-response__title">По вашему запросу ничего не найдено</p>
          </div>
      </div>
    );
  }

  return (
    <div className={`search-response ${isMobile ? "search-response-mobile" : ''}`} onClick={(e) => e.stopPropagation()}>
      {slider && isMobile ? (
        <Splide
          options={{
            rewind: true,
            autoplay: true,
            speed: 1000,
            gap: '16px',
            perPage: 1.5,
            perMove: 1,
            pagination: false,
            arrows: false,
            type: 'loop',
            drag: 'free',
          }}
        >
          {movies.map((movie) => (
            <SplideSlide key={movie.id}>
              <Link className="search-response__movie" href={`/movies/${movie.id}`}>
                <img
                  className="search-response__img"
                  src={movie.backdropUrl ?? movie.posterUrl ?? "/images/image-placeholder.webp"}
                  width={158}
                  height={206}
                  alt={`Картинка для фильма ${movie.title}`}
                />
                <div className="search-response__description">
                  <div className="search-response__info">
                    <div className={`search-response__rating ${getClassNameRating(movie)}`}>
                      <svg width="10" height="10">
                        <use href="/sprite.svg#icon-star"></use>
                      </svg>
                      <span className="search-response__rating-text">
                        {movie.tmdbRating.toFixed(1).replace('.', ',')}
                      </span>
                    </div>
                    <span className="search-response__year">{movie.releaseYear}</span>
                    <span className="search-response__genre">
                      {movie.genres.length > 0 ? movie.genres.join(", ") : "неизвестено"}
                    </span>
                    <span className="search-response__runtime">{formatRuntime(movie.runtime)}</span>
                  </div>
                </div>
                <h3 className="search-response__title">{movie.title}</h3>
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <ul className="search-response__list" onClick={(e) => e.stopPropagation()}>
          {movies.map((movie) => (
            <li className="search-response__item" key={movie.id}>
              <Link className="search-response__movie" href={`/movies/${movie.id}`}>
                <img
                  className="search-response__img"
                  width={40}
                  height={52}
                  src={movie.backdropUrl ?? movie.posterUrl}
                  alt={`Картинка фильма по запросу с названием ${movie.title}`}
                />
                <div className="search-response__description">
                  <div className="search-response__info">
                    <div className={`search-response__rating ${getClassNameRating(movie)}`}>
                      <svg width="10" height="10">
                        <use href="/sprite.svg#icon-star"></use>
                      </svg>
                      <span className="search-response__rating-text">
                        {movie.tmdbRating.toFixed(1).replace('.', ',')}
                      </span>
                    </div>
                    <span className="search-response__year">{movie.releaseYear}</span>
                    <span className="search-response__genre">
                      {movie.genres.length > 0 ? movie.genres.join(", ") : "неизвестено"}
                    </span>
                    <span className="search-response__runtime">{formatRuntime(movie.runtime)}</span>
                  </div>
                  <h3 className="search-response__title">{movie.title}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
