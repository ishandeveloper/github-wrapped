import Image from "next/image";

import styles from "./ShareOnLinkedIn.module.scss";

const ShareOnLinkedIn = ({ username, commits, pr }) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`http://www.linkedin.com/shareArticle?mini=true&url=https://githubwrapped.tech/${username}&title=${username}%20Github%20Wrapped%20Report&source=githubwrapped.tech`}
      className={styles.linkedinBtn}
    >
      <Image
        src="/icons/linkedin.svg"
        alt="LinkedIn Logo"
        width={22}
        height={22}
      />
      <span>Share on LinkedIn</span>
    </a>
  );
};

export default ShareOnLinkedIn;
