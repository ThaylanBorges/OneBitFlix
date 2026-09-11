"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  addFavoriteAction,
  removeFavoriteAction,
} from "@/actions/favoriteCourseAction";

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
      await addFavoriteAction(courseId);
      setFavorite(true);
    } else {
      await removeFavoriteAction(courseId);
      setFavorite(false);
    }
  };

  const handlerClickLike = async (courseId: number) => {
    if (!favorite) {
      await addLikeAction(courseId);
      setLike(true);
    } else {
      await removeLikeAction(courseId);
      setLike(false);
    }
  };

  return (
    <div>
      <Button variant="ghost" className="h-10">
        <Image
          src={like ? "/course/iconLiked.svg" : "/course/iconLike.svg"}
          alt="imagem Like"
          width={30}
          height={30}
        />
      </Button>
      <Button variant="ghost" className="h-10">
        <Image
          src={
            favorite ? "/course/iconFavorited.svg" : "/course/iconAddFav.svg"
          }
          alt="imagem Like"
          width={30}
          height={30}
          onClick={() => handlerClickFavorite(courseId)}
        />
      </Button>
    </div>
  );
}
