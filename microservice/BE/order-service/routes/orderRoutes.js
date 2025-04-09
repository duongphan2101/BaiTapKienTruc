const express = require('express');
const router = express.Router();
const Order = require('../model/Order');

// CREATE - Tạo đơn hàng
router.post('/create', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ - Lấy tất cả đơn hàng
router.get('/gelAll', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customerId', 'name email')
      .populate('products.productId', 'name price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ - Lấy đơn hàng theo ID
router.get('/getOrder/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customerId', 'name email')
      .populate('products.productId', 'name price');

    if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Lấy đơn hàng theo trạng thái
router.get('/status/:status', async (req, res) => {
  try {
    const status = req.params.status;
    const orders = await Order.find({ status })
      .populate('customerId', 'name email')
      .populate('products.productId', 'name price');
      
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// UPDATE - Cập nhật trạng thái đơn hàng
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Hủy đơn hàng
router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    res.json({ message: 'Đã hủy đơn hàng thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
