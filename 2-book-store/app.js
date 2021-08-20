const express = require('express');
const emailSender = require('./models/emailSender');

const port = process.env.PORT || 4000;

const app = express();

const {User} = require('./models/helper');


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

app.get('/signup', (req, res) => {
    // get data using get request
    // console.log(req.query);
    res.render('signup', {title: 'Sign Up'})
})

app.post('/signup', (req, res) => {
    //User.addUser(req.body.fName, req.body.lName, req.body.email, req.body.password, false,  )
    // get data using post request
    console.log(req.body);
    const {fName, lName, email, password} = req.body;
    User.addUser(fName, lName, email, password, false, '0123456789').then(data => {
        console.log(data);
    }).catch(error => {
        console.log(error);
    })
})

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})