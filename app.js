require('dotenv').config();
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const bodyParser = require('body-parser')

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var db=require('./models')
db.sequelize.sync({force:false})

var indexRouter = require('./routes/index');
var initRouter=require('./routes/initData')
var authRouter=require('./routes/auth')

//guest 
var categoryRouter=require('./routes/guest/category')
var brandRouter=require('./routes/guest/brand')
var productRouter=require('./routes/guest/product')
var searchRouter=require('./routes/guest/search')

//admin
var adminBrandsRouter=require('./routes/admin/brands')
var adminCategoriesRouter=require('./routes/admin/categories')
var adminOrdersRouter=require('./routes/admin/orders')
var adminProductsRouter=require('./routes/admin/products')
var adminUsersRouter=require('./routes/admin/users')

//user
var userCartRouter=require('./routes/user/cart')
var userCartItemsRouter=require('./routes/user/cartItems')
var userOrderRouter=require('./routes/user/order')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//guest
app.use('/', indexRouter);
app.use('/init', initRouter);
app.use('/', authRouter);
app.use('/category', categoryRouter);
app.use('/brand', brandRouter);
app.use('/product', productRouter);
app.use('/search', searchRouter);

//admin
app.use('/admin/products', adminProductsRouter);
app.use('/admin/brands', adminBrandsRouter);
app.use('/admin/categories', adminCategoriesRouter);
app.use('/admin/orders', adminOrdersRouter);
app.use('/admin/users', adminUsersRouter);

//user
app.use('/admin/cart', userCartRouter);
app.use('/admin/cartitems', userCartItemsRouter);
app.use('/admin/order', userOrderRouter);


app.use(bodyParser.json())
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


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
