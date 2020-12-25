import { useEffect } from "react";

// https://stackoverflow.com/questions/34424845/adding-script-tag-to-react-jsx
export const useScript = (url) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};
