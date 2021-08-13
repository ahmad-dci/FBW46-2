const express = require('express');
const emailSender = require('./models/emailSender');

const port = process.env.PORT || 4000;

const app = express();


// middleware to let the routs get posted data
app.use(express.urlencoded({extended: true}));
app.use(express.json());

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

// handle contact us post request
app.post('/contactus', (req, res) => {
console.log(req.body)
emailSender.sendEmail(
    req.body.contactName, 
    req.body.contactEmail, 
    req.body.contactMessage, ok => {
    if(ok) {
        res.json('ok')
    } else {
        res.json('no')
    }
})

})

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})