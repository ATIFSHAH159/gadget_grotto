import Order from '../models/Order.js';
import User from '../models/UserModel.js';
import Productstructuremodel from '../models/ProductsCollection.js';

// Get logged-in user's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all orders', error: error.message });
  }
};

// Update delivery status (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryStatus } = req.body;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.deliveryStatus = deliveryStatus;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
};

// Create a new order (to be called after payment success)
export const createOrder = async (req, res) => {
  try {
    const { orderItems, totalPrice } = req.body;
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }
    // Fetch product details for costPrice and sellingPrice
    const updatedOrderItems = await Promise.all(orderItems.map(async item => {
      const product = await Productstructuremodel.findById(item.product);
      if (product) {
        // Decrement stock
        product.stock = (product.stock || 0) - item.quantity;
        await product.save();
        return {
          ...item,
          costPrice: product.costPrice || 0,
          sellingPrice: product.sellingPrice || product.price || 0
        };
      }
      return item;
    }));
    const order = new Order({
      user: req.user._id,
      orderItems: updatedOrderItems,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
      status: 'Paid',
      deliveryStatus: 'Pending'
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
}; 