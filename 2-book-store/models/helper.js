const db = require('./databas');
const {sendVerificationEmail} = require('./emailSender');




class User {
    constructor(id, fName, lName, email, password, verified, verificationCode){
        this.Id= id;
        this.firstName = fName;
        this.lastName = lName;
        this.email = email;
        this.password = password;
        this.verified = verified;
        this.verificationCode = verificationCode;
    }
    static addUser(fName, lName, email, password, verified, verificationCode) {
        return new Promise((resolve, reject) => {
            db.addUser(fName, lName, password, email, verified, verificationCode).then(result => {
                sendVerificationEmail(`${fName} ${lName}`, email, `${result.id}-${verificationCode}`,(ok) =>{
                    if (ok) {
                        resolve(new User(result.id, fName, lName, email, password, verified, verificationCode ))
                    } else {
                        reject({ errorNumber: 9, error: new Error('can not send email')})
                    }
                }) 
                
            }).catch(error => {
                reject(error)
            })
        })
    }

    static checkUser(email, password) {
        return new Promise((resolve, reject) => {
            db.checkUser(email, password).then((user) => {
                resolve(user);
            }).catch(error => {
                reject(error)
            })
        })
    }

    static verifyEmail(userId, verificationCode) {
        return new Promise((resolve, reject) => {
            db.verifyEmail(userId, verificationCode).then(() => {
                resolve();
            }).catch(error => {
                reject(error)
            })
        })
    }

}

module.exports = {
    User
}