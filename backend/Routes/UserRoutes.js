const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');


// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const saltRounds = parseInt(process.env.HASH_PASSWORD) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }


    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// login up
router.post('/login',async(req,res)=>{
  try{
    const {email,password}=req.body;
    const newuser=await User.findOne({email});

    if(!newuser){
      return res.status(400).json({message:"user Not found"});
    }

    const isMatch=await bcrypt.compare(password,newuser.password);
    if(!isMatch){
      return res.status(400).json({message:"Invalid Credentials"});
    }

    res.status(200).json({
      message:"login Successfull",
      user:{
        name:newuser.name,
        email:newuser.email,
        _id:newuser._id
      }
    });

  }catch(error){
    res.status(500).json({message:error.message})
  }
})
module.exports = router;
