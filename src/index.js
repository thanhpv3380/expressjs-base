const path = require('path');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const { logReq, logRes } = require('./middlewares/log');
const camelCaseReq = require('./middlewares/camelCaseReq');
const omitReq = require('./middlewares/omitReq');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();
// require('./models');
require('./services/init');

const { PORT } = require('./configs');

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(logReq);
app.use(camelCaseReq);
app.use(omitReq);
// require('./routes')(app);
app.use(logRes);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
