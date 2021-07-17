const express = require('express');
const path = require('path');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
// const helmet = require('helmet');

const apis = require('./api/routes');
const auth = require('./api/auth.middleware');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
// app.use(helmet());
app.use(rateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 300 // limit each IP to 300 requests per windowMs
}));

app.use(express.json());

app.use('/',express.static(path.join(__dirname, 'public/')));
app.use('/api', auth, apis);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));