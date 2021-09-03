const express = require('express');
const {  validationResult, checkSchema } = require('express-validator');
const session = require('express-session');

const emailSender = require('./models/emailSender');
const adminRout = require('./routes/adminRout');

const port = process.env.PORT || 5500;

const app = express();

const { User } = require('./models/helper');

// session configuration
app.use(session({
    secret: 'bookstore',
    // maxAge control the session time by milliseconds
    // 1000 * 60 * 5 = 5 minutes
    cookie: {maxAge: 1000 * 60 * 5  }
  }))
// middleware to let the routs get posted data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
// [/admin/changepassword] => inside adminRout = [/changepassword]
// use adminRout for adminRout [/admin] MEANS [/]
app.use('/admin', adminRout);

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
    if (req.session.user) {
        res.redirect('/admin')
    } else {
        res.render('signup', { title: 'Sign Up' })
    }
    
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
        // get random number contains 10 chars to be used as verificationCode
        const rndNum = Math.floor(Math.random() * 9999999999) + 1000000000;
        User.addUser(fName, lName, email, password, false, rndNum.toString()).then(data => {
            //console.log(data);
            res.json({errorNumber: 0, error: null});
        }).catch(error => {
            res.status(400);
            res.json(error);
        })
    } else {
        res.status(400);
        res.json(checkResult)
    }
})

app.get('/signin', (req, res) => {
    if (req.session.user) {
        res.redirect('/admin')
    } else {
        
        res.render('signin', { title: 'Sign in' });
    }
    
});

app.post('/signin', (req, res) => {
    // console.log(req.body);
    const {email, password} = req.body;
    User.checkUser(email, password).then((user) => {
        // create session and send success message to front end
        req.session.user = user;
        res.json({errorNumber: 0, error: null})

        
    }).catch(error => {
        res.status(400);
        res.json(error);
    })

})
app.get('/emailverification/:data', (req, res) => {
    //console.log(req.params.data.split('-'));
    if (req.params.data) {
        const userId = req.params.data.split('-')[0];
        const verificationCode = req.params.data.split('-')[1];
        if (userId && verificationCode) {
            // check the verification code
            User.verifyEmail(userId, verificationCode).then(() => {
                res.send(`your email is verified correctly, you can 
                <a href="/signin">login</a> now`);
            }).catch(error => {
                if (error.errorNumber === 12){
                    res.send(`your email is already verified , you can 
                <a href="/signin">login</a> now`);
                } else {
                    res.send(`verification error number ${error.errorNumber}. 
                    please contact the system admin`);
                }
            });
        }else {
            res.send(`verification data is wrong please click 
            the link that has been sent to your email`);
        }
    } 
    


});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})