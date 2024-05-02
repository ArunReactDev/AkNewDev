const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process on error
  }
};

module.exports = connectDB;