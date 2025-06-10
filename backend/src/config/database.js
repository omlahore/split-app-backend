const mongoose = require('mongoose');
module.exports = async () => {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('MongoDB connected');
};
