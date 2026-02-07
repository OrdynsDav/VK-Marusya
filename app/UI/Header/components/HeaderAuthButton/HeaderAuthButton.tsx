import "./HeaderAuthButton.scss"
import { useAuthStore } from "../../../../store/authStore";
import Link from "next/link";
import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";

const DynamicAuthModal = dynamic(() => import('../../../Modals/AuthModal/AuthModal'), {
    ssr: false,
});

export const HeaderAuthButton = memo(function HeaderAuthButton({ isDesktop }: { isDesktop: boolean }) {
    const { isAuth, profile } = useAuthStore();
    const pathname = usePathname();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isActive = pathname === '/profile'

    if (!isDesktop) {
        return (
            <>
                <button
                    className={`nav__item nav__item--tablet ${isActive ? 'nav__item--profile' : ''}`}
                    onClick={() => {
                        if (!isAuth) {
                            setIsModalOpen(true);
                        } else {
                            router.push('/profile');
                        }
                    }}
                    aria-label='Кнопка перехода к профилю'
                >
                    <svg className='nav__item-icon' width="24" height="24">
                        <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"
                            fill="white" />
                    </svg>
                    <svg className='nav__item-icon' width="24" height="24">
                        <path
                            d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
                {isModalOpen && <DynamicAuthModal onClose={() => setIsModalOpen(false)} />}
            </>
        )
    }

    return (
        <>
            {isAuth ? (
                <Link
                    className={isActive ? "header__btn header__btn--active" : "header__btn"}
                    href="/profile"
                >
                    {profile.surname}
                </Link>
            ) : (
                <button
                    className="header__btn"
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                >
                    Войти
                </button>
            )}
            {isModalOpen && <DynamicAuthModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
})