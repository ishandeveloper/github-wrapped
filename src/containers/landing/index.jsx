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

export default function LandingPage() {
  const [username, setUsername] = useState("");
  const octocatRef = useRef();
  const landingRef = useRef();
  const loaderRef = useRef();
  const history = useHistory();

  const handleUsernameSubmit = (e) => {
    if (e.key === "Enter" && username !== "") {
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
    </section>
  );
}
