const express = require('express');
const emailSender = require('./models/emailSender');
const { body, validationResult, checkSchema } = require('express-validator');

const port = process.env.PORT || 4000;

const app = express();

const { User } = require('./models/helper');


// middleware to let the routs get posted data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //res.send('hi book store');
    res.render('index', { title: 'Home' });
})

app.get('/catalog', (req, res) => {
    res.render('catalog', { title: 'Catalog' });
})

app.get('/contactus', (req, res) => {
    res.render('contactus', { title: 'Contact Us' });
})




// handle contact us post request
app.post('/contactus', (req, res) => {
    console.log(req.body)
    emailSender.sendEmail(
        req.body.contactName,
        req.body.contactEmail,
        req.body.contactMessage, ok => {
            if (ok) {
                res.json('ok')
            } else {
                res.json('no')
            }
        })

})


app.get('/signup', (req, res) => {
    // get data using get request
    // console.log(req.query);
    res.render('signup', { title: 'Sign Up' })
})


// create posted signup schema

const signupSchema = {
    fName: {
        isLength: {
            min: 2,
            max: 50,
            errorMessage: 'First name is not valid'
        }
    },
    lName: {
        isLength: {
            min: 2,
            max: 50,
            errorMessage: 'Last name is not valid'
        }
    },
    email: {
        isLength: {
            min: 5,
            max: 100,
            errorMessage: 'Email length is not right'
        },
        isEmail: true
    },
    password: {
        isLength: {
            options: { min: 8, max: 20 },
            errorMessage: 'password is not valid'
        }
    }
}
app.post('/signup', checkSchema(signupSchema), (req, res) => {
    
    const checkResult = validationResult(req).errors;
    if (checkResult.length === 0) {
        const { fName, lName, email, password } = req.body;
        User.addUser(fName, lName, email, password, false, '0123456789').then(data => {
            console.log(data);
            
        }).catch(error => {
            console.log(error);
        })
    } else {
        res.status(400);
        res.json(checkResult)
    }
})

app.get('/signin', (req, res) => {
    res.render('signin', { title: 'Sign in' });
});

app.post('/signin', (req, res) => {
    // console.log(req.body);
    const {email, password} = req.body;
    User.checkUser(email, password).then(() => {
        // create session and send success message to front end
        
    }).catch(error => {
        res.status(400);
        res.json(error);
    })

})

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})