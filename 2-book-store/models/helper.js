const db = require('./databas');




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
                resolve(new User(result.id, fName, lName, email, password, verified, verificationCode ))
            }).catch(error => {
                reject(error)
            })
        })
    }
}

module.exports = {
    User
}