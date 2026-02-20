import { useEffect, useRef } from "react";

export default function YouTubePlayer({ videoId, playerRef }) {
  const containerRef = useRef(null); // holds the div DOM node

  useEffect(() => {
    // Only load API once
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: "360",
        width: "640",
        videoId: videoId,
        events: {
          onReady: () => console.log("YT Player ready"),
        },
      });
    };
  }, [videoId, playerRef]);

  return <div ref={containerRef}></div>;
}