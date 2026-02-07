import { fetchGetMovie } from "../../api/fetches";
import { MoviesList } from "../MoviesList/MoviesList";

export async function GenreMoviesListContainer({ genre }: { genre: string }) {
  const movies = await fetchGetMovie({genre});
  movies.sort((a, b) => {
    return Number(b.tmdbRating) > Number(a.tmdbRating) ? 1 : -1
  })

  return <MoviesList initialMovies={movies} isFavorite={false}/>;
}
