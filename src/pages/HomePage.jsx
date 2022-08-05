import React from "react";
import MovieList from "../components/movie/MovieList";
const HomePage = () => {
  return (
    <>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white text-3xl font-bold mb-10">
          Now Playing
        </h2>
        <MovieList></MovieList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white text-3xl font-bold mb-10">
          Top Rated
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white text-3xl font-bold mb-10">
          Trending
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </>
  );
};

export default HomePage;
