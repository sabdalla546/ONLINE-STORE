const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const dbConection = require('./config/dbConnection');
const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');
const categoryRouter = require('./routes/CategoryRouter');
const globalErrorHandler = require('./controller/errorController');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const AppError = require('./utilts/appError');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('uncaughtException SHUTTING DOWN');
    process.exit(1);
  });
 

const app = express();
// conecction to database
dbConection();  
app.use(cors());
app.options("*",cors())
app.use(morgan('dev'));
// set security http headers
app.use(helmet());
// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api',limiter);

app.use(cookieParser());

app.use(express.json({limit:'10kb'}));
// data sanitization against noSQL qurey injection
app.use(mongoSanitize());
// data sanitization against xss
app.use(xss());
// prevent parameter pollution
app.use(hpp({
  whitelist:[
    'price'
  ]
}));
app.use(express.urlencoded({extended:false}));
// serving static files
app.use(express.static(`${__dirname}/public`));
// test middleware
app.use((req,res,next)=>{
 console.log(req.cookies.jwt);
  next();
})
app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);

app.get('/',(req,res)=>{
    res.send("hello");
});

app.post('/register',authRouter);
app.post('/login',authRouter);
app.post('/loginAdmin',authRouter);
app.post('/forgotpassword',authRouter);
app.patch('/resetpassword/:token',authRouter);
app.patch('/updateMyPassword',authRouter);
app.patch('updateMe',authRouter);
app.patch('deletMe',authRouter);
app.get('/',authRouter);
app.get('/:id',authRouter);
app.get('/wishList',authRouter);
app.post('/cart',authRouter);
app.put('/saveAddress',authRouter);
app.delete('/:id',authRouter);
app.put('/:id',authRouter);
app.put('/block-user/:id',authRouter);
app.put('/unblock-user/:id',authRouter);
// product 
app.get('/',productRouter);

app.post('/',productRouter);
app.get('/:id',productRouter);
app.patch('/:id',productRouter);
app.delete('/:id',productRouter);
app.put('wishlist',productRouter);
app.put('rating',productRouter);
// category
app.post('/',categoryRouter);
app.put('/:id',categoryRouter);
app.delete('/:id',categoryRouter);
app.get('/:id',categoryRouter);
app.get('/',categoryRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
app.listen(process.env.PORT|| 8000,()=>{
    console.log(`server is runing in port ${process.env.PORT}`);
});

process.on('unhandledRejection promise', err => {
    console.log(err.name, err.message);
    console.log('UNHASNDELED REJECTION SHUTTING DOWN');
    server.close(() => {
      process.exit(1);
    });
  });