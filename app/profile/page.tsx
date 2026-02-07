'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import './page.scss';
import { useEffect, useState } from 'react';
import { Loader } from '../UI/Loader/Loader';
import { ProfileAbout } from '../UI/ProfileAbout/ProfileAbout';
import { MoviesList } from '../UI/MoviesList/MoviesList';
import { useFavorites, useMediaQuery } from '../hooks';

export default function Profile() {
  const { profile, logout } = useAuthStore();
  const router = useRouter();
  const { movies, loading: favoritesLoading } = useFavorites();

  const [activeTab, setActiveTab] = useState<'favorites' | 'notifications'>('favorites');
  const isDesktop = useMediaQuery('(min-width: 801px)');
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!profile) {
      router.push('/');
    }
  }, [profile, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const renderContent = () => {
    if (activeTab === 'favorites') {
      if (favoritesLoading) {
        return <Loader size="large" />;
      }
      return movies.length > 0 ? (
        <MoviesList initialMovies={movies.sort((a, b) => b.tmdbRating - a.tmdbRating)} slider={isMobile ? true : false}/>
      ) : (
        <p>Нет избранных фильмов</p>
      );
    }

    if (activeTab === 'notifications') {
      return (
        <ProfileAbout
          email={profile.email}
          name={profile.name}
          surname={profile.surname}
          logout={handleLogout}
        />
      );
    }

    return null;
  };

  if (!profile) {
    return <Loader size="large" />;
  }

  return (
    <section className="profile">
      <div className="container">
        <h1 className="profile__title">Мой аккаунт</h1>

        <div className="profile__navigation">
          <button
            className={`profile__btn ${activeTab === 'favorites' ? 'profile__btn--active' : ''}`}
            type="button"
            onClick={() => setActiveTab('favorites')}
          >
            <svg width="24" height="24">
              <use href="/sprite.svg#icon-heart"></use>
            </svg>
            <span className="profile__text">{isDesktop ? 'Избранные фильмы' : 'Избранное'}</span>
          </button>

          <button
            className={`profile__btn ${activeTab === 'notifications' ? 'profile__btn--active' : ''}`}
            type="button"
            onClick={() => setActiveTab('notifications')}
          >
            <svg width="24" height="24">
              <use href="/sprite.svg#icon-user"></use>
            </svg>
            <span className="profile__text">{isDesktop ? 'Настройка аккаунта' : 'Настройки'}</span>
          </button>
        </div>

        <div className="profile__content">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}
