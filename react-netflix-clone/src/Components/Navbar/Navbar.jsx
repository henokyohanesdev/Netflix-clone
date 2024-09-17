import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import avatar from "../../assets/avatar.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./Navbar.css";

export default function Navbar({ setHoverstate, setClickstate }) {
  // State to determine whether to show the navbar background color change
  const [show, handleshow] = useState(false);

  // Effect to add a scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        handleshow(true);
      } else {
        handleshow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`navbar ${show ? "navbar_black" : ""}`}>
        <div className="logo_navbar">
          <img className="logo" src={logo} alt="Netflix logo" />
          <div className="hide">Browse</div>
          <div className="left_dropdown hide" onClick={() => setClickstate(prevState => !prevState)}>
            <ArrowDropDownIcon />
          </div>
          <ul className="left_navbar">
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>New & Popular</li>
            <li>My List</li>
            <li>Browse by Languages</li>
          </ul>
        </div>
        <ul className="right_navbar">
          <li> <SearchRoundedIcon fontSize="large" /> </li>
          <li>Kids</li>
          <li> <NotificationsNoneIcon fontSize="medium" /> </li>
          <li onMouseEnter={() => setHoverstate(true)} 
              onMouseLeave={() => setHoverstate(false)} 
          >
            <img src={avatar} alt="Avatar" />
          </li>
          <li
            className="right_dropdown"
            onClick = {() => setHoverstate (prevState => !prevState)}
          >
            <ArrowDropDownIcon />
          </li>
        </ul>
      </div>
    </>
  );
}
