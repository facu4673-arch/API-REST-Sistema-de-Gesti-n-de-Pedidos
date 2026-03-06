const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { body } = require('express-validator');
const validateMiddleware = require('../middlewares/validate.middleware');

router.post(
  '/',
  authMiddleware,
  [
    body('product').notEmpty().withMessage('Producto obligatorio'),
    body('quantity').isInt({ min: 1 }).withMessage('Cantidad inválida'),
    body('totalPrice').isNumeric().withMessage('Precio inválido')
  ],
  validateMiddleware,
  orderController.createOrder
);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 example: Notebook Dell
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               totalPrice:
 *                 type: number
 *                 example: 3000
 *     responses:
 *       201:
 *         description: Pedido creado
 */

router.post('/', authMiddleware, orderController.createOrder);

/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Obtener pedidos del usuario autenticado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */

router.get('/my-orders', authMiddleware, orderController.getMyOrders);

router.put('/:id', authMiddleware, orderController.updateOrder);
router.delete('/:id', authMiddleware, orderController.deleteOrder);

module.exports = router;