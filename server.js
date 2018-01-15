const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({ secret: "surveyform" }))

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if (!req.session.formData) {
        req.session.formData = {};
    }
    res.render('index');
});

app.post('/process', function(req, res) {
    req.session.formData = req.body;
    console.log(req.session.formData);
    res.redirect('/result');
});
app.get('/result', function(req, res) {
    var data = req.session.formData;
    res.render('result', { data: data });
});

app.listen(8000, function() {
    console.log("listening on port 8000");
})