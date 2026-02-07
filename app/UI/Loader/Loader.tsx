import { Loaderprops } from "../interfaces"
import "./Loader.scss"

export function Loader({size = "small"}: Loaderprops) {
    return (
        <div className={`loader loader-${size}`}></div>
    )
}