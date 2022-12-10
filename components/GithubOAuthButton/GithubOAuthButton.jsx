import { useRouter } from "next/router";
import Button from "../Button/Button";

const GitHubOAuthButton = ({ isLinked = false }) => {
  const router = useRouter();

  return (
    <Button
      label={isLinked ? "Connected with GitHub" : "Sign in with GitHub"}
      onClick={() => router.push("/api/oauth/login")}
      startIcon={isLinked ? "/icons/check.svg" : "/icons/github.svg"}
      disabled={isLinked}
    />
  );
};

export default GitHubOAuthButton;
