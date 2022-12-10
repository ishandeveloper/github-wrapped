import ShareOnLinkedIn from "../../components/ShareOnLinkedin/ShareOnLinkedIn";
import ShareOnTwitter from "../../components/ShareOnTwitter/ShareOnTwitter";

const ShareContainer = ({ username, commits, pr }) => {
  const { heading, message } = getMessage(commits, pr);

  return (
    <>
      <h3>{heading}</h3>
      <p>{message}</p>
      <div className="social-buttons" style={{ display: "flex", gap: "1rem" }}>
        <ShareOnTwitter username={username} commits={commits} pr={pr} />
        <ShareOnLinkedIn username={username} commits={commits} pr={pr} />
      </div>
    </>
  );
};

const getMessage = (commits, pr) => {
  const totalContributions = commits + pr;

  if (totalContributions > 800) {
    return {
      heading: "Wow! You are a rockstar! ✨",
      message: `Making over ${commits} commits & ${pr} PRs in a single year, is no easy feat! Let's celebrate your victory by sharing it with the world!`,
    };
  } else if (totalContributions > 400) {
    return {
      heading: "Damn! Nice work!",
      message: `Making over ${commits} commits & ${pr} PRs in a single year, is pretty cool! Let's celebrate your victory by sharing it with the world!`,
    };
  } else if (totalContributions > 100) {
    return {
      heading: "Quality > Quantity!",
      message: `You made over ${commits} commits & ${pr} PRs in a single year, which makes you a valuable contributor to the open-source community! Let's celebrate your victory by sharing it with the world!`,
    };
  } else {
    return {
      heading: "Well done! :)",
      message: `Everybody starts somewhere. If 2022 was your first year in contributing to open source, please give yourself a pat on the back! Here's to more such contributions in the upcoming future! 🥂`,
    };
  }
};
export default ShareContainer;
