const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
var methodOverride = require('method-override');

require('dotenv').config();
require('./config/database');
require('./config/passport');

const PORT = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const appRouter = require('./routes/app');
const incomeRouter = require('./routes/income');
const expenseRouter = require('./routes/expense');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const sessionStore = new MongoDBStore({
    uri: process.env.DATABASE_URL,
    collection: 'sessions',
});

sessionStore.on('error', function (error) {
    console.log(error);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
    })
);

app.use(passport.initialize());
app.use(passport.session());
// below is the make the logged in user in a user variable that's available inside all EJS templates
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', appRouter);
app.use('/', incomeRouter);
app.use('/', expenseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
