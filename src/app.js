'use strict';
const express = require('express');
const app = express();

app.use(express.json());

// Routes
app.use(require('./routes/app-routes'));

app.listen(4000, ()=>{
    console.log("Servidor iniciado en el puerto 4000")
});