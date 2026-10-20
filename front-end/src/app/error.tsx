"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { RotateCw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Animated from "@/components/Animated";

type ErrorPageProps = {
  error: Error & { digest?: string };
  // TODO: renomear para `retry` ao atualizar para o Next 16.3
  unstable_retry: () => void;
};

export default function ErrorPage({ error, unstable_retry }: ErrorPageProps) {
  const { digest } = error;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col bg-[radial-gradient(ellipse_at_top,#ff004426,transparent_60%),linear-gradient(to_bottom,#8b8b8b1a,#151515)]">
      <div className="container mx-auto flex justify-center px-4 pt-10 sm:justify-start">
        <Link href="/" aria-label="Ir para a página inicial">
          <Image
            src="/logoOnebitflix.svg"
            alt="Logo OneBitFlix"
            width={215}
            height={215}
            preload
          />
        </Link>
      </div>

      <div className="container mx-auto flex flex-1 items-center justify-center px-4 py-16">
        <Animated type="fadeUp" className="w-fit max-w-xl text-start">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <TriangleAlert className="size-3.5" />
              Erro inesperado
            </span>

            {digest && (
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                Código: {digest}
              </span>
            )}
          </div>

          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
            Algo deu errado por aqui.
          </h1>

          <p className="mt-5 text-muted-foreground sm:text-xl">
            Não conseguimos carregar esta página. Tente novamente em instantes
            ou volte para o início e continue evoluindo.
          </p>

          <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <Button
              onClick={() => unstable_retry()}
              size="xl"
              className="w-full rounded-xl font-bold duration-100 hover:scale-105 sm:w-auto"
            >
              <RotateCw />
              TENTAR NOVAMENTE
            </Button>

            <Button
              render={<Link href="/" />}
              nativeButton={false}
              variant="ghost"
              size="xl"
              className="w-full rounded-xl border-2 border-white font-bold duration-100 hover:scale-105 hover:border-primary sm:w-auto"
            >
              VOLTAR AO INÍCIO
            </Button>
          </div>
        </Animated>
      </div>

      <footer className="container mx-auto flex flex-col items-center justify-center gap-4 p-4 sm:flex-row sm:justify-between">
        <Image
          src="/logoOnebitcode.svg"
          alt="Logo OnebitCode"
          width={140}
          height={40}
        />
        <p className="text-muted-foreground">OneBitCode</p>
      </footer>
    </main>
  );
}
