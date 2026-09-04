"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import EditProfileForm from "./EditProfileForm";
import { User } from "@/types/user";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import EditPasswordForm from "./EditPasswordForm";

type ProfileTabsProps = {
  user: User;
};

export default function ProfileTabs({ user }: ProfileTabsProps) {
  const [optionProfile, setOptionProfile] = useState(true);

  return (
    <div className="container my-14 mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-5">
      <div className="col-span-1 gap-3 flex items-center sm:items-start flex-col">
        <h2 className="text-4xl">Minha Conta</h2>
        <Button
          className={"w-[60%] h-12"}
          variant={optionProfile ? "default" : "secondary"}
          onClick={() => setOptionProfile(true)}
        >
          Dados Pessoais
        </Button>
        <Button
          className={"w-[60%] h-12"}
          variant={optionProfile ? "secondary" : "default"}
          onClick={() => setOptionProfile(false)}
        >
          Senha
        </Button>
      </div>
      <div className="col-span-2">
        <div className="mx-auto">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 py-3">
                <Avatar className="h-14 w-14">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/127904052?v=4" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-2xl">{user.firstName}</p>
              </div>
            </CardHeader>
            <CardContent>
              {optionProfile ? (
                <EditProfileForm user={user} />
              ) : (
                <EditPasswordForm />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
