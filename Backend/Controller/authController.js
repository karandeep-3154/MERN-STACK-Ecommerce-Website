import userModel from '../Models/UserModel.js'
import { comparePassword, hashPassword } from '../Helper/AuthHelper.js'
import JWT from 'jsonwebtoken'
export const registerController = async (req, res) =>{

    try{
            //Retreiving Data Fields of New User
            const { name, email, password, phone, address , answer} = req.body;

            if (!name) {
            return res.send({ message: "Name is Required" });
            }
            if (!email) {
            return res.send({ message: "Email is Required" });
            }
            if (!password) {
            return res.send({ message: "Password is Required" });
            }
            if (!phone) {
            return res.send({ message: "Phone no is Required" });
            }
            if (!address) {
              return res.send({ message: "Address is Required" });
            } if (!answer) {
              return res.send({ message: "answer is Required" });
            }

            //Checking for Existing User

            const existingUser = await userModel.findOne({email});

            if(existingUser){

                return res.status(200).send({
                    success: false,
                    message: "Already Registered, Please Login"
                });

            }

            //Hashing the password
            const hashedPassword = await hashPassword(password);

            //Registering the New User
            const user = await new userModel({name, email, phone, address, answer, password:hashedPassword});
            user.save();

            res.status(201).send({
                success:true,
                message:"User Registered Successfully",
                user
            })

    }

    catch(err){
        console.log(err);

        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            err
        })
    }

}

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token generation
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    //Sending Successfully Logged in Response
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        adddress: user.address,
        role: user.role,
      },
      token,
    });

  } 
  
  catch (error) {
  
    console.log(error);
  
    res.status(500).send({
  
      success: false,
      message: "Error in login",
      error,
  
    });
  
  }

};


export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};