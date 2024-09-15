import React, { useState, useEffect, useRef } from 'react'
import axios from '../../../utils/axios'
import image from '../../../assets/alt.jpg'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import ArrowBack from "@mui/icons-material/ArrowBackIosNew";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";

const base_url = "https://image.tmdb.org/t/p/original/";

export default function Row({ title, fetchUrl, isLargeRow }) {

  const [movies, setMovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");
  const rowContainerRef = useRef(null); 

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = { height: "800", width: "100%", playerVars: {autoplay: 1}};

  const handleClick = (movie) => {
    if (trailerUrl) {
      settrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.original_name || movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          settrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
      settrailerUrl("7VXOHmaTd7g");
    }
  };

  const scrollLeft = () => {
    rowContainerRef.current.scrollBy({ left: -rowContainerRef.current.clientWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    rowContainerRef.current.scrollBy({ left: rowContainerRef.current.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="row">
      <h2 className="row_title">{title}</h2>
      <div className="row_container_wrapper">
        <button className="arrow arrow-left" onClick={scrollLeft}> <ArrowBack fontSize="large" /> </button>
        <div className="row_container" ref={rowContainerRef}>
          {movies?.map((movie) => (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
              onError={(e) => {e.target.src = image;}}
            />
          ))};
        </div>
        <button className="arrow arrow-right" onClick={scrollRight}> <ArrowForward fontSize="large" /> </button>
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} style={{ zIndex: "100" }}/>}
    </div>
  );
}
