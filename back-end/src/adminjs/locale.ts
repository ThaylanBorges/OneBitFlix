import { Locale, locales as AdminJsLocales } from "adminjs";

export const locale: Locale = {
  language: "pt-BR",
  availableLanguages: ["pt-BR", "en"],
  localeDetection: true,
  translations: {
    "pt-BR": {
      ...AdminJsLocales["pt-BR"],
      labels: {
        catalog: "Catálogo",
        administration: "Administração",
        categories: "Categorias",
        courses: "Cursos",
        episodes: "Episódios",
        users: "Usuários",
        navigation: "Navegação",
      },

      properties: {
        name: "Nome",
        email: "E-mail",
        password: "Senha",
        role: "Perfil",
        position: "Posição",
        createdAt: "Criado em",
        updatedAt: "Atualizado em",
      },

      resources: {
        courses: {
          properties: {
            synopsis: "Sinopse",
            featured: "Destaque",
            thumbnailUrl: "Miniatura",
            uploadThumbnail: "Enviar miniatura",
            categoryId: "Categoria",
          },
          messages: {
            noRecordsInResource: "Nenhum curso cadastrado ainda",
          },
        },
        episodes: {
          properties: {
            synopsis: "Sinopse",
            order: "Ordem",
            secondsLong: "Duração (segundos)",
            videoUrl: "URL do vídeo",
            uploadVideo: "Enviar vídeo",
            courseId: "Curso",
          },
        },
        users: {
          properties: {
            firstName: "Nome",
            lastName: "Sobrenome",
            phone: "Telefone",
            birth: "Data de nascimento",
          },
        },
      },
    },
  },
};
