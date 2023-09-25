const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./db');
const port = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.json());
const router = require('./routes/route');
connectDB();
// Routes
app.use('/', router);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
