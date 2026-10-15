"use client";

import { removeCompletedAction } from "@/actions/removeCompletedAction";
import { setCompletedEpisodeAction } from "@/actions/setCompletedEpisodeAction";
import { Check } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";

type CompleteBoxProps = {
  episodeId: number;
  name: string;
  completed: boolean;
};

export function CompleteBox({ episodeId, name, completed }: CompleteBoxProps) {
  const submitting = useRef(false);
  const [check, setCheck] = useState(completed);

  const handleCompleteEpisode = async (episodeId: number) => {
    if (submitting.current) return;
    submitting.current = true;

    try {
      if (check) {
        const result = await removeCompletedAction(episodeId);
        if (result) setCheck(false);
      } else {
        const result = await setCompletedEpisodeAction(episodeId);
        if (result) setCheck(true);
      }
    } finally {
      submitting.current = false;
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label={`Marcar como concluído: ${name}`}
      aria-pressed={check}
      onClick={() => handleCompleteEpisode(episodeId)}
      className="flex shrink-0 items-center justify-center rounded-sm border border-white/20 text-xs font-bold text-white/40 transition-colors hover:border-primary hover:text-primary"
    >
      {check ? <Check /> : null}
    </Button>
  );
}
