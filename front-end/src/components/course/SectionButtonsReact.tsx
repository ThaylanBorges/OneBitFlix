"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import {
  addFavoriteAction,
  removeFavoriteAction,
} from "@/actions/favoriteCourseAction";
import { addLikeAction, removeLikeAction } from "@/actions/likeCourseAction";
import { toast } from "sonner";

type SectionButtonsReactProps = {
  liked: boolean;
  favorited: boolean;
  courseId: number;
};

export function SectionButtonsReact({
  liked,
  favorited,
  courseId,
}: SectionButtonsReactProps) {
  const [like, setLike] = useState<boolean>(liked);
  const submittingLike = useRef(false);

  const [favorite, setFavorite] = useState<boolean>(favorited);
  const submittingFavorite = useRef(false);

  const handlerClickFavorite = async (courseId: number) => {
    if (submittingFavorite.current) return;

    submittingFavorite.current = true;

    try {
      if (!favorite) {
        const result = await addFavoriteAction(courseId);
        if (!result.success) {
          toast.error("Falha ao favoritar");
          return;
        }

        setFavorite(true);
        return;
      }

      const result = await removeFavoriteAction(courseId);

      if (!result.success) {
        toast.error("Falha ao remover dos favoritos");
        return;
      }

      setFavorite(false);
    } finally {
      submittingFavorite.current = false;
    }
  };

  const handlerClickLike = async (courseId: number) => {
    if (submittingLike.current) return;

    submittingLike.current = true;

    try {
      if (!like) {
        const result = await addLikeAction(courseId);

        if (!result.success) {
          toast.error("Falha ao curtir");
          return;
        }

        setLike(true);
        return;
      }

      const result = await removeLikeAction(courseId);

      if (!result.success) {
        toast.error("Falha ao remover curtida");
        return;
      }

      setLike(false);
    } finally {
      submittingLike.current = false;
    }
  };

  return (
    <div>
      <Button
        variant="ghost"
        className="h-10"
        onClick={() => handlerClickLike(courseId)}
      >
        <Image
          src={like ? "/course/iconLiked.svg" : "/course/iconLike.svg"}
          alt="imagem de like"
          width={30}
          height={30}
        />
      </Button>
      <Button
        variant="ghost"
        className="h-10"
        onClick={() => handlerClickFavorite(courseId)}
      >
        <Image
          src={
            favorite ? "/course/iconFavorited.svg" : "/course/iconAddFav.svg"
          }
          alt="imagem de favorito"
          width={30}
          height={30}
        />
      </Button>
    </div>
  );
}
