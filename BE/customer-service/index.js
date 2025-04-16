const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;
const customerRoutes = require('./routes/customerRoutes');

const connectDB = async () => {
  try {
    const fullUri = `${process.env.MONGO_URI}/${process.env.MONGO_DB}`;
    await mongoose.connect(fullUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully to:", fullUri);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/customers', customerRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

