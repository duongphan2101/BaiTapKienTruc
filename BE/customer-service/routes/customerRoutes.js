const express = require('express');
const router = express.Router();
const Customer = require('../model/Customer');

// CREATE - Tạo khách hàng mới
router.post('/create', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ - Lấy tất cả khách hàng
router.get('/getAll', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ - Lấy 1 khách hàng theo ID
router.get('/getCustomer/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE - Cập nhật khách hàng theo ID
router.put('/update/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedCustomer) return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Xoá khách hàng theo ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
    res.json({ message: 'Đã xoá khách hàng thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
