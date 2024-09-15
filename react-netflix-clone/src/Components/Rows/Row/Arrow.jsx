import React from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import {VisibilityContext } from "react-horizontal-scrolling-menu";

const Arrow = ({ direction, onClick }) => {
  return (
    <div className={`arrow arrow-${direction}`} onClick={onClick}>
      {direction === "left" ? <ArrowBackIos /> : <ArrowForwardIos />}
    </div>
  );
};

export const LeftArrow = () => {
  const { scrollPrev } = React.useContext(VisibilityContext);
  return <Arrow direction="left" onClick={() => scrollPrev()} />;
};

export const RightArrow = () => {
  const { scrollNext } = React.useContext(VisibilityContext);
  return <Arrow direction="right" onClick={() => scrollNext()} />;
};
