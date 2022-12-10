import GitHubButton from "react-github-btn";

import "../styles/globals.scss";
import "../styles/landing.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <div className="github-button-wrapper">
        <GitHubButton
          href="https://github.com/ishandeveloper/github-wrapped"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star ishandeveloper/github-wrapped on GitHub"
        >
          Star
        </GitHubButton>
      </div>
    </>
  );
}

export default MyApp;
