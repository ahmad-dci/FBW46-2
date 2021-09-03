const express = require('express');

const adminRoute = express.Router();
// check the session before going to any farther routes
// redirect to signin if user is not exist inside the session
adminRoute.use((req, res, next) => {
    if(req.session.user ) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    } else {
        res.redirect('/signin');
    }
})

adminRoute.get('/', (req, res) => {
    console.log(req.session.id)
    res.render('admin', {title: 'Admin Page'})
})

adminRoute.get('/signout', (req, res) => {
    req.session.destroy();
    
    res.redirect('/signin')
})


module.exports = adminRoute;
