import { useState, useEffect, memo } from 'react';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { useAuthStore } from '../../store/authStore';
import { MovieHeroButtonsProps } from '../interfaces';
import { CustomLink } from '../CustomLink/CustomLink';
import { fetchPostFavorite, fetchDeleteFavorite } from '../../api/fetches';
import dynamic from 'next/dynamic';

const DynamicTrailerModal = dynamic(() => import("../Modals/TrailerModal/TrailerModal"))
const DynamicAuthModal = dynamic(() => import("../Modals/AuthModal/AuthModal"), {
  ssr: false,
  loading: () => <Loader size="small" />,
})

export default memo(function MovieHeroButtons({ buttons, onRefresh, loading, movieData }: MovieHeroButtonsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
    const { isAuth, profile, updateFavorites } = useAuthStore();

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (profile?.favorites?.includes(String(movieData.id))) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [movieData.id]);

    const handleFavoriteClick = async () => {
        if (!isAuth) {
            setIsModalOpen(true);
            return;
        }

        const movieIdStr = String(movieData.id);

        try {
            if (isFavorite) {
                await fetchDeleteFavorite(movieData.id);

                const { profile } = useAuthStore.getState();

                const newFavorites = profile.favorites.filter(id => id !== movieIdStr);

                updateFavorites(newFavorites);
                setIsFavorite(false);
            } else {
                await fetchPostFavorite(movieData.id);

                const { profile } = useAuthStore.getState();
                const currentFavorites = Array.isArray(profile.favorites) ? profile.favorites : [];
                const newFavorites = [...currentFavorites, movieIdStr];

                updateFavorites(newFavorites);
                setIsFavorite(true);
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const handleTrailerClick = () => {
        setIsTrailerModalOpen(true);
    };

    const getButtonAction = (id: string) => {
        switch (id) {
            case 'trailer':
                return handleTrailerClick;
            case 'favorite':
                return handleFavoriteClick;
            case 'refresh':
                return onRefresh;
            default:
                return () => { };
        }
    };

    return (
        <div className="movie-hero__buttons">
            {buttons.map((btn) => (
                btn.option === 'button' ? (
                    <Button
                        key={btn.id}
                        className={`movie-hero__btn movie-hero__btn--${btn.id} ${isFavorite && btn.id === 'favorite' ? 'movie-hero__btn--active' : ''}`}
                        type="button"
                        size={btn.size}
                        variant={btn.variant}
                        onClick={getButtonAction(btn.id)}
                        ariaLabel={btn.ariaLabel}
                    >
                        {loading && btn.id === 'refresh' ? (
                            <Loader size="small" />
                        ) : btn.icon ? btn.id === 'favorite' ? (
                            <svg width="24" height="24">
                                <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"
                                    fill="none"
                                    stroke='currentColor'
                                    strokeWidth='2' />
                            </svg>
                        ) : (
                            <svg width="24" height="24">
                                <use href={`/sprite.svg#${btn.icon}`}></use>
                            </svg>
                        ) : (
                            btn.text
                        )}
                    </Button>
                ) : (
                    <CustomLink
                        key={btn.id}
                        className={`movie-hero__btn movie-hero__btn--${btn.id}`}
                        href={`/movies/${movieData.id}`}
                        variant="secondary"
                        aria-label={btn.ariaLabel}
                    >
                        {btn.text}
                    </CustomLink>
                )
            ))}

            {isModalOpen && <DynamicAuthModal onClose={() => setIsModalOpen(false)}/>}
            {isTrailerModalOpen && (
                <DynamicTrailerModal
                    videoUrl={movieData.trailerUrl}
                    videoTitle={movieData.title}
                    isOpen={isTrailerModalOpen}
                    onClose={() => setIsTrailerModalOpen(false)}
                />
            )}
        </div>
    );
});
