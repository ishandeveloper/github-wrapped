import Head from "next/head";

const OGHead = ({ username }) => {
  return (
    <Head>
      <title>{username}&apos;s GitHub Report 2022</title>
      <meta
        name="description"
        content={`${username}'s Github Wrapped Report for 2022. Generate yours now at githubwrapped.tech!`}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://githubwrapped.tech/"
      />
      <meta property="og:title" content="Github Wrapped 2022" />
      <meta
        property="og:description"
        content="Take a look back at all the contributions you as an individual made to the open-source community."
      />
      <meta
        property="og:image"
        content={`https://githubwrapped.tech/api/report?username=${username}.jpg`}
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta propert="twitter:creator" content="@ishandeveloper" />
      <meta propert="twitter:site" content="@githubwrapped" />
      <meta
        property="twitter:url"
        content="https://githubwrapped.tech/"
      />
      <meta
        property="twitter:title"
        content={`${username}'s GitHub Wrapped Report`}
      />
      <meta
        property="twitter:description"
        content="Take a look back at all the contributions you as an individual made to the open-source community."
      />
      <meta
        name="twitter:image:src"
        content={`https://githubwrapped.tech/api/report?username=${username}.jpg`}
      />
      <meta
        property="twitter:image"
        content={`https://githubwrapped.tech/api/report?username=${username}.jpg`}
      />
    </Head>
  );
};

export default OGHead;
