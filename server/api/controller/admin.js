import Admin from "../models/Admin.js";
import handler from "express-async-handler";
import hashPassword, { comparePasswords } from '../../lib/hashed.js'
import generateToken from "../../lib/generateToken.js";

export const addAdmin = handler(async (req, res) => {
  const { email, password } = req.body;

  try {
    if (
      !email &&
      email.trim() === "" &&
      !password &&
      password.trim() === "" &&
      password.length < 6
    ) {
      return res.status(422).json({
        message: "Invalid Input !!",
      });
    }
    const adminExist = await Admin.findOne({ email });
    if(adminExist){
        return res.status(409).json({
            message : "Admin Already Exist !!"
        })
    }
    const hashedPassword = hashPassword(password)
    const admin =  new Admin({
      email,
      password: hashedPassword,
    });
    await admin.save()
    
    return res.status(201).json({admin})
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});


export const login = handler(async(req,res) => {
    const {email, password} = req.body
    try {
         if (
           !email &&
           email.trim() === "" &&
           !password &&
           password.trim() === "" &&
           password.length < 6
         ) {
           return res.status(422).json({
             message: "Invalid Input !!",
           });
         }
        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(404).json({
                message : "Admin Not Found !!"
            })
        }
        if(!comparePasswords(password, admin.password)){
            return res.status(401).json({
                message : "Invalid Credentials"
            })
        }
        const token = generateToken(admin._id);
        return res.status(200).json({
            message : "Admin Loged In Sucssfully !!",
            token : token,
            id : admin._id
        })
    } catch (err) {
        return res.status(500).json({
            message : err.message
        })
    }
})


export const getAdminById = handler(async(req,res) => {
  try {
    const {id} = req.params
    const admin = await Admin.findById(id).populate("addedMovies");
    if(!admin){
      return res.status(404).json({
        message : "Admin Not Found"
      })
    }
    return res.status(200).json({admin})
  } catch (err) {
   return res.status(500).json({
    message : err.message
   }) 
  }
})


export const getAllAdmins = handler(async(req,res) => {
  try {
    const admins = await Admin.find();
    return res.status(200).json({admins})
  } catch (err) {
    return res.status(500).json({
      message  : err.message
    })
  }
})