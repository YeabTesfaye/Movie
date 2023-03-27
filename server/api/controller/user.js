import User from "../models/User.js";
import handler from "express-async-handler";
import hashPassword, { comparePasswords } from '../../lib/hashed.js'
import Booking from "../models/Bookings.js";

export const getAllUsers = handler(async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export const addUsers = handler(async (req, res) => {
  const { email, password, name } = req.body;
  
  try {
    if (
      !email &&
      email.trim() === "" &&
      !password &&
      password.trim() === "" &&
      password.length < 6 &&
      !name &&
      name.trim() === ""
    ) {
      return res.status(422).json({
        message: "Invalid Input",
      });
    }
    const userExist =  await User.findOne({email});
    if(userExist){
      return res.status(409).json({
        message : "User Already Exist"
      })
    }
    const hashedPassword = hashPassword(password);
    const user = new User({
      email,
      name,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

export const updateUser = handler(async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, name } = req.body;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        message: "User Not Found",
      });
      return res.status(200).json({ user });
    }

    if (email) {
      user.email = email;
    }
    if (password) {
      const hashedPassword = hashPassword();
      user.password = hashedPassword;
    }
    if (name) {
      user.name = name;
    }
    await user.save();

    return res.status(200).json({ message: "Updated Sucssfully !!" });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });

  }
});

export const deleteUsers = handler(async(req,res) => {
  try {
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);
    if(!user){
      return res.status(404).json({
        message : "User Not Found"
      })
    }
    return res.status(200).json({
      message : "User Deleted Sucssfully !!"
    })
  } catch (error) {
    return res.status(500).json({
      message : err.message
    })
  }
})

export const login = handler(async(req,res) => {
  const {email, password} = req.body

  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({
        message : "User Not Found !!"
      })
    }
    if(!comparePasswords(password, user.password)){
      return res.status({
        message : "Invalid Credintials !!"
      })
    }

    return res.status(200).json({
      user,
      message: "login Sucssfully !!",
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
})

export const getBookingsOfUser = handler(async (req, res) => {
  const { id } = req.params;
  try {
    const bookings = await Booking.find({ user: id });
    if (!bookings) {
      return res.status(404).json({
        message: "Booking Not Found !!",
      });
    }
    return res.status(200).json({ bookings });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});