"use strict";
const conn = require("../../config/mysql_connection");
const { secret } = require("../../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JobSeeker = require('../../models/JobSeeker');

const admin = {
    name: 'admin user',
    email: 'admin@indeed.com',
    password: 'admin',
    id: 'adminid_1'
}

const login  = (req, callback) => {
    try {
        const email = req.email;
        const password = req.password;
        const accountType = req.accountType;
        if("Admin" === accountType) {
            console.log('Logging on admin');
            if(email!=admin.email) {
                console.log("No admin present with this email");
                callback("No admin present with this email",{msg:"No admin present with this email",code:'203'});
            } else if( password!=admin.password) {
                console.log("Your password is incorrect");
                callback("Your password is incorrect",{msg:"Your password is incorrect",code:'203'});
            } else {
                let payload = { id: admin.id, accountType: 'Admin', user: {email:email, name: admin.name, id: admin.id} };
                const token = jwt.sign(payload, secret, {
                    expiresIn: 1008000,
                });
                console.log("JWT " + token);
                callback(null, "JWT " + token);
            }
        }
        else if ("JobSeeker" === accountType) {
            conn.query(
                "select * from JobSeeker where email = ?",
                [email],
                async function (err, results) {
                    if (err) {
                        console.log("error");
                        return callback("Error ocurred",{msg:"Error occured while checking email for jobseeker",code:'203'});
                    }
                    else if (results.length <= 0) {
                        console.log("Not found");
                        return callback("JobSeeker not registered",{msg:"JobSeeker not registered",code:'203'});
                    }
                    console.log(results)
                    const compRes = await bcrypt.compare(password, results[0].password);
                    let payload = { id: results[0].id, accountType: results[0].accountType, user: results[0] };
                    if (compRes) {
                        JobSeeker.find({jobSeekerId:payload.id},'resumeUrl').then(resume => {
                            console.log('resume:',resume);
                            resume  = resume[0];
                            if(resume!=null)
                            payload.resumeUrl=resume.resumeUrl;
                            const token = jwt.sign(payload, secret, {
                                expiresIn: 1008000,
                            });
                            console.log("JWT " + token);
                            callback(null,"JWT " + token);
                        })
                        
                    } else {
                        console.log("incorrect");
                        callback("Password incorrect",{msg:"Password incorrect",code:'203'});
                    }
                }
            );
        } else if ("Employer" === accountType) {
            conn.query(
                "select * from Employer where email = ?",
                [email],
                async function (err, results) {
                    if (err) {
                        return callback("Error ocurred",{msg:"Error occured while checking email for employer",code:'203'});
                    }
                    else if (results.length <= 0) {
                        return callback("Employer not registered",{msg:"Employer not registered",code:'203'});
                    }
                    const compRes = await bcrypt.compare(password, results[0].password);
                    const payload = { id: results[0].id, accountType: results[0].accountType, user: results[0] };
                    if (compRes) {
                        const token = jwt.sign(payload, secret, {
                            expiresIn: 1008000,
                        });
                        console.log("JWT " + token);
                        callback(null, "JWT " + token);
                    } else {
                        console.log("incorrect");
                        callback("Password Incorrect",{msg:"Password incorrect",code:'203'});
                    }
                }
            );
        }
    }
    catch (error) {
        console.log("ERROR!!!!!" +error);
        callback("Error while logging in","Error while login");
    }
};

exports.login = login;