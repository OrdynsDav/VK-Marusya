import Image from "next/image"
import { MovieSchema } from "../../api/schemas"
import "./TopMovies.scss"

export default function TopMovies({ serverMoviesTop }: { serverMoviesTop: MovieSchema[] }) {
    return (
        <section className="top">
            <div className="container">
                <h2 className="top__title">Топ 10 фильмов</h2>
                <ul className="top__list">
                    {serverMoviesTop.map((movie) => {
                        return <li className="top__item" key={movie.id}>
                            <a className="top__link" href={`/movies/${movie.id}`}>
                                <Image
                                    className="top__img"
                                    src={movie.backdropUrl}
                                    alt={`Картинка для ${movie.title}`}
                                    quality={75}
                                    width={224}
                                    height={336}
                                    loading="lazy"
                                    fetchPriority="low"
                                />
                            </a>
                        </li>
                    })}
                </ul>
            </div>
        </section>
    )
}