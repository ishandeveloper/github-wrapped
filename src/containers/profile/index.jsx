import React, { useState, useRef, useEffect } from "react";

// Styles
import "./style.scss";

// Third-Party
import Particles from "react-particles-js";
import { useParams, useHistory } from "react-router-dom";
import ContentLoader from "react-content-loader";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import { TweenMax } from "gsap";
import { YearInReviewReport } from "../../components";
import { getUserReport } from "../../helpers";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import html2canvas from "html2canvas";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Constants
import { particleOptions } from "../../constants/particles";

export default function ProfilePage() {
  let { username } = useParams();
  const history = useHistory();
  const profileRef = useRef();
  const card1ref = useRef();
  const card2ref = useRef();
  const card3ref = useRef();
  const reportRef = useRef();
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);

  const backToHome = () => {
    TweenMax.to(profileRef.current, 0.75, {
      opacity: 0,
    });
    setTimeout(() => history.push("/"), 1000);
  };
  const isMobile = useMediaQuery("(min-width:720px)");

  const fetchReport = async () => {
    const req = await getUserReport(username);

    if (req.error_code == 1) {
      setError(`0xb00${req.error_code}`);
    } else {
      let _data = req.data;
      setReport({
        commits: _data.commits,
        issues: _data.issues,
        pullrequests: _data.pr,
        stars: _data.stars,
      });
      TweenMax.to(card3ref.current, 1, {
        opacity: 1,
        y: "0%",
      });
    }
    setloading(false);
  };

  const saveReport = () => {
    html2canvas(reportRef.current).then((canvas) => {
      var img = canvas.toDataURL();
      let a = document.createElement("a");
      a.href = img;
      a.download = `${username}'s-report.png`;
      a.click();
    });
  };

  // Fade-In Transitions
  useEffect(() => {
    TweenMax.set(profileRef.current, {
      opacity: 0,
    });
    TweenMax.set(card1ref.current, {
      opacity: 0,
      y: "50%",
    });
    TweenMax.set(card2ref.current, {
      opacity: 0,
      y: "50%",
    });
    TweenMax.set(card3ref.current, {
      opacity: 0,
      y: "50%",
    });
    TweenMax.to(
      profileRef.current,
      1,
      {
        opacity: 1,
      },
      "+=1"
    );
    setTimeout(() => {
      TweenMax.to(card1ref.current, 1, {
        opacity: 1,
        y: "0%",
      });
    }, 500);
    setTimeout(() => {
      TweenMax.to(card2ref.current, 1, {
        opacity: 1,
        y: "0%",
      });
    }, 1000);

    fetchReport();
  }, []);

  return (
    <section className="profile__section">
      <Particles className="particles-js" params={particleOptions} />

      <div className="profile__content" ref={profileRef}>
        <div className="profile__column__left">
          <div className="back__button">
            <IconButton onClick={backToHome} centerRipple={true}>
              <ArrowBackIcon />
            </IconButton>
            <div className="text">Back</div>
          </div>
        </div>
        <div className="profile__skeleton">
          {error != null && (
            <div className="error__wrapper">
              <div className="error__content">
                <p>Something went wrong.</p>({error})
                <a
                  rel="noopener"
                  target="_blank"
                  href="https://github.com/ishandeveloper/github-wrapped/issues/new"
                  className="file__issue"
                >
                  File an issue
                </a>
              </div>
            </div>
          )}
          {loading && error == null && (
            <ContentLoader
              height={!isMobile ? "600px" : "720px"}
              width={"100%"}
              backgroundColor="rgba(255,255,255,0.25)"
              foregroundColor="rgba(255,255,255,0.3)"
            >
              <rect rx="10" ry="10" width="100%" height="720px" />
            </ContentLoader>
          )}

          {!loading && error == null && (
            <YearInReviewReport
              reportReference={reportRef}
              commits={report.commits}
              stars={report.stars}
              pr={report.pullrequests}
              issues={report.issues}
              username={username}
            />
          )}

          <div className="profile__actions">
            {report != null && (
              <a
                target="_blank"
                rel="noopener"
                href={`https://twitter.com/intent/tweet?original_referer=https://githubwrapped.techF&ref_src=twsrc%5Etfw&text=In 2020 I made over ${report.commits}%2B commits and ${report.pullrequests} Pull Requests towards open-source! Check how your %23GitHubWrapped up in 2020 at&tw_p=tweetbutton&url=githubwrapped.tech`}
                className="tweet-btn"
              >
                <img
                  src="/assets/images/icons/twitter.svg"
                  alt="Twitter Logo"
                />
                Share on Twitter
              </a>
            )}
          </div>
        </div>
        <div className="profile__column__right">
          <div className="profile__card" ref={card1ref}>
            <h3>Did you know?</h3>
            <p>
              So far, Over <span className="highlight">1.9 Billion+ </span>
              commits have been made towards open-source this year.
            </p>
          </div>

          <div className="profile__card" ref={card2ref}>
            <h3>Fun Fact</h3>
            <p>
              JavaScript continues to dominate the market by being the most used
              language on GitHub.
            </p>
            <div className="src">
              cc :{" "}
              <a
                target="_blank"
                rel="noopener"
                href="https://octoverse.github.com/"
              >
                octoverse.github.com
              </a>
            </div>
          </div>

          <div
            className="profile__card save__report"
            ref={card3ref}
            onClick={saveReport}
          >
            <h3>
              <SystemUpdateAltIcon /> Save Report
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
