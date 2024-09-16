import React, { useEffect, useState } from "react";
import axios from "../../utils/axios"; // Axios instance for making API requests
import requests from "../../utils/requests"; // API requests configuration
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import kids from "../../assets/kids.png";
import EditIcon from "@mui/icons-material/Edit";
import TransferIcon from "@mui/icons-material/TransferWithinAStation";
import PersonIcon from "@mui/icons-material/Person";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import "./Banner.css";

export default function Banner({ hoverstate }) {

  const [movie, setMovie] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");

  // useEffect to fetch a random Netflix original movie when the component loads
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
      return request;
    }
    fetchData();
  }, []);

  // Function to truncate long movie descriptions
  const truncate = (str, n) => str?.length > n ? str.substr(0, n - 1) + "..." : str;

  const opts = { height: "870", width: "100%", playerVars: { autoplay: 1 } };

  // Function to handle play button click and display the trailer
  const handleclick = (movie) => {
    if (trailerUrl) {
      settrailerUrl(""); // Close the trailer if it's already open
    } else {
      movieTrailer(movie?.name || movie?.original_name || movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search); // Extract YouTube video ID
          settrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
      settrailerUrl("7VXOHmaTd7g");
    }
  };

  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "45vw",
        }}
      >
        <div className="banner_fadeTop"></div>
        <div className="banner_contents">
          {/* Show hover menu if hoverstate is true */}
          <div className={`banner_show ${hoverstate ? "" : "banner_hide"}`}>
            <ul>
              <li> <img src={kids} alt="kids png" style={{ marginRight: ".4vw" }} /> <a href="#">kids</a> </li>
              <li> <EditIcon style={{ marginRight: ".4vw" }} /> <a href="#">manage profiles</a> </li>
              <li> <TransferIcon style={{ marginRight: ".4vw" }} /> <a href="#">transfer profile</a> </li>
              <li> <PersonIcon style={{ marginRight: ".4vw" }} /> <a href="#">account</a> </li>
              <li> <HelpOutlineIcon style={{ marginRight: ".4vw" }} /> <a href="#">help center</a> </li>
              <li
                className="sign_out"
                style={{
                  borderTop: "1px solid #C0C0C0",
                  padding: ".5vw", width: "92%",
                  textAlign: "center", 
                  marginTop: ".4vw"
                }}
              >
                <a href="#">sign out of netflix</a>
              </li>
            </ul>
          </div>
          {/* If no trailer is playing, show movie info and buttons */}
          {!trailerUrl && (
            <div>
              <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
              <h1 className="banner_description">{truncate(movie?.overview, 200)}</h1>
              <div className="banner_buttons">
                <button className="banner_button" onClick={() => handleclick(movie)}>
                  <PlayArrowIcon fontSize="large" /> Play
                </button>
                <button className="banner_button"> More Info </button>
              </div>
            </div>
          )}
          {/* If trailer is playing, show close button */}
          {trailerUrl && (
            <div className="close__button" onClick={() => settrailerUrl("")}>
              <CloseIcon fontSize="large" />Close
            </div>
          )}
        </div>
        <div className="banner_fadeBottom"></div>
        {/* Display YouTube trailer if trailerUrl is set */}
        <div className="banner_trailer">
          {trailerUrl && (
            <YouTube videoId={trailerUrl} opts={opts} style={{ zIndex: "100" }} />
          )}
        </div>
      </div>
    </>
  );
}
