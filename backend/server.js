const express = require('express');
const app = express();
require('dotenv').config()

const swaggerUI = require('swagger-ui-express');
const docs = require('./docs');

const port = process.env.PORT;
app.use(express.json())

const routes = require('./routes');

app.use('/api', routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
app.get('/*', (req, res) => res.redirect('/api-docs'));


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});