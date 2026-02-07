import "./page.scss"
import { GenreCard } from "../UI/GenreCard/GenreCard"

const genres = [
  { key: 0, href: "/genres/drama", title: "Драма", imageUrl: "/images/drama.webp" },
  { key: 1, href: "/genres/comedy", title: "Комедия", imageUrl: "/images/comedy.webp" },
  { key: 2, href: "/genres/mystery", title: "Детектив", imageUrl: "/images/mystery.webp" },
  { key: 3, href: "/genres/family", title: "Семейное", imageUrl: "/images/family.webp" },
  { key: 4, href: "/genres/history", title: "Историческое", imageUrl: "/images/history.webp" },
  { key: 5, href: "/genres/thriller", title: "Триллер", imageUrl: "/images/thriller.webp" },
  { key: 6, href: "/genres/fantasy", title: "Фантастика", imageUrl: "/images/fantasy.webp" },
  { key: 7, href: "/genres/adventure", title: "Приключения", imageUrl: "/images/adventure.webp" },
  { key: 8, href: "/genres/scifi", title: "Научная фантастика", imageUrl: "/images/scifi.webp" },
  { key: 9, href: "/genres/standup", title: "Стендап", imageUrl: "/images/stand-up.webp" },
  { key: 10, href: "/genres/romance", title: "Романтика", imageUrl: "/images/romance.webp" },
  { key: 11, href: "/genres/music", title: "Музыкальное", imageUrl: "/images/music.webp" },
  { key: 12, href: "/genres/crime", title: "Криминальное", imageUrl: "/images/crime.webp" },
  { key: 13, href: "/genres/tv-movie", title: "Телефильм", imageUrl: "/images/tv-movie.webp" },
  { key: 14, href: "/genres/action", title: "Боевик", imageUrl: "/images/action.webp" },
  { key: 15, href: "/genres/western", title: "Вестерн", imageUrl: "/images/western.webp" },
  { key: 16, href: "/genres/animation", title: "Анимация", imageUrl: "/images/animation.webp" },
  { key: 17, href: "/genres/war", title: "Военное", imageUrl: "/images/war.webp" },
  { key: 18, href: "/genres/documentary", title: "Документальный", imageUrl: "/images/documentary.webp" },
  { key: 19, href: "/genres/horror", title: "Хоррор", imageUrl: "/images/horror.webp" },
]

export default function Page() {
  return (
    <section className="genres">
      <div className="container">
        <h1 className="genres__title">Жанры фильмов</h1>
        <ul className="genres__list">
          {genres.map((genre) => (
            <li className="genres__item" key={genre.key}>
              <GenreCard
                title={genre.title}
                imageUrl={genre.imageUrl}
                href={genre.href}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
