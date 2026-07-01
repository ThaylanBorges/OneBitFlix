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
        Category: "Categorias",
        Course: "Cursos",
        Episode: "Episódios",
        User: "Usuários",
        navigation: "Navegação",
      },

      properties: {
        name: "Nome",
        email: "E-mail",
        password: "Senha",
        role: "Perfil",
        createdAt: "Criado em",
        updatedAt: "Atualizado em",
      },

      resources: {
        Course: {
          properties: {
            synopsis: "Sinopse",
            featured: "Destaque",
            thumbnailUrl: "Miniatura",
            uploadThumbnail: "Enviar miniatura",
          },
          messages: {
            noRecordsInResource: "Nenhum curso cadastrado ainda",
          },
        },
        Episode: {
          properties: {
            synopsis: "Sinopse",
            order: "Ordem",
            secondsLong: "Duração (segundos)",
            videoUrl: "URL do vídeo",
            uploadVideo: "Enviar vídeo",
          },
        },
        User: {
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
