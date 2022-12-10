import Image from "next/image";

import styles from "./ShareOnTwitter.module.scss";

const ShareOnTwitter = ({ username, commits, pr }) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://twitter.com/intent/tweet?original_referer=https://githubwrapped.techF&ref_src=twsrc%5Etfw&text=In 2022 I made over ${commits}%2B commits and ${pr} Pull Requests towards open-source! Check how your %23GithubWrapped up in 2022 at&tw_p=tweetbutton&url=githubwrapped.tech/${username}`}
      className={styles.twitterBtn}
    >
      <Image
        src="/icons/twitter.svg"
        alt="Twitter Logo"
        width={24}
        height={24}
      />
      <span>Share on Twitter</span>
    </a>
  );
};

export default ShareOnTwitter;
