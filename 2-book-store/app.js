const express = require('express');

const port = process.env.PORT || 4000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //res.send('hi book store');
    res.render('index', {title: 'Home'});
})

app.get('/catalog', (req, res) => {
    res.render('catalog', {title: 'Catalog'});
})

app.get('/contactus', (req, res) => {
    res.render('contactus', {title: 'Contact Us'});
})

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})