import "./page.scss"
import { fetchGetMovieById } from "../../api/fetches";
import { MovieHeroButton } from "../../UI/interfaces";
import MovieHero from "../../UI/MovieHero/MovieHero";

export default async function Movie({ params }: { params: Promise<{ movie: string }> }) {
  const { movie } = await params;

  const movieId = parseInt(movie, 10);

  if (isNaN(movieId)) {
    return <div>Некорректный ID фильма</div>;
  }

  const movieData = await fetchGetMovieById(movieId);

  const movieHeroButtons: MovieHeroButton[] = [
    { id: 'trailer', text: 'Трейлер', option: 'button', size: 'medium', variant: 'primary' },
    { id: 'favorite', icon: 'icon-heart', option: 'button', size: 'small', variant: 'secondary' },
  ];

  return (
    <>
      <MovieHero buttons={movieHeroButtons} random={false} movieData={movieData} page="movie" />
      <section className="about-movie">
        <div className="container">
          <div className="about-movie__wrapper">
            <h2 className="about-movie__title">О фильме</h2>
            <div className="about-movie__description">
              <ul className="about-movie__list">
                <li className="about-movie__item">
                  <span className="about-movie__heading">Язык оригинала</span>
                  <span className="about-movie__info">{movieData.language == null ? 'Неизвестно' : movieData.language}</span>
                </li>
                <li className="about-movie__item">
                  <span className="about-movie__heading">Бюджет</span>
                  <span className="about-movie__info">{movieData.budget == null ? 'Неизвестно' : movieData.budget}</span>
                </li>
                <li className="about-movie__item">
                  <span className="about-movie__heading">Выручка</span>
                  <span className="about-movie__info">{movieData.revenue == null ? 'Неизвестно' : movieData.revenue}</span>
                </li>
                <li className="about-movie__item">
                  <span className="about-movie__heading">Режиссёр</span>
                  <span className="about-movie__info">{movieData.director == null ? 'Неизвестно' : movieData.director}</span>
                </li>
                <li className="about-movie__item">
                  <span className="about-movie__heading">Продакшен</span>
                  <span className="about-movie__info">{movieData.production == null ? 'Неизвестно' : movieData.production}</span>
                </li>
                <li className="about-movie__item">
                  <span className="about-movie__heading">Награды</span>
                  <span className="about-movie__info">{movieData.awardsSummary == null ? 'Неизвестно' : movieData.awardsSummary}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
