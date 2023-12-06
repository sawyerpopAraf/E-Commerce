require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var db=require('./models')
db.sequelize.sync({force:false})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var initRouter=require('./routes/initData')
var authRouter=require('./routes/auth')
var categoryRouter=require('./routes/category')
var brandRouter=require('./routes/brand')
var productRouter=require('./routes/product')
var searchRouter=require('./routes/search')
var adminRouter=require('./routes/admin')
var cartItems=require('./routes/cartItems')
var cartRouter=require('./routes/cart')
var orderRouter=require('./routes/order')


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/init', initRouter);
app.use('/', authRouter);
app.use('/category', categoryRouter);
app.use('/brand', brandRouter);
app.use('/product', productRouter);
app.use('/search', searchRouter);
app.use('/admin', adminRouter);
app.use('/item', cartItems);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);



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
