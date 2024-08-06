var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var studentsRouter = require('./routes/students');
var categoryRouter = require('./routes/categoryRouter');
var orderRouter = require('./routes/orderRouter');

var app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-config');

//config mongoose
const mongoose = require('mongoose');
const Order = require('./models/Order');
require('./models/Category');
require('./models/Product');
require('./models/User');
require('./models/Order');

// conect database
//connect database
mongoose.connect('mongodb+srv://thuannicky1606:QrE7ufUjAe4Q8Wn4@thuannt.c7klvow.mongodb.net/MOB402_t', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/students', studentsRouter);
app.use('/product', productRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categoryRouter', categoryRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/orderRouter', orderRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
