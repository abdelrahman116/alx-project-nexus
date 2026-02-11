const API_KEY = 'f8485c29';
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovieById = async (id: string) => {
  const res = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
  return res.json();
};

export const searchMovies = async (query: string) => {
  const res = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
  const data = await res.json();
  return data.Search || [];
};
