import Image from "next/image";
import Link from "next/link";

export default function PresentationSection() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
        <div className="flex flex-col justify-center items-start">
          <p className="font-bold sm:text-2xl text-light-red">
            ACESSO LIMITADO
          </p>
          <p className="font-bold text-3xl sm:text-5xl leading-10 sm:leading-15 pt-3">
            Tenha acesso aos melhores tutoriais de Programação.
          </p>
          <p className="sm:text-2xl text-light-gray pt-5 pb-10">
            Estude de onde estiver, a qualquer momento, e continue evoluindo
            como programador.
          </p>
          <Link
            href="/register"
            className="border-2 border-light-red hover:border-dark-red font-bold text-white hover:text-light-gray rounded-xl p-4 flex items-center gap-6"
          >
            ACESSE AGORA
            <Image
              src="/buttonPlay.svg"
              alt="Ícone de Play"
              width={15}
              height={15}
            />
          </Link>
        </div>
        <div>
          <Image
            src="/homeNoAuth/imgPresentation.png"
            alt="Ilustração de curso disponíveis"
            width={800}
            height={600}
            className="w-full h-auto"
          />
        </div>
        <a
          href="#next-section"
          className="col-span-full flex justify-center mt-16 py-8 hover:opacity-70 transition-opacity"
        >
          <Image
            src="/homeNoAuth/iconArrowDown.svg"
            alt="Ver mais conteúdo"
            width={30}
            height={30}
          />
        </a>
      </div>
    </div>
  );
}
