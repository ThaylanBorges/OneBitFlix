"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { Course } from "@/schemas/courseSchema";
import { searchCourseAction } from "@/actions/searchCourseAction";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

type Status = "idle" | "loading" | "done" | "error";

export function Search() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const latestRequest = useRef(0);

  const search = useDebouncedCallback(async (name: string) => {
    const requestId = ++latestRequest.current;
    try {
      const result = await searchCourseAction(name);
      if (requestId !== latestRequest.current) return;
      if (result) {
        setCourses(result);
        setStatus("done");
      } else {
        setCourses([]);
        setStatus("error");
      }
    } catch {
      if (requestId !== latestRequest.current) return;
      setCourses([]);
      setStatus("error");
    }
  }, 500);

  function close() {
    setIsOpen(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value.trim();
    latestRequest.current++; // invalida qualquer requisição em andamento

    if (!name) {
      search.cancel();
      setCourses([]);
      setStatus("idle");
      close();
      return;
    }

    // Some com a lista velha e mostra "Buscando..." já na primeira tecla
    setCourses([]);
    setStatus("loading");
    setIsOpen(true);
    search(name);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      close();
      inputRef.current?.focus();
      return;
    }

    // Enter no input abre o primeiro resultado (em um link, o Enter já funciona)
    if (e.key === "Enter" && e.target === inputRef.current) {
      const first = courses[0];
      if (status === "done" && first) {
        e.preventDefault();
        close();
        router.push(`/courses/${first.id}`);
      }
      return;
    }

    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

    const links = Array.from(
      containerRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
    );
    if (links.length === 0) return;

    e.preventDefault();
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);

    if (e.key === "ArrowDown") {
      links[Math.min(current + 1, links.length - 1)].focus();
    } else if (current <= 0) {
      inputRef.current?.focus();
    } else {
      links[current - 1].focus();
    }
  }

  const statusText =
    status === "loading"
      ? "Buscando..."
      : status === "error"
        ? "Não foi possível buscar agora. Tente novamente."
        : status === "done" && courses.length === 0
          ? "Nenhum curso encontrado."
          : "";

  return (
    <div
      ref={containerRef}
      className="relative w-full sm:w-64 md:w-80"
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node | null)) {
          close();
        }
      }}
      onKeyDown={handleKeyDown}
    >
      <InputGroup className="h-12">
        <InputGroupAddon align="inline-start">
          <SearchIcon className="size-4" />
        </InputGroupAddon>
        <InputGroupInput
          ref={inputRef}
          type="search"
          aria-label="Pesquisar cursos"
          placeholder="Pesquise por um curso..."
          autoComplete="off"
          maxLength={100}
          onChange={handleChange}
          onFocus={(e) => {
            // Foco vindo de dentro do componente (ex.: voltou de um link pelo Esc)
            // não deve reabrir a lista; só foco vindo de fora.
            if (
              containerRef.current?.contains(e.relatedTarget as Node | null)
            ) {
              return;
            }
            if (status !== "idle") setIsOpen(true);
          }}
          onClick={() => {
            if (status !== "idle") setIsOpen(true);
          }}
        />
      </InputGroup>

      {/* Região anunciada por leitores de tela; fica sempre montada */}
      <div role="status" aria-live="polite" className="sr-only">
        {statusText}
      </div>

      {isOpen && status !== "idle" && (
        <div
          className="absolute z-50 mt-3 w-full rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
          onMouseDown={(e) => e.preventDefault()}
        >
          {statusText && (
            <p
              aria-hidden="true"
              className="px-2 py-2 text-sm text-muted-foreground"
            >
              {statusText}
            </p>
          )}

          {status === "done" && courses.length > 0 && (
            <ul>
              {courses.map((course) => (
                <li key={course.id}>
                  <Link
                    href={`/courses/${course.id}`}
                    onClick={close}
                    className="block rounded-sm px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
