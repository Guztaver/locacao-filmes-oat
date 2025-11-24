import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Locadora de Filmes",
      version: "1.0.0",
      description: "Documentação da API para gerenciamento de clientes, filmes e locações.",
    },
    servers: [
      {
        url: "https://locacao-filmes-oat.vercel.app",
        description: "Servidor de Produção",
      },
      {
        url: "http://localhost:3000",
        description: "Servidor Local",
      }
    ],
    components: {
      schemas: {
        Cliente: {
          type: "object",
          required: ["nome", "email", "telefone"],
          properties: {
            _id: {
              type: "string",
              description: "ID gerado automaticamente pelo MongoDB",
            },
            nome: {
              type: "string",
              description: "Nome completo do cliente",
            },
            email: {
              type: "string",
              format: "email",
              description: "Endereço de e-mail do cliente",
            },
            telefone: {
              type: "string",
              description: "Telefone de contato do cliente",
            },
          },
        },
        Filme: {
          type: "object",
          required: ["titulo", "genero", "ano"],
          properties: {
            _id: {
              type: "string",
              description: "ID gerado automaticamente pelo MongoDB",
            },
            titulo: {
              type: "string",
              description: "Título do filme",
            },
            genero: {
              type: "string",
              description: "Gênero do filme",
            },
            ano: {
              type: "integer",
              description: "Ano de lançamento do filme",
            },
          },
        },
        Locacao: {
          type: "object",
          required: ["cliente", "filme"],
          properties: {
            _id: {
              type: "string",
              description: "ID gerado automaticamente pelo MongoDB",
            },
            cliente: {
              type: "string",
              description: "ID do cliente que realizou a locação",
            },
            filme: {
              type: "string",
              description: "ID do filme locado",
            },
            dataLocacao: {
              type: "string",
              format: "date-time",
              description: "Data da locação (padrão: data atual)",
            },
            dataDevolucao: {
              type: "string",
              format: "date-time",
              description: "Data de devolução do filme",
            },
            devolvido: {
              type: "boolean",
              description: "Status da devolução",
              default: false,
            },
          },
        },
        LocacaoPopulated: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "ID gerado automaticamente pelo MongoDB",
            },
            cliente: {
              $ref: "#/components/schemas/Cliente",
            },
            filme: {
              $ref: "#/components/schemas/Filme",
            },
            dataLocacao: {
              type: "string",
              format: "date-time",
              description: "Data da locação",
            },
            dataDevolucao: {
              type: "string",
              format: "date-time",
              description: "Data de devolução",
            },
            devolvido: {
              type: "boolean",
              description: "Status da devolução",
            },
          },
        },
      },
    },
    paths: {
      "/clientes": {
        get: {
          summary: "Listar todos os clientes",
          tags: ["Clientes"],
          responses: {
            200: {
              description: "Lista de clientes retornada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Cliente" },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Criar um novo cliente",
          tags: ["Clientes"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["nome", "email", "telefone"],
                  properties: {
                    nome: { type: "string" },
                    email: { type: "string" },
                    telefone: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Cliente criado com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Cliente" },
                },
              },
            },
          },
        },
      },
      "/clientes/{id}": {
        get: {
          summary: "Obter um cliente pelo ID",
          tags: ["Clientes"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: { type: "string" },
              required: true,
              description: "ID do cliente",
            },
          ],
          responses: {
            200: {
              description: "Dados do cliente retornados com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Cliente" },
                },
              },
            },
            404: {
              description: "Cliente não encontrado",
            },
          },
        },
        put: {
          summary: "Atualizar um cliente existente",
          tags: ["Clientes"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: { type: "string" },
              required: true,
              description: "ID do cliente",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Cliente" },
              },
            },
          },
          responses: {
            200: {
              description: "Cliente atualizado com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Cliente" },
                },
              },
            },
          },
        },
        delete: {
          summary: "Remover um cliente",
          tags: ["Clientes"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: { type: "string" },
              required: true,
              description: "ID do cliente",
            },
          ],
          responses: {
            200: {
              description: "Cliente removido com sucesso",
            },
          },
        },
      },
      "/filmes": {
        get: {
          summary: "Listar todos os filmes",
          tags: ["Filmes"],
          responses: {
            200: {
              description: "Lista de filmes retornada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Filme" },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Adicionar um novo filme",
          tags: ["Filmes"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["titulo", "genero", "ano"],
                  properties: {
                    titulo: { type: "string" },
                    genero: { type: "string" },
                    ano: { type: "integer" },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Filme criado com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Filme" },
                },
              },
            },
          },
        },
      },
      "/filmes/{id}": {
        get: {
          summary: "Obter um filme pelo ID",
          tags: ["Filmes"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: { type: "string" },
              required: true,
              description: "ID do filme",
            },
          ],
          responses: {
            200: {
              description: "Dados do filme retornados com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Filme" },
                },
              },
            },
            404: {
              description: "Filme não encontrado",
            },
          },
        },
        put: {
          summary: "Atualizar um filme existente",
          tags: ["Filmes"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: { type: "string" },
              required: true,
              description: "ID do filme",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Filme" },
              },
            },
          },
          responses: {
            200: {
              description: "Filme atualizado com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Filme" },
                },
              },
            },
          },
        },
        delete: {
          summary: "Remover um filme",
          tags: ["Filmes"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: { type: "string" },
              required: true,
              description: "ID do filme",
            },
          ],
          responses: {
            200: {
              description: "Filme removido com sucesso",
            },
          },
        },
      },
      "/locacoes": {
        get: {
          summary: "Listar todas as locações",
          tags: ["Locações"],
          responses: {
            200: {
              description: "Lista de locações retornada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/LocacaoPopulated" },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Realizar uma nova locação",
          tags: ["Locações"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["cliente", "filme"],
                  properties: {
                    cliente: { type: "string", description: "ID do cliente" },
                    filme: { type: "string", description: "ID do filme" },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Locação realizada com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Locacao" },
                },
              },
            },
          },
        },
      },
      "/locacoes/{id}": {
        get: {
          summary: "Obter uma locação pelo ID",
          tags: ["Locações"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: { type: "string" },
              required: true,
              description: "ID da locação",
            },
          ],
          responses: {
            200: {
              description: "Dados da locação retornados com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LocacaoPopulated" },
                },
              },
            },
            404: {
              description: "Locação não encontrada",
            },
          },
        },
        put: {
          summary: "Atualizar uma locação existente",
          tags: ["Locações"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: { type: "string" },
              required: true,
              description: "ID da locação",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Locacao" },
              },
            },
          },
          responses: {
            200: {
              description: "Locação atualizada com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Locacao" },
                },
              },
            },
          },
        },
        delete: {
          summary: "Remover uma locação",
          tags: ["Locações"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: { type: "string" },
              required: true,
              description: "ID da locação",
            },
          ],
          responses: {
            200: {
              description: "Locação removida com sucesso",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
