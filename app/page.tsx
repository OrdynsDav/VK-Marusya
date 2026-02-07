import dynamic from 'next/dynamic';
import { MovieHeroButton } from './UI/interfaces';
import { fetchGetMovie } from './api/fetches';

const MovieHero = dynamic(() => import('./UI/MovieHero/MovieHero'));
const TopMovies = dynamic(() => import('./UI/TopMovies/TopMovies'), {
  ssr: true
});

export default async function Page() {
  const movies = await fetchGetMovie();

  const topMovies = movies
    .sort((a, b) => b.tmdbRating - a.tmdbRating)
    .slice(0, 10);

  const movieHeroButtons: MovieHeroButton[] = [
    { id: 'trailer', text: 'Трейлер', option: 'button', size: 'medium', variant: 'primary' },
    { id: 'details', text: 'О фильме', option: 'link', size: 'medium', variant: 'secondary' },
    { id: 'favorite', icon: 'icon-heart', option: 'button', size: 'small', variant: 'secondary', ariaLabel: 'Кнопка добавления или удаления из избранного' },
    { id: 'refresh', icon: 'icon-refresh', option: 'button', size: 'small', variant: 'secondary', ariaLabel: 'Кнопка обновления случайного фильма' },
  ];

  return (
    <>
      <MovieHero buttons={movieHeroButtons} random={true} page='main' />
      <TopMovies serverMoviesTop={topMovies} />
    </>
  );
}
