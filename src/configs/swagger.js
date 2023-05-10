export const swaggerOptions = {
  swaggerDefinition: {
    basePath: process.env.BASE_URL,
    info: {
      version: '1.0.0',
      title: 'BudgetBuddy API',
      description: 'Budget Buddy API powered by Node.js and PosgreSQL.',
      contact: {
        name: 'Alan Eicker',
      },
      servers: ['http://localhost:9000'],
    },
  },
  apis: ['./src/routes/*.js'],
};
