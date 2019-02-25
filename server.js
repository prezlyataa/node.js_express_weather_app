const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use((req,res,next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});
// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    res.render(
        'home.hbs',
        {
            pageTitle: 'Welcome to home page!',
            currentYear: new Date().getFullYear()
        }
    );
});
app.get('/help', (req,res) => {
    res.sendFile(__dirname + '/public/help.html');
});
app.get('/about', (req, res) => {
    res.render(
        'about.hbs',
        {
            pageTitle: 'Welcome to about page!',
            currentYear: new Date().getFullYear()
        }
    );
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});