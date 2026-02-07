'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { MovieSchema } from '../../api/schemas';

export function LazyMovieItem({
  movie,
  showDelete = false,
  onDelete,
}: {
  movie: MovieSchema;
  showDelete?: boolean;
  onDelete?: (id: number) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2, // 20% элемента в зоне видимости
  });

  useEffect(() => {
    if (inView) {
      setLoaded(true);
    }
  }, [inView]);

  return (
    <li ref={ref} className="movies__item">
      {showDelete && (
        <button
          className="movies__close"
          type="button"
          onClick={() => onDelete(movie.id)}
        >
          <svg width="24" height="24">
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </button>
      )}
      <Link className="movies__link" href={`/movies/${movie.id}`}>
        {loaded ? (
          <img
            className="movies__img"
            src={movie.backdropUrl ?? movie.posterUrl}
            alt={`Картинка для ${movie.title}`}
            loading="lazy"
          />
        ) : (
          null
        )}
      </Link>
    </li>
  );
}
