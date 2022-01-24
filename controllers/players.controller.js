const fs = require('fs');
const fastcsv = require("fast-csv");
const ws = fs.createWriteStream("bursary.csv");
const nodemailer = require('nodemailer');

exports.addPlayerPage = (req, res) => {
    res.render('add-player.ejs', {
        title: "Welcome to Socka | Add a new player",
        message: ''
    });
};

exports.addPlayer = (req, res) => {
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    let message = '';
    let name = req.body.name;
    let reg_no = req.body.reg_no;
    let options = req.body.options;
    let amount = req.body.amount;
    let email = req.body.email;
    let reasons = req.body.reasons;
    let uploadedFile = req.files.image;
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split('/')[1];
    image_name = name + '.' + fileExtension;

    let emailQuery = "SELECT * FROM `students` WHERE reg_no = '" + reg_no + "'";

    db.query(emailQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            message = 'EYpu have already applied for a bursary';
            res.render('add-player.ejs', {
                message,
                title: "JKUAT Bursaries"
            });
        } else {
            // check the filetype before uploading it
            if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                // upload the file to the /public/assets/img directory
                uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    // send the player's details to the database
                    let query = "INSERT INTO `students` (name, reg_no, options, amount, image, email, reasons) VALUES ('" +
                            name + "', '" + reg_no + "', '" + options + "', '" + amount + "', '" + image_name + "', '" + email + "', '" + reasons + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
                });
            } else {
                message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                res.render('add-player.ejs', {
                    message,
                    title: "Welcome to Socka | Add a new player"
                });
            }
        }
    });
}

exports.approvePlayerPage = (req, res) => {
    let studentId = req.params.id;
    let email = req.body.email
    db.query('SELECT * FROM `students` WHERE id = "' + studentId + '"', function(error, data, fields) {
        if (error) throw error;
    
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);

        fastcsv
        .write(jsonData, { headers: true })
        .on("finish", function() {
            console.log("Written to bursary.csv successfully!");
        })
        .pipe(ws);
    });
    let emailQuery = 'SELECT email from `students` WHERE id = "' + studentId + '"';
    
    db.query(emailQuery, (err, result) => {
        let email = result[0].email
        const transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'jkuatbursariesmanagement@gmail.com',
                pass: 'bursaries',
            },
        });
    
        const mailOptions = {
            from: 'jkuatbursariesmanagement@gmail.com',
            to: email,
            subject: 'Bursaries!',
            html: 'Congratulations! Your Bursary has been approved!',
        };
        
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            //console.log(`Message sent: ${info.response}`);
        });
        res.redirect('/');
    });
   
}
exports.bookAppointmentPage = (req, res) => {
    res.render('appointment.ejs', {
        title: "Welcome to JB| Book an Appointment",
    });
};

exports.bookAppointment = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let reg_no = req.body.reg_no;
    let date = req.body.date;

    let query = "INSERT INTO `appointments` (name, email, reg_no, date) VALUES ('" + name + "', '" + email + "', '" + reg_no + "', '" + date + "')";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.approveAppointmentPage = (req, res) => {
    let playerId = req.params.id;
    let email = req.body.email
    db.query('SELECT email FROM `students` WHERE id = "' + playerId + '"', function(error, data, fields) {
        if (error) throw error;
    
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);

        fastcsv
        .write(jsonData, { headers: true })
        .on("finish", function() {
            console.log("Written to bursary.csv successfully!");
        })
        .pipe(ws);
    });
    let emailQuery = 'SELECT email from `appointments` WHERE id = "' + playerId + '"';
    
    db.query(emailQuery, (err, result) => {
        let email = result[0].email
        const transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'jkuatbursariesmanagement@gmail.com',
                pass: 'bursaries',
            },
        });
    
        const mailOptions = {
            from: 'jkuatbursariesmanagement@gmail.com',
            to: email,
            subject: 'Bursaries!',
            html: 'Your appointment has been set! Visiting hours are between 9.00am and 11.00am',
        };
        
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            //console.log(`Message sent: ${info.response}`);
        });
       
    });
   
}

exports.deletePlayer = (req, res) => {
    let studentId = req.params.id;
    let getImageQuery = 'SELECT image from `students` WHERE id = "' + studentId + '"';
    let deleteUserQuery = 'DELETE FROM students WHERE id = "' + studentId + '"';

    db.query(getImageQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        let image = result[0].image;

        fs.unlink(`public/assets/img/${image}`, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(deleteUserQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        });
    });
}