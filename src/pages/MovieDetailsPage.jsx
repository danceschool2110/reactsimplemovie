import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import { Swiper, SwiperSlide } from "swiper/react";
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=09f3f44dff24a65421540ac4bf6b04c6
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);

  if (!data) return null;

  //console.log(data);
  return (
    <div className="pb-10">
      <div className="moviedetaispage w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(data.poster_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={tmdbAPI.imageOriginal(data.poster_path)}
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h1 className="text-center text-4xl font-bold text-white mb-10">
        {data.title}
      </h1>
      {data.genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {data.genres.map((item) => (
            <span
              key={item.id}
              className="border border-primary text-primary py-2 px-4 rounded-2xl"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-white font-normal leading-relaxed text-center max-w-[600px] mx-auto mb-10">
        {data.overview}
      </p>
      <MovieCredit></MovieCredit>
      <MovieItem data={data}></MovieItem>
      <h3 className="text-white mb-5 text-xl font-medium p-3 bg-primary rounded-3xl inline-block"> 
      Some Related Videos
      </h3>
      <MovieVideo></MovieVideo>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};
const MovieCredit = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
  if (!data) return null;
  if (!data.cast || data.cast.length <= 0) return null;
  return (
    <div className="py-5">
      <h2 className="text-center text-3xl mb-10 font-medium text-white">
        Casts
      </h2>
      <div className="grid grid-cols-5 gap-x-5">
        {data.cast.slice(0, 5).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={tmdbAPI.imageOriginal(item.profile_path)}
              alt=""
              className="w-full h-[300px] rounded-lg object-cover mb-2"
            />
            <h3 className="text-white text-lg font-medium text-center">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};
const MovieItem = ({ data }) => {
  const { movieId } = useParams();
  //const { data } = useSWR(tmdbAPI.getMovieItem(movieId), fetcher);
  //if (!data) return null;
  return (
    <div className="py-5">
      <h3 className="text-white mb-5 text-xl font-medium p-3 bg-primary rounded-3xl inline-block">
        Movie: {data.title}
      </h3>
      <div className="">
        <iframe
          width="1080px"
          height="608px"
          src={tmdbAPI.getMovieItem(movieId)}
          title="Movie"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="object-fill mx-auto"
        ></iframe>
      </div>
    </div>
  );
};

const MovieVideo = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
  if (!data) return null;
  if (!data.results || data.results.length <= 0) return null;
  //console.log(data)
  return (
    <>
      <div className="py-2">
        <div className="flex flex-col gap-10">
          {data.results.slice(0, 2).map((item) => (
            <div className="" key={item.id}>
              <h3 className="text-white ml-[142px] mb-5 text-base font-medium p-2 bg-secondary rounded-3xl inline-block">
                {item.name}
              </h3>
              <div key={item.id} className="">
                <iframe
                  width="1080px"
                  height="600px"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="mx-auto object-fill"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
const MovieSimilar = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);
  if (!data) return null;

  return (
    <div className="py-10">
      <h2 className="text-white text-3xl font-medium mb-10">Similar movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {data.results.length > 0 &&
            data.results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};
export default MovieDetailsPage;
