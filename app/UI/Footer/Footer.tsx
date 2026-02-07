import "./Footer.scss"

export function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <ul className="footer__social">
                    <li className="footer__item">
                        <a className="footer__link" href="https://vk.com/davohak" target="_blank" aria-label="Ссылка на ВКонтакте">
                            <svg width="19" height="11">
                                <use href="/sprite.svg#icon-vk"></use>
                            </svg>
                        </a>
                    </li>
                    <li className="footer__item">
                        <a className="footer__link" href="https://youtube.com" target="_blank" aria-label="Ссылка на Youtube">
                            <svg width="16" height="12">
                                <use href="/sprite.svg#icon-youtube"></use>
                            </svg>
                        </a>
                    </li>
                    <li className="footer__item">
                        <a className="footer__link" href="https://ok.ru" target="_blank" aria-label="Ссылка на Одноклассники">
                            <svg width="11" height="18">
                                <use href="/sprite.svg#icon-ok"></use>
                            </svg>
                        </a>
                    </li>
                    <li className="footer__item">
                        <a className="footer__link" href="https://web.telegram.org/a/" target="_blank" aria-label="Ссылка на телеграм">
                            <svg width="17" height="14">
                                <use href="/sprite.svg#icon-telegram"></use>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>

        </footer>
    )
}