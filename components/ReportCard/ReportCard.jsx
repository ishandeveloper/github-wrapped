import React from "react";

import { statsFormatter } from "../../helpers/statsFormatter";

const ReportCard = ({ commits, stars, issues, pr, username, avatar, name }) => {
  return (
    <svg
      width="1004"
      height="369"
      viewBox="0 0 1004 369"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="report-card" clip-path="url(#clip0_116_52)">
        <g id="commits">
          <rect
            id="commits-wrapper"
            x="408"
            y="27"
            width="273"
            height="143"
            rx="7"
            stroke="#113692"
            stroke-width="2"
          />
          <text
            id="commits_2"
            fill="#113692"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            font-family="Poppins"
            fontSize="17"
            letter-spacing="0em"
          >
            <tspan x="507.256" y="133.95">
              commits
            </tspan>
          </text>
          <text
            id="commit_count"
            fill="#113692"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            font-family="Poppins"
            fontSize="48.2456"
            font-weight="600"
            letter-spacing="0em"
          >
            <tspan x="495.181" y="108.886">
              {statsFormatter(commits)}
            </tspan>
          </text>
        </g>
        <g id="stars">
          <rect
            id="stars-wrapper"
            x="704"
            y="27"
            width="273"
            height="143"
            rx="7"
            stroke="#113692"
            stroke-width="2"
          />
          <text
            id="stars_2"
            fill="#113692"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            font-family="Poppins"
            fontSize="17"
            letter-spacing="0em"
          >
            <tspan x="820.107" y="133.95">
              stars
            </tspan>
          </text>
          <text
            id="star_count"
            fill="#113692"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            font-family="Poppins"
            fontSize="48.2456"
            font-weight="600"
            letter-spacing="0em"
          >
            <tspan x="795" y="108.886">
              {statsFormatter(stars)}
            </tspan>
          </text>
        </g>
        <g id="issues">
          <rect
            id="issues-wrapper"
            x="409"
            y="195"
            width="273"
            height="143"
            rx="7"
            stroke="#113692"
            stroke-width="2"
          />
          <text
            id="issues_2"
            fill="#113692"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            font-family="Poppins"
            fontSize="17"
            letter-spacing="0em"
          >
            <tspan x="520.377" y="301.95">
              issues
            </tspan>
          </text>
          <text
            id="issue_count"
            fill="#113692"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            font-family="Poppins"
            fontSize="48.2456"
            font-weight="600"
            letter-spacing="0em"
          >
            <tspan x="517.124" y="276.886">
              {statsFormatter(issues)}
            </tspan>
          </text>
        </g>
        <g id="prs">
          <rect
            id="pr-wrapper"
            x="704"
            y="195"
            width="273"
            height="143"
            rx="7"
            stroke="#113692"
            stroke-width="2"
          />
          <text
            id="pull requests"
            fill="#113692"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            font-family="Poppins"
            fontSize="17"
            letter-spacing="0em"
          >
            <tspan x="786.497" y="301.95">
              pull requests
            </tspan>
          </text>
          <text
            id="pr_count"
            fill="#113692"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            font-family="Poppins"
            fontSize="48.2456"
            font-weight="600"
            letter-spacing="0em"
          >
            <tspan x="803.408" y="276.886">
              {statsFormatter(pr)}
            </tspan>
          </text>
        </g>
        <rect
          id="decorative"
          y="154"
          width="44"
          height="140"
          rx="11"
          fill="#F5F5F5"
        />
        <g id="details">
          <text
            id="username"
            fill="#4A4A4A"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            font-family="Poppins"
            fontSize="17"
            letter-spacing="0em"
          >
            <tspan x="148" y="103.95">
              @{username}
            </tspan>
          </text>
          <text
            id="name"
            fill="#4A4A4A"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            font-family="Poppins"
            fontSize="24"
            font-weight="600"
            letter-spacing="0em"
          >
            <tspan x="150.529" y="76.4">
              {name}
            </tspan>
          </text>
        </g>
        <rect
          id="frame"
          x="3.5"
          y="3.5"
          width="997"
          height="362"
          rx="4.5"
          stroke="#F5F5F5"
          stroke-width="7"
        />
        <circle id="Ellipse 2" cx="76" cy="80" r="46" fill="url(#pattern0)" />
        <text
          id="githubwrapped.tech"
          fill="#113692"
          xmlSpace="preserve"
          style={{ whiteSpace: "pre" }}
          font-family="Poppins"
          fontSize="21"
          font-weight="500"
          letter-spacing="0em"
        >
          <tspan x="75.2803" y="308.35">
            githubwrapped.tech
          </tspan>
        </text>
        <text
          id="2022 GitHub Report"
          fill="black"
          xmlSpace="preserve"
          style={{ whiteSpace: "pre" }}
          font-family="Poppins"
          fontSize="31"
          font-weight="600"
          letter-spacing="0em"
        >
          <tspan x="72.147" y="269.35">
            2022 GitHub Report
          </tspan>
        </text>
        <path
          id="github-icon"
          d="M93 188C90.6362 188 88.2956 188.451 86.1117 189.326C83.9278 190.202 81.9435 191.485 80.2721 193.103C76.8964 196.37 75 200.801 75 205.422C75 213.123 80.166 219.656 87.312 221.973C88.212 222.112 88.5 221.572 88.5 221.102V218.158C83.514 219.203 82.452 215.823 82.452 215.823C81.624 213.802 80.454 213.262 80.454 213.262C78.816 212.182 80.58 212.217 80.58 212.217C82.38 212.339 83.334 214.011 83.334 214.011C84.9 216.659 87.546 215.875 88.572 215.457C88.734 214.325 89.202 213.558 89.706 213.123C85.71 212.687 81.516 211.189 81.516 204.551C81.516 202.617 82.2 201.067 83.37 199.83C83.19 199.394 82.56 197.582 83.55 195.23C83.55 195.23 85.062 194.76 88.5 197.007C89.922 196.624 91.47 196.432 93 196.432C94.53 196.432 96.078 196.624 97.5 197.007C100.938 194.76 102.45 195.23 102.45 195.23C103.44 197.582 102.81 199.394 102.63 199.83C103.8 201.067 104.484 202.617 104.484 204.551C104.484 211.206 100.272 212.67 96.258 213.105C96.906 213.645 97.5 214.708 97.5 216.328V221.102C97.5 221.572 97.788 222.13 98.706 221.973C105.852 219.638 111 213.123 111 205.422C111 203.134 110.534 200.869 109.63 198.755C108.725 196.641 107.399 194.721 105.728 193.103C104.056 191.485 102.072 190.202 99.8883 189.326C97.7044 188.451 95.3638 188 93 188V188Z"
          fill="black"
        />
      </g>
      <defs>
        <style type="text/css">
          @import
          url('https://fonts.googleapis.com/css?family=Poppins:wght@300;400;500;600;700;800');
        </style>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_116_52"
            transform="translate(0 -0.256144) scale(0.00094518)"
          />
        </pattern>
        <clipPath id="clip0_116_52">
          <rect width="1004" height="369" fill="white" />
        </clipPath>
        <image
          id="image0_116_52"
          data-name="profile_image"
          width="1058"
          height="1600"
          xlinkHref={avatar}
        />
      </defs>
    </svg>
  );
};

export default ReportCard;
