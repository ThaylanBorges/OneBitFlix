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
        const success = await addFavoriteAction(courseId);
        if (success) {
          setFavorite(true);
        } else {
          toast.error("Falha ao favoritar");
        }
      } else {
        const success = await removeFavoriteAction(courseId);
        if (success) {
          setFavorite(false);
        } else {
          toast.error("Falha ao remover dos favoritos");
        }
      }
    } finally {
      submittingFavorite.current = false;
    }
  };

  const handlerClickLike = async (courseId: number) => {
    if (submittingLike.current) return;

    submittingLike.current = true;

    try {
      if (!like) {
        const success = await addLikeAction(courseId);
        if (success) {
          setLike(true);
        } else {
          toast.error("Falha ao curtir");
        }
      } else {
        const success = await removeLikeAction(courseId);
        if (success) {
          setLike(false);
        } else {
          toast.error("Falha ao remover curtida");
        }
      }
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
