export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "09f3f44dff24a65421540ac4bf6b04c6";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";

//`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`,
export const tmdbAPI = {
  getMovieBanner: (type) => `${tmdbEndpoint}/${type}?api_key=${apiKey}`,
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
  getMovieSearch: (query, page) =>
    `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
  getMovieItem: (movieId) => `https://2embed.org/embed/${movieId}`
};
