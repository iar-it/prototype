import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { of, fromEvent, animationFrameScheduler } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  switchMap,
  throttleTime
} from "rxjs/operators";
import { useObservable } from "rxjs-hooks";
import logo from "../img/logo.png";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
// import Sidebar from "../sidebar/Sidebar";
import { makeStyles } from "@material-ui/core/styles";

import "./Nav.scss";
const watchScroll = () =>
  of(typeof window === "undefined").pipe(
    filter(bool => !bool),
    switchMap(() => fromEvent(window, "scroll", { passive: true })),
    throttleTime(0, animationFrameScheduler),
    map(() => window.pageYOffset),
    pairwise(),
    map(([y1, y2]) => (y2 < y1 ? "Up" : "Down")),
    distinctUntilChanged()
  );

function Nav() {
  const scrollDirection = useObservable(watchScroll, "Up");
  const [state, setState] = React.useState({
    right: false
  });
  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  return (
    <header className={`site-header ${scrollDirection === "Down" && "hidden"}`}>
      <div className="nav-content">
        <a href="/">
          <Logo src={logo}></Logo>
        </a>
        <IconButton
          color="inherit"
          aria-label="Menu"
          onClick={toggleDrawer("right", true)}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor="right"
          open={state.right}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={toggleDrawer("right", true)}
            onKeyDown={toggleDrawer("right", true)}
          >
            {/* <Sidebar /> */}
          </div>
        </SwipeableDrawer>
      </div>

      {/* <span>Header</span> */}
    </header>
  );
}

const Logo = styled.img`
  height: 50px;
`;

export default Nav;
