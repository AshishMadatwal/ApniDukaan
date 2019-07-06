const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const app = express();
// Connect To Database
// mongoose.Promise = require('bluebird');
// mongoose.connect(config.database, {
//         useMongoClient: true,
//         promiseLibrary: require('bluebird')
//     })
//     .then(() => console.log(`Connected to database ${config.database}`))
//     .catch((err) => console.log(`Database error: ${err}`));


mongoose.connect(config.database, {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('Mongodb connection successful')
    } else {
        console.log('error in db connection:' + err)
    }
});


// CORS Middleware
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length, timezone");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentails", "true");
    next();
});

const users = require('./routes/users');
const products = require('./routes/products');
const carts = require('./routes/carts');
const admins = require('./routes/admins');
const checkouts = require('./routes/checkouts');
const orders = require('./routes/orders');
// Port Number
const port = process.env.PORT || 8080;




// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/products', products);
app.use('/carts', carts);
app.use('/admins', admins);
app.use('/checkouts', checkouts);
app.use('/orders', orders);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});