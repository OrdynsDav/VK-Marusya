'use client';

import { useEffect, useState } from 'react';
import { MovieSchema } from './api/schemas';
import { fetchGetFavorite } from './api/fetches';

export function useFavorites() {
  const [movies, setMovies] = useState<MovieSchema[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    try {
      const data = await fetchGetFavorite();
      setMovies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  return { movies, loading, reload };
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query, matches]);

  return matches;
}