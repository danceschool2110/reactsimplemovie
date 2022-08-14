import React from "react";
import useSWR from "swr";
import { tmdbAPI, fetcher, genres } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const { data } = useSWR(
    //`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`,
    tmdbAPI.getMovieList("upcoming"),
    fetcher
  );
  const movies = data ? data.results : [];
  const database = useSWR(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=09f3f44dff24a65421540ac4bf6b04c6`,
    fetcher
  );
  //console.log(database)
  const genres = database?.data?.genres || [];
  //console.log(genres);
  return (
    <section className="banner h-[480px] page-container mb-20 overflow-hidden">
      <Swiper
        grabCursor={"true"}
        slidesPerView={1}
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item} genres={genres}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

const BannerItem = ({ item, genres }) => {
  const genresList = genres.filter((a) => item.genre_ids.includes(a.id));

  const navigate = useNavigate();
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 rounded-lg bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
      <img
        src={tmdbAPI.imageOriginal(item.poster_path)}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-4xl mb-3">{item.title}</h2>
        <div className="flex items-center gap-x-5 mb-7">
          {genresList.map((genresItem, index) => (
            <span
              key={index}
              className="py-2 px-4 border border-white rounded-md"
            >
              {genresItem.name}
            </span>
          ))}
        </div>
        <Button bgColor="primary" onClick={() => navigate(`/movie/${item.id}`)}>
          Watch Now
        </Button>
      </div>
    </div>
  );
};
export default Banner;
