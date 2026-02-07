import "./page.scss"
import { CustomLink } from "../../UI/CustomLink/CustomLink"
import { GenreMoviesListContainer } from "../../UI/GenreList/GenreList"
import { notFound } from "next/navigation"

const genreData = {
  drama: {genre: "drama",title: "Драма",imageUrl: "/images/drama.png"},
  comedy: {genre: "comedy",title: "Комедия",imageUrl: "/images/comedy.png"},
  mystery: {genre: "mystery",title: "Детектив",imageUrl: "/images/mystery.png"},
  family: {genre: "family",title: "Семейное",imageUrl: "/images/family.png"},
  history: {genre: "history",title: "Историческое",imageUrl: "/images/history.png"},
  thriller: {genre: "thriller",title: "Триллер",imageUrl: "/images/thriller.png"},
  fantasy: {genre: "fantasy",title: "Фантастика",imageUrl: "/images/fantasy.png"},
  adventure: {genre: "adventure",title: "Приключения",imageUrl: "/images/adventure.png"},
  scifi: {genre: "scifi",title: "Научная фантастика",imageUrl: "/images/scifi.png"},
  standup: {genre: "stand-up",title: "Стендап",imageUrl: "/images/stand-up.png"},
  romance: {genre: "romance",title: "Романтика",imageUrl: "/images/romance.png"},
  music: {genre: "music",title: "Музыкальное",imageUrl: "/images/music.png"},
  crime: {genre: "crime",title: "Криминальное",imageUrl: "/images/crime.png"},
  tvMovie: {genre: "tv-movie",title: "Телефильм",imageUrl: "/images/tv-movie.png"},
  action: {genre: "action",title: "Боевик",imageUrl: "/images/action.png"},
  western: {genre: "western",title: "Вестерн",imageUrl: "/images/western.png"},
  animation: {genre: "animation",title: "Анимация",imageUrl: "/images/animation.png"},
  war: { genre: "war", title: "Военное", imageUrl: "/images/war.png" },
  documentary: { genre: "documentary", title: "Документальный", imageUrl: "/images/documentary.png" },
  horror: { genre: "horror", title: "Хоррор", imageUrl: "/images/horror.png" }
}

export default async function GenrePage({ params }: { params: Promise<{ genre: string }> }) {
  const { genre } = await params

  const data = genreData[genre]

  if (!data) {
    notFound();
  }

  return (
    <section className="genre">
      <div className="container">
        <div className="genre__inner">
          <CustomLink className="genre__btn-back" href={"/genres"}>
            <svg width="13" height="22">
              <use href="/sprite.svg#icon-left-arrow"></use>
            </svg>
          </CustomLink>
          <h1 className="genre__title">{data.title}</h1>
        </div>
        <GenreMoviesListContainer genre={data.genre} />
      </div>
    </section>
  )
}
