const express=require("express");
const {Usermodel}=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const userRouter=express.Router();


userRouter.post("/register", async (req, res) => {
    const { email, pass, name, age } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {//hash ==> secure password
            if (err) {
                console.log(err);
            } else {
                //await Usermodel.insertMany(payload)
                const user = new Usermodel({ email, pass: hash, name, age });
                await user.save();
            }
        })
        res.send("Registered");
    } catch (error) {
        res.send("unable to register");
    }

})


userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await Usermodel.find({ email });
        console.log(user);
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (err, result) => {
                if (result == true) {
                    const token = jwt.sign({ userID:user[0]._id},process.env.Key);
                    res.send({ "msg": "Login Successfull", "token": token });
                } else {
                    res.send("wrong credentials");
                }
            });
        } else {
            res.send("Wrong credentials");
        }
        console.log(user);
    } catch (error) {
        res.send("unable to login");
        console.log(error);
    }
})


module.exports={
    userRouter
}