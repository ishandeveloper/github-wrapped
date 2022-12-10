import GitHubButton from "react-github-btn";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "../styles/globals.scss";
import "../styles/landing.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics trackPageViews gaMeasurementId="G-BPG8R5EGR0" />
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
