import "./Button.scss"
import { ButtonProps } from "../interfaces";
import { Loader } from "../Loader/Loader";

export function Button({ className, title, variant = "primary", type, size = "medium", onClick, ariaLabel, isLoading, isDisabled, children }: ButtonProps) {
    return (
        <button
            className={` ${className} btn btn-${variant} btn-${size}`}
            type={type}
            onClick={onClick}
            disabled={isDisabled || isLoading}
            aria-label={ariaLabel}
        >
            {isLoading ? <Loader size={size} /> : children ? children : title}
        </button>
    )
}