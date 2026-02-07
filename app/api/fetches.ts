import { FetchGetMovieSchema, LoginSchema, LoginSchemaResponse, MovieSchema, ProfileSchema, RegisterSchema, ResponseFavoriteSchema } from "./schemas";

const BASE_URL = 'https://cinemaguide.skillbox.cc';

const validateResponse = (response: Response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response
}

export const fetchGetMovie = async ({ genre, title, count, page }: FetchGetMovieSchema = {}): Promise<MovieSchema[]> => {
    const url = new URL(`${BASE_URL}/movie`);

    if (genre) url.searchParams.append('genre', genre);
    if (title) url.searchParams.append('title', title);
    if (count) url.searchParams.append('count', String(count));
    if (page) url.searchParams.append('page', String(page));

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    validateResponse(response);

    const data: MovieSchema[] = await response.json();
    return data;
};

export const fetchGetRandomMovie = async (): Promise<MovieSchema> => {
    const response = await fetch(`${BASE_URL}/movie/random`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    validateResponse(response);

    const data: MovieSchema = await response.json();
    return data;
}

export const fetchGetMovieById = async (movieId: number): Promise<MovieSchema> => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    validateResponse(response);

    const data: MovieSchema = await response.json();
    return data;
}

export const fetchGetGenres = async (): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/movie/genres`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    validateResponse(response);
    const data: string[] = await response.json();
    return data;
};

export const fetchRegister = async ({ email, password, name, surname }: RegisterSchema): Promise<void> => {
    const response = await fetch(`${BASE_URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, name, surname })
    });

    validateResponse(response);

    const data = await response.json();
    return data;
}

export const fetchLogin = async ({ email, password }: LoginSchema): Promise<LoginSchemaResponse> => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    });

    validateResponse(response);

    const data = await response.json();
    return data;
}

export const fetchLogout = async (): Promise<LoginSchemaResponse> => {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    validateResponse(response);

    const data = await response.json();
    return data;
}

export const fetchProfile = async (): Promise<ProfileSchema> => {
    const response = await fetch(`${BASE_URL}/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    validateResponse(response);

    const data = await response.json();
    return data;
}

export const fetchPostFavorite = async (id: number): Promise<{ result: boolean; favorites: string[] }> => {
    const response = await fetch(`${BASE_URL}/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        body: `id=${id}`,
    });

    validateResponse(response);
    const data = await response.json();
    return { result: true, favorites: data.favorites };
};


export const fetchDeleteFavorite = async (movieId: number): Promise<ResponseFavoriteSchema> => {
    const response = await fetch(`${BASE_URL}/favorites/${movieId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    validateResponse(response);
    const data: ResponseFavoriteSchema = await response.json();
    return data;
};


export const fetchGetFavorite = async (): Promise<MovieSchema[]> => {
    const response = await fetch(`${BASE_URL}/favorites`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    validateResponse(response);
    const data: MovieSchema[] = await response.json();
    return data;
};