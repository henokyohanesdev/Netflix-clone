import React, { useState, useEffect, useRef } from "react";
import axios from "../../../utils/axios"; 
import image from "../../../assets/alt.jpg"; 
import YouTube from "react-youtube"; 
import movieTrailer from "movie-trailer"; 
import ArrowBack from "@mui/icons-material/ArrowBackIosNew"; 
import ArrowForward from "@mui/icons-material/ArrowForwardIos"; 
import CloseIcon from "@mui/icons-material/Close"; 

const base_url = "https://image.tmdb.org/t/p/original/";

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]); // State to store movies data fetched from API
  const [trailerUrl, setTrailerUrl] = useState(""); // State to store the YouTube trailer URL
  const [hoveredPoster, setHoveredPoster] = useState({}); // State to track the hovered poster's dimensions and position
  const rowContainerRef = useRef(null); // Ref for the scrolling container

  // useEffect to fetch movies data when the component mounts or fetchUrl changes
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results); // Update the state with fetched movies
      return request;
    }
    fetchData();
  }, [fetchUrl]); // Dependency array, re-fetch when fetchUrl changes

  const opts = { height: "800", width: "100%", playerVars: { autoplay: 1 } };

  // Function to handle click on a movie poster
  const handleClick = (movie, e) => {
    const posterPosition = e.target.getBoundingClientRect(); // Get the position and size of the clicked poster
    const containerPosition = rowContainerRef.current.getBoundingClientRect(); // Get the container's position

    const scaleFactor = isLargeRow ? 1.15 : 1.9;

    // Calculate scaled dimensions
    const scaledWidth = posterPosition.width * scaleFactor;
    const scaledHeight = posterPosition.height * scaleFactor;

    // Calculate the top and left offsets for centering the trailer popup over the poster
    const topOffset = (scaledHeight - posterPosition.height) / 2;
    const leftOffset = (scaledWidth - posterPosition.width) / 2;

    // Set the hovered poster state with updated dimensions and movie information
    setHoveredPoster({
      top: posterPosition.top - containerPosition.top - topOffset,
      left: posterPosition.left - containerPosition.left - leftOffset,
      width: scaledWidth,
      height: scaledHeight,
      scaleFactor: scaleFactor,
      movie: movie,
    });

    if (trailerUrl) {
      setTrailerUrl(""); // Close the current trailer
    } else {
      movieTrailer(movie?.name || movie?.original_name || movie?.title || "") // Try to find the trailer for the movie
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search); // Extract the video ID from the URL
          setTrailerUrl(urlParams.get("v")); // Set the video ID in state
        })
        .catch((error) => console.log(error));
      setTrailerUrl("7VXOHmaTd7g"); // Default video ID for fallback purposes
    }
  };

  // Scroll the row container by the container's width
  const scrollLeft = () => {
    rowContainerRef.current.scrollBy({left: -rowContainerRef.current.clientWidth, behavior: "smooth"});
  };

  const scrollRight = () => {
    rowContainerRef.current.scrollBy({left: rowContainerRef.current.clientWidth, behavior: "smooth"});
  };

  return (
    <div className="row">
      <h2 className="row_title">{title}</h2>
      <div className="row_container_wrapper">
        <button className="arrow arrow-left" onClick={scrollLeft}>
          <ArrowBack fontSize="large" />
        </button>
        <div className="row_container" ref={rowContainerRef}>
          {/* Loop through the movies and display each poster in the row */}
          {movies?.map((movie) => (
            <img
              key={movie.id}
              onClick={(e) => handleClick(movie, e)}
              className={`${isLargeRow ? "row_posterLarge" : "row_poster"}`}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} // Image source based on row type
              alt={movie.name}
              onError={(e) => {e.target.src = image;}} // Fallback image in case of an error
            />
          ))}
        </div>
        <button className="arrow arrow-right" onClick={scrollRight}>
          <ArrowForward fontSize="large" />
        </button>
      </div>
      {/* Trailer popup if trailerUrl is set */}
      {trailerUrl && (
        <div
          className="row_trailer"
          style={{
            top: `${hoveredPoster.top / 1.2}px`,
            left: `${hoveredPoster.left}px`,
            width: `${hoveredPoster.width}px`,
            height: `${hoveredPoster.height}px`,
            transform: `scale(${1 / hoveredPoster.scaleFactor})`, // Scale down the trailer to fit inside the poster's area
          }}
        >
          <button className="close_button" onClick={() => setTrailerUrl("")}>
            <CloseIcon fontSize="large" /> Close
          </button>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}
