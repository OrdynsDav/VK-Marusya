import { z } from 'zod';

/* --- Схемы для фильмов --- */

export interface MovieSchema {
  id: number;
  title: string;
  originalTitle: string;
  language: string;
  releaseYear: number;
  releaseDate: string;
  genres: string[];
  plot: string;
  runtime: number;
  budget: string;
  revenue: string;
  homepage: string;
  status: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  trailerYoutubeId: string;
  tmdbRating: number;
  searchL: string;
  keywords: string[];
  countriesOfOrigin: string[];
  languages: string[];
  cast: string[];
  director: string;
  production: string;
  awardsSummary: string;
}

export interface FetchGetMovieSchema {
  genre?: string;
  title?: string;
  count?: number;
  page?: number;
}

export interface PostFavoriteSchema {
  id: number;
}

export interface ResponseFavoriteSchema {
  result: boolean;
}

/* --- Схемы для авторизации --- */

export interface RegisterSchema {
  email: string;
  password: string;
  name: string;
  surname: string;
}

export interface LoginSchema {
  email: string;
  password: string;
}

export interface LoginSchemaResponse {
  result: boolean;
}

export interface ProfileSchema {
  favorites: string[];
  email: string;
  name: string;
  surname: string;
}
// Схема для email
const emailSchema = z.string().email('Некорректный email').min(1, 'Email обязателен');

// Схема для пароля
const passwordSchema = z.string().min(8, 'Пароль должен быть не менее 8 символов')

// Схема регистрации
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    name: z.string().min(2, 'Имя должно быть не менее 2 символов'),
    surname: z.string().min(2, 'Фамилия должна быть не менее 2 символов'),
    verifyPassword: passwordSchema,
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: 'Пароли не совпадают',
    path: ['verifyPassword'],
  });

// Схема входа
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Типы (автоматически выводятся из схемы)
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
