"use client";

import { useCallback, useEffect, useRef } from "react";

type EpisodePlayerReactProps = {
  episodeId: number;
  videoUrl: string;
  secondsWatched?: number;
};

export function EpisodePlayer({
  episodeId,
  videoUrl,
  secondsWatched = 0,
}: EpisodePlayerReactProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasAppliedInitialTime = useRef(false);

  const handleTimeWatch = useCallback(() => {
    if (videoRef.current) {
      if (!hasAppliedInitialTime.current) {
        if (videoRef.current.duration >= secondsWatched) {
          videoRef.current.currentTime = secondsWatched;
          hasAppliedInitialTime.current = true;
          console.log(videoRef.current.duration);
        }
      }
    }
  }, [secondsWatched]);

  useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.readyState >= 1) handleTimeWatch();
    }
  }, [handleTimeWatch]);

  return (
    <video
      ref={videoRef}
      key={episodeId}
      onLoadedMetadata={handleTimeWatch}
      onDurationChange={handleTimeWatch}
      className="h-full w-full object-cover"
      controls
    >
      <source src={videoUrl} type="video/mp4" />
      Seu navegador não suporta vídeo HTML5.
    </video>
  );
}
