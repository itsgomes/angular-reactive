import * as express from 'express';
import { Application } from 'express';

import { Login } from './login.route';

const app: Application = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({ origin: true }));

app.route('/api/login').post(Login);

app.listen(9000, () => {
  console.log('HTTP Rest Api running at http://localhost:9000');
})