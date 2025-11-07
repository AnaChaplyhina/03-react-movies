

import axios from 'axios';
import type { AxiosResponse } from 'axios'; 
import type { MovieResponse } from '../types/movie'; 

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesParams {
  query: string;
}


export const createImageUrl = (path: string | null, size: 'w500' | 'original' = 'w500'): string => {
  if (!path) {
    return `https://via.placeholder.com/500x750?text=No+Image`; 
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
};


export async function fetchMovies({ query }: FetchMoviesParams): Promise<MovieResponse> {
  if (!TMDB_TOKEN) {
    console.error("TMDB Token is missing. Please set VITE_TMDB_TOKEN environment variable.");
    throw new Error("Authorization token is missing.");
  }
  
  if (!query.trim()) {
    throw new Error("Search query cannot be empty.");
  }


  const config = {
    params: {
      query: query,
      include_adult: false,
      language: 'en-US',
      page: 1, 
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`, 
      'Accept': 'application/json',
    },
  };

  try {
    const url = `${TMDB_BASE_URL}/search/movie`;
    const response: AxiosResponse<MovieResponse> = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error('Failed to fetch movies from TMDB.');
  }
}