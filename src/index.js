const path = require('path');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const reqHandler = require('./middlewares/reqHandler');
const resHandler = require('./middlewares/resHandler');

require('dotenv').config();

const { PORT } = require('./configs');

require('./services/init');
require('./models');

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(reqHandler);

require('./routes')(app);

app.use(resHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
