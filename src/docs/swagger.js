const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API REST Sistema de Gestión de Pedidos",
      version: "1.0.0",
      description: "API con autenticación JWT y gestión de pedidos"
    },

    servers: [
      {
        url: "http://localhost:3000/api/v1"
      }
    ],

    components: {

      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },

      schemas: {

        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            name: {
              type: "string",
              example: "Facundo Perez"
            },
            email: {
              type: "string",
              example: "facundo@email.com"
            },
            password: {
              type: "string",
              example: "123456"
            }
          }
        },

        Order: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            total: {
              type: "number",
              example: 1500
            },
            userId: {
              type: "integer",
              example: 1
            }
          }
        }

      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;