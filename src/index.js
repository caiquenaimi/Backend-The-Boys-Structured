require('dotenv').config();
const express = require('express');
const heroesRoutes = require('./routes/heroesRoutes');
const battlesRoutes = require('./routes/battlesRoutes');

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.json());

app.use('/', heroesRoutes);
app.use('/', battlesRoutes);

app.listen(port, () => {
    console.log(`Servidor Online e roteando na porta ${port}`);
});