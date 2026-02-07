import Link from "next/link";
import "../Button/Button.scss"
import { LinkProps } from "../interfaces";
import { Loader } from "../Loader/Loader";

export function CustomLink({ className, href, title, variant = "primary", size = "medium", onClick, isLoading, isDisabled, children }: LinkProps) {
    return (
        <Link
            className={` ${className} btn btn-${variant} btn-${size}`}
            href={href}
            onClick={onClick}
            aria-disabled={isDisabled || isLoading}
        >
            {isLoading ? <Loader size={size} /> : children ? children : title}
        </Link>
    )
}