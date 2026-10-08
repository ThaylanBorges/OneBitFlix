"use client";

import { setCompletedEpisodeAction } from "@/actions/setCompletedEpisodeAction";
import { setWatchTimeAction } from "@/actions/setWatchTimeAction";
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
    if (
      videoRef.current &&
      !hasAppliedInitialTime.current &&
      videoRef.current.duration >= secondsWatched
    ) {
      videoRef.current.currentTime = secondsWatched;
      hasAppliedInitialTime.current = true;
    }
  }, [secondsWatched]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const saveWatchTime = useCallback(async () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;

      await setWatchTimeAction(episodeId, Math.floor(currentTime));
    }
  }, [episodeId]);

  const pauseAndSave = useCallback(() => {
    stopInterval();
    saveWatchTime();
  }, [saveWatchTime, stopInterval]);

  const startInterval = useCallback(() => {
    stopInterval();

    if (videoRef.current && !videoRef.current.paused) {
      intervalRef.current = setInterval(() => {
        saveWatchTime();
      }, 60 * 1000);
    }
  }, [saveWatchTime, stopInterval]);

  const completeEpisode = useCallback(async () => {
    stopInterval();

    return await setCompletedEpisodeAction(
      episodeId,
      videoRef.current!.currentTime,
    );
  }, [episodeId, stopInterval]);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 1) handleTimeWatch();
  }, [handleTimeWatch]);

  useEffect(() => {
    return () => stopInterval();
  }, [stopInterval]);

  return (
    <video
      ref={videoRef}
      key={episodeId}
      onLoadedMetadata={handleTimeWatch}
      onDurationChange={handleTimeWatch}
      onPause={pauseAndSave}
      onPlay={startInterval}
      onEnded={completeEpisode}
      className="h-full w-full object-cover"
      controls
    >
      <source src={videoUrl} type="video/mp4" />
      Seu navegador não suporta vídeo HTML5.
    </video>
  );
}
