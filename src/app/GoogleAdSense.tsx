import Script from "next/script";
export default function GoogleAdSense() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4136835535009118"
      crossOrigin="anonymous"
    />
  );
}
