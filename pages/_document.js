import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#040d23" />
        <meta name="title" content="Github Wrapped 2022" />
        <meta
          name="description"
          content="Take a look back at all the contributions you as an individual made to the open-source community, during these unprecedented times."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
