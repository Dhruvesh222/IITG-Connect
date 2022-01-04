const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session'); 
var MongoDBStore = require('connect-mongodb-session')(session);
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');
const bodyparser = require('body-parser');
// const filestore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');

//express instance
const app = express();

// environment config
dotenv.config();
const PORT = process.env.PORT || 3000

// passport config
require('./config/passport')(passport);

//models
const UserModal = require('./models/User');

//routes
const homeroutes = require('./routes/homeroutes');
const usersroutes = require('./routes/usersroutes');
const postroutes = require('./routes/postroutes');

// ejs 
app.use(expressLayouts);
app.set('view engine','ejs');


// for static css/js files from public folder
app.use(express.static('public'));

// morgan middleware
app.use(morgan('dev'));

//body parser middleware
app.use(express.urlencoded({extended:true}));

// mongostore 
var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/IITG-Connect',
    collection: 'mySessions'
  });

//express session middleware
app.use(session({
    name:"session_id",
    secret: ' write anything ',
    resave: false,
    saveUninitialized: false,
    store: store,
    // cookie: { maxAge: 60000 },
    // rolling: true,
    // sameSite : true
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// flash middleware
app.use(flash());

// global middleware
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//routes
app.use('/',homeroutes);
app.use('/users',usersroutes);
app.use('/posts',postroutes); 

// db configuration
const dbURI = process.env.MONGO_URL;
// const dbURI = `mongodb://localhost:27017/IITG-Connect`;
const bodyParser = require('body-parser');

// body-parser json
app.use(bodyparser.json());

//connect to database
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true,})
.then((result)=>{
    console.log("connected to database");
    // app.listen('3000',()=>{
    //     console.log("listening at 3000");
    // });
    app.listen(PORT,console.log(`Server started on localhost:${PORT}`))
})
.catch(err=>console.log(err));
