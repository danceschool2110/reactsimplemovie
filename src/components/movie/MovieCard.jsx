import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import Button from "../button/Button";
const MovieCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 h-[450px] bg-slate-700 text-white select-none">
      <img
        src={tmdbAPI.imageOriginal(item.poster_path || item.backdrop_path)}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <div className="flex justify-between flex-col flex-1">
          <h3 className="text-xl font-bold mb-3 movie-title">{item.title}</h3>
          <div className="flex items-center justify-between text-sm mb-5">
            <span>{new Date(item.release_date).getFullYear()}</span>
            <span>{item.vote_average}</span>
          </div>
        </div>
        <Button bgColor="primary" onClick={() => navigate(`/movie/${item.id}`)}>
          Watch Now
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
