const fs = require('fs');
exports.getLoginPage = (req, res) => {
    res.render('login.ejs', {
        title: "JKUAT Bursaries",
    });
};

exports.getHomePage = (req, res) => {
    res.render('home.ejs', {
        title: "JKUAT  Bursaries",
    });
};
exports.getAdminPage = (req, res) => {
    let query = "SELECT * FROM `students` ORDER BY id ASC"; // query database to get all the players

    db.query(query,  (err, result) => {
        if (err) {
            res.redirect('/');
        }
       
        res.render('admin.ejs', {
            title: "JKUAT Bursaries",
            students: result
        });
    });
}

exports.getAdminAppointmentPage = (req, res) => {
    let query = "SELECT * FROM `appointments` ORDER BY id ASC"; // query database to get all the players
    // execute query
    

    db.query(query,  (err, result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('admin2.ejs', {
            title: "JKUAT Bursaries",
            appointments: result
        });
    });
}

exports.getLogin = (req, res) => {
    let reg_no = req.body.reg_no;
    let password = req.body.password;

    
    db.query('SELECT * FROM users WHERE reg_no = ? AND password = ?', [reg_no, password], function(err, rows, fields) {
        if(err) throw err
        // if user not found
        if (rows.length <= 0) {
            //req.flash('error', 'Please correct enter email and Password!')
            res.redirect('/');
        if(password === 'admin') {
            res.render('admin.ejs');
        }
        } else {
            res.redirect('/home');
        }
    });
}

exports.getSignupPage = (req, res) => {
    res.render('signup.ejs', {
        title: "Create an account",
        message: ''
    });
};

exports.getSignup = (req, res) => {
    let reg_no = req.body.reg_no;
    let password = req.body.password;

    let query = "INSERT INTO `users` (reg_no, password) VALUES ( '" + reg_no + "', '" + password + "')";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/home');
    });
}
