import React from "react";
import "./style.scss";

export default function Report({
  username,
  commits,
  stars,
  pr,
  issues,
  reportReference,
}) {
  const dataFormatter = (data) => {
    if (data > 1000) {
      return `${(data / 1000).toFixed(1)}k`;
    }
    return `${data}`;
  };

  return (
    <div className="profile__report" ref={reportReference}>
      <img src="/assets/images/report_bg.png" className="report__bg" />

      <div className="report__content">
        <h2 className="report__username">
          <span className="highlight">{username}</span> 's
        </h2>
        <div className="report__header">
          <h2>2021</h2>
          <h4>Year in review</h4>
        </div>

        <div className="report__main">
          <div className="row">
            <div className="report__tile">
              <img
                className="report__icon"
                src="/assets/images/icons/commits.svg"
                alt="GitHub Commits"
              />
              <div className="report__data">
                <div className="report__number">{dataFormatter(commits)}</div>
                <div className="report__category">Commits</div>
              </div>
            </div>

            <div className="report__tile">
              <img
                className="report__icon"
                src="/assets/images/icons/stars.svg"
                alt="GitHub Stars"
              />
              <div className="report__data">
                <div className="report__number">{dataFormatter(stars)}</div>
                <div className="report__category">Stars</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="report__tile">
              <img
                className="report__icon"
                src="/assets/images/icons/pr.svg"
                alt="GitHub PRs"
              />
              <div className="report__data">
                <div className="report__number">{dataFormatter(pr)}</div>
                <div className="report__category">Pull Requests</div>
              </div>
            </div>

            <div className="report__tile">
              <img
                className="report__icon"
                src="/assets/images/icons/issues.svg"
                alt="GitHub Issues"
              />
              <div className="report__data">
                <div className="report__number">{dataFormatter(issues)}</div>
                <div className="report__category">Issues</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
