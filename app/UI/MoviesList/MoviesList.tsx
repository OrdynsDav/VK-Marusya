'use client';

import '@splidejs/react-splide/css';
import '../../styles/blocks/splide.scss'
import './MoviesList.scss';
import Link from 'next/link';
import { useState } from 'react';
import { MovieSchema } from '../../api/schemas';
import { Button } from '../Button/Button';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useMediaQuery } from '../../hooks';
import { fetchDeleteFavorite } from '../../api/fetches';
import { LazyMovieItem } from '../LazyMovieItem/LazyMovieItem';

export function MoviesList({ initialMovies, slider = false, isFavorite = true }: { initialMovies: MovieSchema[], slider?: boolean, isFavorite?: boolean }) {
  const [visibleCount, setVisibleCount] = useState(10);
  const [movies, setMovies] = useState<MovieSchema[]>(initialMovies);
  const visibleMovies = movies.slice(0, visibleCount);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  const handleDelete = async (movieId: number) => {
    try {
      await fetchDeleteFavorite(movieId);

      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
      setVisibleCount((prev) => Math.min(prev, movies.length - 1));
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
    }
  };

  function checkLength() {
    if (visibleMovies.length.toLocaleString() == "10") return '10'
    if (visibleMovies.length.toLocaleString() == "20") return '20'
    if (visibleMovies.length.toLocaleString() == "30") return '30'
    if (visibleMovies.length.toLocaleString() == "40") return '40'
    if (visibleMovies.length.toLocaleString() == "50") return '50'

    return ''
  }

  return (
    <>
      {slider && isMobile ? (
        <Splide
          options={{
            rewind: true,
            autoplay: true,
            speed: 1000,
            gap: '40px',
            perPage: 1.5,
            perMove: 1,
            pagination: false,
            arrows: false,
            type: 'loop',
            drag: 'free',
          }}
        >
          {visibleMovies.map((movie) => (
            <SplideSlide key={movie.id}>
              <Link className="movies__link" href={`/movies/${movie.id}`}>
                <img
                  className="movies__img"
                  src={movie.backdropUrl ?? movie.posterUrl}
                  alt={`Картинка для ${movie.title}`}
                  loading='lazy'
                />
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <ul className="movies__list" data-length={checkLength()}>
          {visibleMovies.map((movie) => (
            <LazyMovieItem
              key={movie.id}
              movie={movie}
              showDelete={isFavorite ? true : false}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      {visibleCount < movies.length && !slider && (
        <Button
          className="movies__btn"
          size="medium"
          onClick={handleShowMore}
        >
          Показать еще
        </Button>)}
    </>
  );
}
