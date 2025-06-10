// src/server.js

require('dotenv').config();
const express          = require('express');
const cors             = require('cors');
const connectDB        = require('./config/database');
const expenseRoutes    = require('./routes/expenses');
const settlementRoutes = require('./routes/settlements');
const recurringRoutes  = require('./routes/recurring');

async function startServer() {
  try {
    // 1. Connect to MongoDB and wait for it
    await connectDB();
    
    // 2. Now that mongoose is ready, start the recurring job
    //    (it uses mongoose models under the hood)
    require('./services/recurringService');
    
    // 3. Set up Express
    const app = express();
    app.use(cors({ origin: '*' }));
    app.use(express.json());
    
    // health check
    app.get('/ping', (req, res) => res.send('pong'));
    
    // core routes
    app.use('/expenses',    expenseRoutes);
    app.use('/settlements', settlementRoutes);
    app.use('/recurring',   recurringRoutes);
    app.use('/analytics',   require('./routes/analytics'));
    
    // 4. Finally, start listening
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
    
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
