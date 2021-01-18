const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json()); // informa ao app que vou usar JSON para o corpo das requisições
app.use(routes);



app.listen(3333);