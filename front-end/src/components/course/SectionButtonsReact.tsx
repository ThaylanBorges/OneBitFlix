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
        if (!success) return toast("Falha ao favoritar");
        setFavorite(true);
      } else {
        const success = await removeFavoriteAction(courseId);
        if (!success) return toast("Falha ao remover dos favoritos");
        setFavorite(false);
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
        if (!success) return toast("Falha ao curtir");
        setLike(true);
      } else {
        const success = await removeLikeAction(courseId);
        if (!success) return toast("Falha ao remover curtida");
        setLike(false);
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
