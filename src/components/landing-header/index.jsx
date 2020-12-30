import React from "react";

export default function LandingHeader({
  inputHandler,
  keyUpHandler,
  username,
}) {
  return (
    <>
      <h2 className="landing__year__in__review">GitHub Wrapped</h2>
      <h1 className="landing__2020">2020</h1>

      <p className="landing__p1">
        This has been a challenging year for all of us.
      </p>

      <p className="landing__p2">
        Let's take a look back at all the contributions
        <span className="highlight"> you</span> as an individual
        <br /> made to the open-source community, during these unprecedented
        times.
      </p>
      <span className="disclaimer">
        *This project is neither maintained nor endorsed by GitHub
      </span>
      <input
        className="landing__input"
        type="text"
        placeholder="Your Github Username"
        onChange={inputHandler}
        value={username}
        onKeyUp={keyUpHandler}
        required={true}
      />
      <div
        className="input__helper__text"
        style={{ opacity: username == "" ? 0 : 1 }}
      >
        Press 'Enter' to submit
      </div>
    </>
  );
}
