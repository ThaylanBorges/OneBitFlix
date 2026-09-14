"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  addFavoriteAction,
  removeFavoriteAction,
} from "@/actions/favoriteCourseAction";
import { addLikeAction, removeLikeAction } from "@/actions/likeCourseAction";

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
  const [favorite, setFavorite] = useState<boolean>(favorited);

  const handlerClickFavorite = async (courseId: number) => {
    if (!favorite) {
      const success = await addFavoriteAction(courseId);
      if (success) setFavorite(true);
    } else {
      const success = await removeFavoriteAction(courseId);
      if (success) setFavorite(false);
    }
  };

  const handlerClickLike = async (courseId: number) => {
    if (!like) {
      const success = await addLikeAction(courseId);
      if (success) setLike(true);
    } else {
      const success = await removeLikeAction(courseId);
      if (success) setLike(false);
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
