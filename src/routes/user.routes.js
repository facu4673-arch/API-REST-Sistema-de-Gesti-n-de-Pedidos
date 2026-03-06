const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const { body } = require('express-validator');
const validateFields = require('../middlewares/validate.middleware');

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 */

router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Ruta protegida 🔒',
    user: req.user
  });
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 */

router.post(
  '/',
  [
    body('name')
      .notEmpty()
      .withMessage('El nombre es obligatorio'),

    body('email')
      .isEmail()
      .withMessage('Email inválido'),

    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),

    validateFields
  ],
  userController.createUser
);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: facu@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login exitoso
 */

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Email inválido'),

    body('password')
      .notEmpty()
      .withMessage('La contraseña es obligatoria'),

    validateFields
  ],
  userController.loginUser
);

module.exports = router;