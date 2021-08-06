const express = require('express');

const app = express();

const port = process.env.PORT || 4000;


// use express.static to have public routs
app.use(express.static( 'public'));

// set the view engin
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')


const navObj = [
    {name: 'Home', link: '/'},
    {name: 'About', link: '/about'},
    {name: 'Contact', link: '/contact'},
    {name: 'services', link: '/services'},
    {name: 'Languages', link: ''}

];

app.get('/', (req, res) => {
// console.log(req)
//res.send('hi, I am a normal text')
//res.sendFile(__dirname +  '/somefile.txt');
    //res.sendFile(__dirname + '/myhtml/main.html')
    res.render('main', {name: "Home", nav: navObj, current: 'Home'});
})

app.get('/about', (req, res) => {
    // console.log(req)
    //res.send('hi, I am a normal text')
    //res.sendFile(__dirname +  '/somefile.txt');
        //res.sendFile(__dirname + '/myhtml/main.html')
        res.render('main', {name: "about", nav: navObj, current: 'About'});
    })


// app.get('/style.css', (req, res) => {
// res.sendFile(__dirname + '/myhtml/style.css')
// })


app.listen(port, () => {
    console.log(`the server is tunning on port ${port}`);
});
