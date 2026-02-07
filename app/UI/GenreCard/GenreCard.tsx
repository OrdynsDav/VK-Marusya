import "./GenreCard.scss"
import Link from "next/link"
import { GenreCardProps } from "../interfaces"

export function GenreCard({ title, imageUrl, href }: GenreCardProps) {
    return (
        <Link className="genre-card" href={href}>
            <img className="genre-card__image" src={imageUrl} width={290} height={220} alt={title} loading="lazy"/>
            <h2 className="genre-card__title">{title}</h2>
        </Link>
    )
}