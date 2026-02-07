import './MovieHeroSkeleton.scss'
import { MovieHeroButton } from "../../interfaces";
import { Loader } from "../../Loader/Loader";

export function MovieHeroSkeleton({ buttons }: {buttons: MovieHeroButton[]}) {
    return (
        <section className="movie-hero-skeleton">
            <div className="container">
                <article className="movie-hero-skeleton__inner">
                    <div className="movie-hero-skeleton__wrapper">
                        <div className="movie-hero-skeleton__info"></div>
                        <div className="movie-hero-skeleton__title"></div>
                        <div className="movie-hero-skeleton__plot"></div>
                        <div className="movie-hero-skeleton__buttons">
                            {buttons.map(() => {
                                return <div key={Math.random()} className="movie-hero-skeleton__button"></div>
                            })}
                        </div>
                    </div>
                    <div className="movie-hero__img-container">
                        <div className="movie-hero__loader-wrapper">
                            <Loader size="large" />
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}