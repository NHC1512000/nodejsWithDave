const express = require('express');
const path = require('path');
const router = require('./src/route/subdir');
const cors = require('cors');
const app = express();
const verifyJWT = require('./src/middleware/verifyJWT');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const PORT = process.env.PORT || 3500;
// built-in middleware
app.use(cors({ origin: true}));
app.use(express.urlencoded({extended: true}));
//middleware for json
app.use(express.json());

app.use(cookieParser());
//serve static files
app.use(express.static(path.join(__dirname,'./src/public')));
app.use('/subdir', router);

app.use('/register', require('./src/route/api/register'));
app.use('/auth', require('./src/route/api/auth'));
app.use(verifyJWT);
app.use('/refreshToken', require('./src/route/api/refreshToken'));
app.use('/logout', require('./src/route/api/logout'));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));