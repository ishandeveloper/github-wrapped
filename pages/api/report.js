/* eslint-disable @next/next/no-img-element */
const { ImageResponse } = require("@vercel/og");

import axios from "axios";
import { statsFormatter } from "../../helpers/statsFormatter";

export const config = {
  runtime: "experimental-edge",
};

const getRandomColor = () => {
  const colors = [
    "#c70dc9",
    "#fa279b",
    "#19ab4c",
    "#401b71",
    "#24757a",
    "#f53b57",
    "#f3f300",
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return randomColor;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
  const username = req.url.split("report?username=")[1].split(".jpg")[0];
  const randomColor = getRandomColor();

  const { pr, commits, issues, stars, avatar, name } = await fetch(
    process.env.REPORT_API_URL + "/api/stats?username=" + username
  )
    .then((res) => res.json())
    .then((data) => data["data"]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "496px",
          width: "950px",
          display: "flex",
          backgroundColor: "#fff",
          border: `7px solid ${randomColor}`,
          padding: "20px",
        }}
      >
        <div
          class="info"
          style={{
            flex: "1.25",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div
            class="user-info"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
            }}
          >
            <img
              class="avatar"
              src={avatar.toString()}
              width={96}
              height={96}
              alt="GithubWrapped Report Avatar"
              style={{ borderRadius: "50px" }}
            />

            <div
              class="bio"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                fontSize: "22px",
                marginLeft: "16px",
                fontWeight: 600,
              }}
            >
              {name.toString()} <br />
              <span style={{ fontWeight: 400, fontSize: "18px" }}>
                @{username.toString()}
              </span>
            </div>
          </div>

          <div
            class="credits-stamp"
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "2rem",
              position: "relative",
              paddingBottom: "1rem",
            }}
          >
            <div
              class="decorative"
              style={{
                position: "absolute",
                background: `${randomColor}`,
                width: "30px",
                height: "120px",
                top: "-0.75rem",
                borderRadius: "8px",
                left: "-1.5rem",
              }}
            />

            <svg
              width="36"
              height="34"
              viewBox="0 0 36 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: "32px",
                width: "32px",
              }}
            >
              <path
                d="M18 0C15.6362 0 13.2956 0.450635 11.1117 1.32618C8.92784 2.20172 6.94353 3.48502 5.27208 5.1028C1.89642 8.37007 0 12.8014 0 17.4221C0 25.1226 5.166 31.6559 12.312 33.973C13.212 34.1124 13.5 33.5723 13.5 33.1019V30.1576C8.514 31.2029 7.452 27.823 7.452 27.823C6.624 25.8021 5.454 25.262 5.454 25.262C3.816 24.1818 5.58 24.2167 5.58 24.2167C7.38 24.3386 8.334 26.0111 8.334 26.0111C9.9 28.6593 12.546 27.8753 13.572 27.4572C13.734 26.3247 14.202 25.5582 14.706 25.1226C10.71 24.6871 6.516 23.1888 6.516 16.551C6.516 14.6171 7.2 13.0665 8.37 11.8296C8.19 11.394 7.56 9.58213 8.55 7.23015C8.55 7.23015 10.062 6.75976 13.5 9.0072C14.922 8.62392 16.47 8.43228 18 8.43228C19.53 8.43228 21.078 8.62392 22.5 9.0072C25.938 6.75976 27.45 7.23015 27.45 7.23015C28.44 9.58213 27.81 11.394 27.63 11.8296C28.8 13.0665 29.484 14.6171 29.484 16.551C29.484 23.2062 25.272 24.6696 21.258 25.1052C21.906 25.6453 22.5 26.708 22.5 28.3283V33.1019C22.5 33.5723 22.788 34.1298 23.706 33.973C30.852 31.6385 36 25.1226 36 17.4221C36 15.1342 35.5344 12.8687 34.6298 10.7549C33.7252 8.64118 32.3994 6.72059 30.7279 5.1028C29.0565 3.48502 27.0722 2.20172 24.8883 1.32618C22.7044 0.450635 20.3638 0 18 0V0Z"
                fill="black"
              />
            </svg>

            <h3
              style={{
                fontSize: "28px",
                margin: 0,
                marginTop: "8px",
              }}
            >
              2022 GitHub Report
            </h3>
            <a
              href="https://githubwrapped.tech"
              class="credits"
              style={{
                marginTop: "0.25rem",
                textDecoration: "none",
                color: "#113692",
              }}
            >
              githubwrapped.tech
            </a>
          </div>
        </div>

        <div
          class="stats"
          style={{
            flex: "2",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "24px",
            width: "100%",
          }}
        >
          <div
            class="row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <div
              class="stat"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem 0",
                width: "220px",
                border: "2px solid #000000",
                borderRadius: "8px",
              }}
            >
              <div
                class="stat-num"
                style={{ fontWeight: "800", fontSize: "36px" }}
              >
                {statsFormatter(commits["total_count"].toString())}
              </div>
              <div
                class="stat-name"
                style={{ fontWeight: 300, fontSize: "16px" }}
              >
                commits
              </div>
            </div>

            <div
              class="stat"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem 0",
                marginLeft: "32px",
                width: "220px",
                border: "2px solid #000000",
                borderRadius: "8px",
              }}
            >
              <div
                class="stat-num"
                style={{ fontWeight: "800", fontSize: "36px" }}
              >
                {statsFormatter(stars)}
              </div>
              <div
                class="stat-name"
                style={{ fontWeight: 300, fontSize: "16px" }}
              >
                stars
              </div>
            </div>
          </div>

          <div
            class="row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: "32px",
            }}
          >
            <div
              class="stat"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem 0",
                width: "220px",
                border: "2px solid #000000",
                borderRadius: "8px",
              }}
            >
              <div
                class="stat-num"
                style={{ fontWeight: "800", fontSize: "36px" }}
              >
                {statsFormatter(issues.toString())}
              </div>
              <div
                class="stat-name"
                style={{ fontWeight: 300, fontSize: "16px" }}
              >
                issues
              </div>
            </div>

            <div
              class="stat"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem 0",
                marginLeft: "32px",
                width: "220px",
                border: "2px solid #000000",
                borderRadius: "8px",
              }}
            >
              <div
                class="stat-num"
                style={{ fontWeight: "800", fontSize: "36px" }}
              >
                {statsFormatter(pr.toString())}
              </div>
              <div
                class="stat-name"
                style={{ fontWeight: 300, fontSize: "16px" }}
              >
                pull requests
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 950,
      height: 496,
    }
  );
}
