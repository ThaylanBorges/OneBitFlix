import Image from "next/image";
import { ReactNode } from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Animated from "@/components/Animated";

const highlights = [
  "Acesso a todos os cursos da plataforma",
  "Estude no seu ritmo, quando quiser",
  "Novos conteúdos toda semana",
];

type AuthShellProps = {
  eyebrow: string;
  title: string;
  formTitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export default function AuthShell({
  eyebrow,
  title,
  formTitle,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-4 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
      <Animated type="fadeRight" className="hidden lg:block">
        <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </span>

        <h1 className="mt-4 text-4xl font-bold leading-tight xl:text-5xl">
          {title}
        </h1>

        <ul className="mt-8 flex flex-col gap-4">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Check className="size-3.5" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <Image
          src="/homeNoAuth/imgPresentation.png"
          alt=""
          aria-hidden="true"
          width={800}
          height={600}
          className="mt-10 w-full max-w-md"
        />
      </Animated>

      <Animated type="fadeUp" className="mx-auto w-full max-w-md lg:max-w-none">
        <h1 className="mb-6 text-center text-3xl font-bold sm:text-start lg:hidden">
          {title}
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>
              <p className="font-bold">{formTitle}</p>
            </CardTitle>
          </CardHeader>

          <CardContent>
            {children}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {footer}
            </p>
          </CardContent>
        </Card>
      </Animated>
    </div>
  );
}
