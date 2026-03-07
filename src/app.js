const userRoutes = require('./routes/user.routes');
const User = require('./models/user.model');
const express = require('express');
const morgan = require("morgan");
const sequelize = require('./config/database'); // 👈 agregamos esto
const Order = require('./models/order.model');
const orderRoutes = require('./routes/order.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/rateLimiter');


const app = express();

app.use(morgan("dev"));

app.use(limiter);

app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Probar conexión a la base de datos
if (process.env.NODE_ENV !== 'test') {
  sequelize.authenticate()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error de conexión:', err));
}

sequelize.sync({ alter: true })
  .then(() => console.log('Tablas sincronizadas'))
  .catch(err => console.error('Error al sincronizar:', err));

app.get('/', (req, res) => {
  res.json({ message: "API funcionando correctamente 🚀" });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

const errorMiddleware = require('./middlewares/error.middleware');
app.use(errorMiddleware);
app.use(errorHandler);


module.exports = app;
