const mongoose = require('mongoose');

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
        minlength:[2, 'there is no first name less than 2 chars'],
        maxlength:[50, 'there is no first name more than 50 chars or you need to change your name']
    },
    lName: {
        type: String,
        required: true,
        minlength:[2, 'there is no first name less than 2 chars'],
        maxlength:[50, 'there is no first name more than 50 chars or you need to change your name']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength:[5, 'there is no email less than 5 chars'],
        maxlength:[100, 'there is no email more than 100 chars or you need to change your email']
    }
})