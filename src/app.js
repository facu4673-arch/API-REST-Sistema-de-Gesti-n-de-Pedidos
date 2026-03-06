const userRoutes = require('./routes/user.routes');
const User = require('./models/user.model');
const express = require('express');
const sequelize = require('./config/database'); // 👈 agregamos esto
const Order = require('./models/order.model');
const orderRoutes = require('./routes/order.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Probar conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error de conexión:', err));

sequelize.sync({ alter: true })
  .then(() => console.log('Tablas sincronizadas'))
  .catch(err => console.error('Error al sincronizar:', err));

app.get('/', (req, res) => {
  res.json({ message: "API funcionando correctamente 🚀" });
});

const errorMiddleware = require('./middlewares/error.middleware');
app.use(errorMiddleware);

module.exports = app;
