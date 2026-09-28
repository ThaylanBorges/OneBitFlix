"use client";
import { Course } from "@/schemas/courseSchema";
import { useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { InputGroupAddon } from "../ui/input-group";
import { SearchIcon } from "lucide-react";
import { searchCourseAction } from "@/actions/searchCourseAction";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function Search() {
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  const onSubmit = useDebouncedCallback(async (name: string) => {
    const result = await searchCourseAction(name);
    setCourses(result);
  }, 500);

  return (
    <Combobox
      items={courses}
      onValueChange={(value) => {
        const course = courses?.find((c) => c.name === value);
        if (course) router.push(`/courses/${course.id}`);
      }}
    >
      <ComboboxInput
        className="h-12 w-full sm:w-64 md:w-80"
        onChange={(e) => onSubmit(e.target.value)}
        placeholder="Pesquise por um curso..."
      >
        <InputGroupAddon align="inline-start">
          <SearchIcon className="size-4" />
        </InputGroupAddon>
      </ComboboxInput>
      <ComboboxContent className="mt-3">
        <ComboboxEmpty>Nenhum curso encontrado.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.id} value={item.name}>
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
