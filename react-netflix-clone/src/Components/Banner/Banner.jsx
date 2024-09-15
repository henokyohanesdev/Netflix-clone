import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios'
import requests from '../../utils/requests'
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';
import kids from '../../assets/kids.png'
import EditIcon from "@mui/icons-material/Edit";
import TransferIcon from "@mui/icons-material/TransferWithinAStation";
import PersonIcon from "@mui/icons-material/Person";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import './Banner.css'

export default function Banner({ hoverstate }) {

  const [movie, setMovie] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const opts = { height: "870", width: "100%", playerVars: { autoplay: 1 } };

  const handleclick = (movie) => {
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

  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "90vh",
        }}
      >
        <div className="banner_fadeTop"></div>
        <div className="banner_contents">
          <div className={`banner_show ${hoverstate ? "" : "banner_hide"}`}>
            <ul>
              <li> <img src={kids} alt="kids ping" style={{ marginRight: "10px" }} /> <a href="#">kids</a> </li>
              <li> <EditIcon style={{ marginRight: "10px" }} /> <a href="#">manage profiles</a> </li>
              <li> <TransferIcon style={{ marginRight: "10px" }} /> <a href="#">transfer profile</a> </li>
              <li> <PersonIcon style={{ marginRight: "10px" }} /> <a href="#">account</a> </li>
              <li> <HelpOutlineIcon style={{ marginRight: "10px" }} /> <a href="#">help center</a> </li>
              <li
                style={{
                  borderTop: "1px solid #C0C0C0",
                  padding: "10px", 
                  width: "100%", 
                  textAlign: "center", 
                  marginTop: "10px"}}
              >
                <a href="#">sign out of netflix</a>{" "}
              </li>
            </ul>
          </div>
          <h1 className="banner_title"> {movie?.title || movie?.name || movie?.original_name} </h1>
          <h1 className="banner_description"> {truncate(movie?.overview, 200)} </h1>
          <div className="banner_buttons">
            <button className="banner_button" onClick={() => handleclick(movie)} >
              <PlayArrowIcon fontSize="large" /> Play
            </button>
            <button className="banner_button" > More Info </button>
          </div>
          <div className={`stop_button ${trailerUrl ? "" : "stop_hide"}`} onClick={() => settrailerUrl("")}>
            Stop
          </div>
        </div>
        <div className="banner_fadeBottom"></div>
        <div className="banner_trailer">
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} style={{zIndex: "100"}}/>}
        </div>
      </div>
    </>
  );
}
