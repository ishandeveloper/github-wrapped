import React, { useState, useEffect } from "react";

// Hooks / Utils
import { getUserReport } from "../../helpers/getUserReport";
import { useRouter } from "next/router";

// Components
import Image from "next/image";

import GitHubOAuthButton from "../../components/GithubOAuthButton/GithubOAuthButton";
import ContributionsGraph from "../../components/ContributionsGraph/ContributionsGraph";
import ReportCardLoading from "../../components/ReportCard/ReportCardLoading";
import ReportCard from "../../components/ReportCard/ReportCard";
import OGHead from "../../components/OGHead/OGHead";

// Styles
import styles from "../../styles/Report.module.scss";
import { exportSceneToSTL } from "../../helpers/sceneToSTL";
import Button from "../../components/Button/Button";
import ShareOnTwitter from "../../components/ShareOnTwitter/ShareOnTwitter";
import ShareContainer from "../../containers/Share/Share";

export async function getServerSideProps(context) {
  const { username } = context.params;
  const token = context.query.token ?? null;
  return {
    props: {
      username,
      token,
    },
  };
}
const ReportWrapper = ({ username, token, data }) => {
  // Hooks
  const { query, push } = useRouter();

  // State
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [scene, setScene] = useState(null);

  const fetchUserReport = () => {
    setIsLoading(true);
    getUserReport(username, token)
      .then((response) => setReportData(response["data"]))
      .catch((e) => setErrorMessage(e));
  };

  useEffect(() => {
    if (!isLoading && !reportData && !errorMessage && username !== null)
      fetchUserReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage, reportData, isLoading, username]);

  const downloadSTL = () => exportSceneToSTL(scene, username);

  return (
    <section className="report">
      <OGHead username={username} />
      <div className={styles.logo} onClick={() => push("/")}>
        <Image
          src="/favicon.png"
          alt="GitHub Wrapped Logo"
          width={54}
          height={54}
        />
        <h3>#GitHubWrapped</h3>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.main}>
          <ContributionsGraph
            width="100%"
            height={450}
            className={styles.graph}
            data={reportData}
            setScene={setScene}
            username={username}
          />

          <div className={styles.actions}>
            <div className={styles.action}>
              {token === null && (
                <h3>Want to add your private contributions?</h3>
              )}
              {token !== null && (
                <h3>Yay! You&apos;ve linked your github account! 🎉</h3>
              )}
              <p>
                Which means that all of your private contributions are now being
                included in the calculation.
              </p>

              <GitHubOAuthButton isLinked={token !== null} />
            </div>

            <div className={styles.action}>
              <h3>Want to put this on your shelf?</h3>
              <p>Download the .STL file and print it out on your 3D printer.</p>
              <Button
                onClick={downloadSTL}
                disabled={scene === null}
                label="Download .STL"
                endIcon="/icons/download.svg"
              />
            </div>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.infoCard}>
            <h3>
              Your <span>2022</span> GitHub Report
            </h3>
            {reportData === null ? (
              <ReportCardLoading />
            ) : (
              <ReportCard
                commits={reportData["commits"]["total_count"]}
                stars={reportData["stars"]}
                issues={reportData["issues"]}
                pr={reportData["pr"]}
                username={username}
                avatar={reportData["avatar"]}
                name={reportData["name"]}
              />
            )}
          </div>

          <div className={styles.social}>
            {reportData !== null && (
              <ShareContainer
                username={username}
                commits={reportData["commits"]['total_count']}
                pr={reportData["pr"]}
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.disclaimer}>
        *This project is neither maintained nor endorsed by GitHub.
      </div>
    </section>
  );
};

export default ReportWrapper;
