"use client";
import {
  Course,
  SeachCourse,
  SearchCourseSchema,
} from "@/schemas/courseSchema";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FieldGroup } from "../ui/field";
import { FormField } from "../ui/form-field";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchCourseAction } from "@/actions/searchCourseAction";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

export function Search() {
  const [courses, setCourses] = useState<Course[]>();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SeachCourse>({
    resolver: zodResolver(SearchCourseSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: SeachCourse) => {
    const result = await searchCourseAction(data.name);
    setCourses(result);
  };

  return (
    <DropdownMenu>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-w-64 justify-center items-center flex-1 gap-2"
      >
        <FieldGroup>
          <FormField
            control={control}
            name="name"
            type="search"
            placeholder="Pesquise o curso"
          />
        </FieldGroup>
        <DropdownMenuTrigger>
          <Button
            type="submit"
            variant={"ghost"}
            className="p-3 w-auto h-full"
            disabled={isSubmitting}
          >
            <Image
              src="/homeAuth/iconSearch.svg"
              alt="Logo de pesquisa"
              width={25}
              height={25}
            />
          </Button>
        </DropdownMenuTrigger>
      </form>

      <DropdownMenuContent align="end" className="w-64 mt-3">
        {courses && courses.length > 0 ? (
          courses.map((c) => (
            <DropdownMenuItem
              key={c.id}
              render={<Link href={`courses/${c.id}`} />}
            >
              {c.name}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>Nenhum curso encontrado</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
