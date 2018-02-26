const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    res.send("OK");
});

app.get('/track', (req, res) => {
    res.render('track');
    // res.send("OK");
});

app.get('*', (req, res) => {
    res.status(404).send("PAGE NOT FOUND")
});

app.listen(9000, () => {
    console.log('Server is up on 9000')
});

