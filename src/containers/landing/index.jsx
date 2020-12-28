import React, { useState, useEffect, useRef } from "react";

// Stylesheets
import "./style.scss";

// Constants
import { particleOptions } from "../../constants/particles";

// Third-Party
import Particles from "react-particles-js";
import { TweenMax } from "gsap";
import { LandingLoader, LandingHeader } from "../../components";
import { useHistory } from "react-router-dom";
import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


export default function LandingPage() {
  const [username, setUsername] = useState("");
  const [inValidUsername, setInValidUsername] = useState(false);
  const octocatRef = useRef();
  const landingRef = useRef();
  const loaderRef = useRef();
  const history = useHistory();

  const verifyUsername = (test_username) => {
    let github_username_regex = new RegExp("^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$");
    return github_username_regex.test(test_username);
  }

  const handleUsernameSubmit = (e) => {
    if (e.key === "Enter" && username !== "" && verifyUsername(username)) {
      
      setInValidUsername(false);

      // GSAP ANIMATIONS
      TweenMax.to(octocatRef.current, 0.5, {
        opacity: 0,
        y: "50%",
        display: "none",
      });
      TweenMax.to(landingRef.current, 0.5, {
        opacity: 0,
        y: "-50%",
        display: "none",
      });
      TweenMax.to(loaderRef.current, 1, { opacity: 1 });

      setTimeout(() => history.push(`/${username}`), 2000);
    }
    else if(e.key === "Enter"){
      setInValidUsername(true);
    }
  };

  // Fade-In Transitions
  useEffect(() => {
    TweenMax.to(octocatRef.current, 1, {
      opacity: 1,
    });
    TweenMax.to(landingRef.current, 1, {
      opacity: 1,
    });
  }, []);

  return (
    <section className="landing__section">
      <Particles className="particles-js" params={particleOptions} />
      <div className="landing__header" ref={landingRef}>
        <LandingHeader
          inputHandler={(e) => setUsername(e.target.value.trim())}
          username={username}
          keyUpHandler={handleUsernameSubmit}
        />
      </div>

      <div className="landing__octo" ref={octocatRef}>
        <img src="/assets/images/octo.png" alt="GitHub Lunar OctoCat" />
      </div>

      <div className="landing__loader" ref={loaderRef}>
        <LandingLoader />
      </div>
      <Snackbar open={inValidUsername} autoHideDuration={300}>
        <MuiAlert elevation={6} severity="error" variant="filled">
          Please enter a valid github Username. 
        </MuiAlert>
      </Snackbar>
    </section>
  );
}
