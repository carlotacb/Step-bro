const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });


require('dotenv').config()

const swaggerUI = require('swagger-ui-express');
const docs = require('./docs');

const port = process.env.PORT;
app.use(express.json())

const routes = require('./routes');

app.use('/api', routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
app.use('/uploads', express.static('uploads'));
app.get('/*', (req, res) => res.redirect('/api-docs'));


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});