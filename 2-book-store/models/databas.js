const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const connectionString = 'mongodb+srv://fbw46_user:1234qwer@cluster0.rmrmn.mongodb.net/fbw46?retryWrites=true&w=majority';


function connect() {
    return new Promise((resolve, reject) => {
        if (mongoose.connection.readyState === 1) {
            resolve();
        } else {
            mongoose.connect(connectionString, {
                useUnifiedTopology: true,
                useCreateIndex: true,
                useNewUrlParser: true
            }).then(() => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        }
    })
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fName: {
        type: String,
        required: true,
        minlength: [2, 'there is no first name less than 2 chars'],
        maxlength: [50, 'there is no first name more than 50 chars or you need to change your name']
    },
    lName: {
        type: String,
        required: true,
        minlength: [2, 'there is no first name less than 2 chars'],
        maxlength: [50, 'there is no first name more than 50 chars or you need to change your name']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'there is no email less than 5 chars'],
        maxlength: [100, 'there is no email more than 100 chars or you need to change your email']
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    },
    verificationCode: {
        type: String,
        required: true
    }

});
// creating user model
const Users = mongoose.model('users', userSchema);

/*
Errors Map:
0: no errors 
3: database connection error
4: save user to database error // email is already exist
5: password hash error
6: can not find a user with given email
7: user email is not verified
8: password does not match the password on database
9: can not send email

*/

/**
 * add user to database
 * @param {String} firstName 
 * @param {String} lastName 
 * @param {String} password 
 * @param {String} email 
 * @param {Boolean} verified 
 * @param {String} verificationCode 
 */
function addUser(firstName, lastName, password, email, verified, verificationCode) {
    return new Promise((resolve, reject) => {
        connect().then(() => {

            // encrypt original password and save use
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    reject({ errorNumber: 5, err })
                } else {
                    // now we can save the user with a hashedPassword
                    // the connection is done
                    const newUser = new Users({
                        fName: firstName,
                        lName: lastName,
                        password: hashedPassword,
                        email,//same as email: email
                        verified,
                        verificationCode
                    });
                    newUser.save().then(result => {
                        resolve(result)
                    }).catch(error => {
                        reject({ errorNumber: 4, error })
                    })
                }
            })

        }).catch(error => {
            reject({ errorNumber: 3, error })
        })
    })
}

function checkUser(email, password) {
    // check user using email
    // is this user's email is verified
    // is user password match the password on database
    // if all passed resolve
    return new Promise((resolve, reject) => {
        connect().then(() => {
            Users.findOne({email}).then(data => {
                console.log(data);
                if (data === null) {
                    reject({errorNumber: 6, error: new Error('can not find a user with given Email')})
                } else {
                    if (data.verified === false) {
                        reject({errorNumber: 7, error: new Error('user email is not verified')})
                    } else {
                        bcrypt.compare(password, data.password, (err, result) => {
                            if (err) {
                                reject({errorNumber: 5, error: err})
                            } else {
                                if (result === false) {
                                    reject({errorNumber: 8, error: new Error('password does not match the password on the database')})
                                } else {
                                    resolve(data);
                                }
                            }
                        })
                    }
                }
            })

        }).catch(error => {
            console.log(error);
            reject({ errorNumber: 3, error })
        })
    })
}

module.exports = {
    addUser,
    checkUser
}