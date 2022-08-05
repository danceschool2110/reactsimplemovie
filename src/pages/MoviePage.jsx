import React, { useEffect, useState } from "react";
import MovieList from "../components/movie/MovieList";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MovieCard from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
//https://api.themoviedb.org/3/search/movie?api_key=09f3f44dff24a65421540ac4bf6b04c6
const itemsPerPage = 20;
const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(
    //`https://api.themoviedb.org/3/movie/popular?api_key=09f3f44dff24a65421540ac4bf6b04c6&page=${page}`
    tmdbAPI.getMovieList("popular", page)
  );
  const filterDebounce = useDebounce(filter);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  // useEffect(() => {
  //   if (data && data.results) setMovies(data.results);
  // }, [data]);
  const movies = data ? data.results : [];

  useEffect(() => {
    if (filterDebounce) setUrl(tmdbAPI.getMovieSearch(filterDebounce, page));
    else setUrl(tmdbAPI.getMovieList("popular", page));
  }, [filterDebounce, page]);
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);
  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setPage(e.selected + 1);
  };
  return (
    <div className="movie-page pb-10 page-container">
      <div className="flex mb-10 items-center">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 text-white outline-none rounded-lg"
            placeholder="Search..."
            onChange={handleFilterChange}
          ></input>
        </div>
        <button className="py-4 px-6 ml-10 rounded-lg bg-primary font-medium mt-auto capitalize">
          Search
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10 mb-8">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviePage;

// <div className="flex gap-x-5 items-center justify-center text-white hidden">
//   <span className="cursor-pointer" onClick={() => setPage(page - 1)}>
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-6 w-6"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M15 19l-7-7 7-7"
//       />
//     </svg>
//   </span>
//   {new Array(totalPage).fill(0).map((item, index) => (
//     <span
//       key={index}
//       onClick={() => setPage(index + 1)}
//       className="cursor-pointer text-slate-900 font-semibold py-2 px-4 bg-white rounded"
//     >
//       {index + 1}
//     </span>
//   ))}
//   <span className="cursor-pointer" onClick={() => setPage(page + 1)}>
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-6 w-6"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M9 5l7 7-7 7"
//       />
//     </svg>
//   </span>
// </div>
