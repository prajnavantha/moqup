var http = require('http'),
    express = require('express');

var bodyParser = require('body-parser'); // for reading POSTed form data into `req.body`
var expressSession = require('express-session');
var cookieParser = require('cookie-parser'); // the session is stored in a cookie, so we use this to parse it
var expressSession = require('express-session');
// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise

// var Strategy = require('passport-facebook').Strategy;

var app = express();
var server = http.createServer(app);
var fs = require('fs');
var path = require('path');
app.use('/static', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/partials', express.static(path.join(__dirname, 'app/partials')));
app.use(cookieParser()); // for handling cookie
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));



app.post('/login', function(req, res) {
    if (req.body.email === "test@moengage.com" && req.body.password === "12345") {
        res.cookie("accessToken", new Date().getTime())
        res.status(200).send({
            "result": "success"
        })
    } else {
        res.status(200).send({
            "result": "failure",
            "reason": "Invalid username or password"
        })
    }
})

app.get('/logout', function(req, res) {
    res.clearCookie('accessToken');
    // res.redirect('/');
    res.status(200).send()

})



app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app/index.html')
})

server.listen(process.env.PORT || 3000)
