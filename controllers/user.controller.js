const fs = require('fs');

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
        res.redirect('/');
    });
}


