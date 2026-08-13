import CategoryCard from "./CategoryCard";

const cardsData = [
  {
    title: "FRONT-END",
    description:
      "Aprenda a criar interfaces modernas e responsivas com React, Next.js e as principais bibliotecas do mercado. Do HTML e CSS básico até otimização de performance e acessibilidade.",
    image: "/homeNoAuth/imgFrontend.png",
  },
  {
    title: "BACK-END",
    description:
      "Domine APIs, bancos de dados e arquitetura de sistemas escaláveis. Node.js, autenticação, segurança e boas práticas para construir aplicações robustas de ponta a ponta.",
    image: "/homeNoAuth/imgBackend.png",
  },
  {
    title: "MOBILE",
    description:
      "Desenvolva aplicativos nativos e multiplataforma com React Native. Aprenda a publicar na App Store e Google Play e a criar experiências fluidas para dispositivos móveis.",
    image: "/homeNoAuth/imgMobile.png",
  },
  {
    title: "GIT E GITHUB",
    description:
      "Trabalhe com controle de versão como um profissional. Branches, pull requests, resolução de conflitos e fluxos de colaboração usados em equipes reais de desenvolvimento.",
    image: "/homeNoAuth/imgGit.png",
  },
  {
    title: "PROJETOS",
    description:
      "Coloque a mão na massa em projetos práticos do início ao fim. Construa um portfólio real com aplicações completas para mostrar em entrevistas e processos seletivos.",
    image: "/homeNoAuth/imgProjects.png",
  },
  {
    title: "CARREIRA",
    description:
      "Prepare-se para o mercado de trabalho com mentorias, dicas de currículo, simulações de entrevistas técnicas e orientação sobre como se posicionar como desenvolvedor.",
    image: "/homeNoAuth/imgCareer.png",
  },
];

export default function CardsSection() {
  return (
    <div>
      <p className="font-bold text-2xl text-center mt-12">
        O QUE VOCÊ VAI ACESSAR
      </p>
      <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {cardsData.map((card) => (
          <CategoryCard
            key={card.title}
            style={{ backgroundImage: `url(${card.image})` }}
          >
            <p className="font-bold text-2xl">{card.title}</p>
            <p className="text-muted-foreground">{card.description}</p>
          </CategoryCard>
        ))}
      </div>
    </div>
  );
}
