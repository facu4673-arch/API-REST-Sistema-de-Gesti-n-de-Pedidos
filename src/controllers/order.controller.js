const Order = require('../models/order.model');

exports.createOrder = async (req, res) => {
  try {
    const { product, quantity, totalPrice } = req.body;

    const order = await Order.create({
      product,
      quantity,
      totalPrice,
      userId: req.user.id // 👈 viene del middleware JWT
    });

    res.status(201).json(order);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear pedido' });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id }
    });

    res.json(orders);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};

exports.updateOrder = async (req, res) => {
  try {

    const order = await Order.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!order) {
      return res.status(404).json({
        message: "Pedido no encontrado"
      });
    }

    await order.update(req.body);

    res.json(order);

  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar pedido"
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {

    const order = await Order.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!order) {
      return res.status(404).json({
        message: "Pedido no encontrado"
      });
    }

    await order.destroy();

    res.json({
      message: "Pedido eliminado correctamente"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar pedido"
    });
  }
};