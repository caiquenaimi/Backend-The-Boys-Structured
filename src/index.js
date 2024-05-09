require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const heroesRoutes = require('./routes/heroesRoutes');
const battlesRoutes = require('./routes/battlesRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use('/', heroesRoutes);
app.use('/', battlesRoutes);

app.listen(port, () => {
    console.log(`Server is running and routing on port ${port}`);
});
