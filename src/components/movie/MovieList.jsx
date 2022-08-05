import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher,tmdbAPI} from "../../config";
import MovieCard from "./MovieCard";
//https://api.themoviedb.org/3/movie/now_playing?api_key=09f3f44dff24a65421540ac4bf6b04c6
const MovieList = ({type = 'now_playing'}) => {
  //const [movies, setMovies] = useState([]);
  const { data } = useSWR(
    tmdbAPI.getMovieList(type),
    fetcher
  );
  const movies = data ? data.results : [];

  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 && movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
