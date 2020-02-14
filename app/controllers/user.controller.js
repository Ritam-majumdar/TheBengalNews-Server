const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const config = require('app/config.json')
// New User Signup
exports.signup = (req, res, next) => {
    // Validate request
    // if(!req.body.title) {
    //     return res.status(400).send({
    //         message: "Keyword title or position can not be empty"
    //     });
    // }

    // Create a User
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const user = new User({
                userId: req.body.userId,
                password: hash
            });

            // Save User in the database
            user.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while signing up user."
                    });
                });

        }
    });




};
//User Login
exports.login = (req, res, next) => {
    User.find({ userId: req.body.userId })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        userId: user[0].userId
                    },
                        "theBengalNewsSecret",
                        {
                            expiresIn: "1h"
                        });
                    return res.status(200).json({
                        message: 'Login Successful!!',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while Login."
            });
        });
}