'use client';

import "./MovieHero.scss";
import { MovieSchema } from '../../api/schemas';
import { useState, useEffect, startTransition, useMemo } from 'react';
import { fetchGetRandomMovie } from "../../api/fetches";
import MovieHeroButtons from "../MovieHeroButtons/MovieHeroButtons";
import { MovieHeroProps } from "../interfaces";
import Image from "next/image";
import { MovieHeroSkeleton } from "./skeleton/MovieHeroSkeleton";

export default function MovieHero({ buttons, random, movieData, page }: MovieHeroProps) {
  const [currentMovie, setCurrentMovie] = useState<MovieSchema | null>(null);
  const [loading, setLoading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (random) {
      fetchGetRandomMovie().then((movie) => {
        setCurrentMovie(movie);
      });
    } else if (movieData) {
      setCurrentMovie(movieData);
      setImgLoaded(false);
    }
  }, [random, movieData]);

  const refreshMovie = async () => {
    setLoading(true);
    setImgLoaded(false);

    startTransition(async () => {
      try {
        const movie = await fetchGetRandomMovie();
        setCurrentMovie(movie);
      } catch (error) {
        console.error('Ошибка:', error);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    });
  };

  function getClassNameRating(): string {
    const rating = currentMovie?.tmdbRating;
    if (rating >= 8) return 'movie-hero__rating--extra-high';
    if (rating >= 7) return 'movie-hero__rating--high';
    if (rating >= 5) return 'movie-hero__rating--middle';
    return 'movie-hero__rating--low';
  }

  function formatRuntime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} мин`;
    if (mins === 0) return `${hours} ч`;
    return `${hours} ч ${mins} мин`;
  }

  const ratingClass = useMemo(() => currentMovie ? getClassNameRating() : '', [currentMovie?.tmdbRating]);
  const runtime = useMemo(() => currentMovie ? formatRuntime(currentMovie.runtime) : '', [currentMovie?.runtime]);

  if (!currentMovie) {
    return <MovieHeroSkeleton buttons={buttons} />
  }

  return (
    <section className={`movie-hero movie-hero--${page}`}>
      <div className="container">
        <article className="movie-hero__inner">
          <div className="movie-hero__wrapper">
            <div className='movie-hero__info'>
              <div className={`movie-hero__rating ${ratingClass}`}>
                <svg width="16" height="16">
                  <use href="/sprite.svg#icon-star"></use>
                </svg>
                <span className="movie-hero__rating-text">
                  {currentMovie.tmdbRating.toFixed(1).replace('.', ',')}
                </span>
              </div>
              <span className="movie-hero__year">{currentMovie.releaseYear}</span>
              <span className="movie-hero__genre">
                {currentMovie.genres.length > 0
                  ? currentMovie.genres.join(", ")
                  : "неизвестено"
                }
              </span>
              <span className="movie-hero__runtime">{runtime}</span>
            </div>
            <h1 className='movie-hero__title'>{currentMovie.title}</h1>
            <p className='movie-hero__plot'>{currentMovie.plot}</p>

            <MovieHeroButtons
              buttons={buttons}
              onRefresh={refreshMovie}
              loading={loading}
              movieData={currentMovie}
            />
          </div>

          <div className="movie-hero__img-container">
            <Image
              src={currentMovie.posterUrl != null ? currentMovie.posterUrl : '/images/image-placeholder.webp'}
              width={680}
              height={552}
              alt={`Картинка фильма: ${currentMovie.title}`}
              priority={true}
              loading="eager"
              quality={80}
              placeholder="blur"
              blurDataURL="/images/image-placeholder.webp"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
              className="movie-hero__img"
              data-load={imgLoaded}
              fetchPriority="high"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
