import userModel from '../Models/UserModel.js'
import { comparePassword, hashPassword } from '../Helper/AuthHelper.js'
import JWT from 'jsonwebtoken'
export const registerController = async (req, res) =>{

    try{
            //Retreiving Data Fields of New User
            const { name, email, password, phone, address } = req.body;

            if (!name) {
            return res.send({ error: "Name is Required" });
            }
            if (!email) {
            return res.send({ error: "Email is Required" });
            }
            if (!password) {
            return res.send({ error: "Password is Required" });
            }
            if (!phone) {
            return res.send({ error: "Phone no is Required" });
            }
            if (!address) {
            return res.send({ error: "Address is Required" });
            }

            //Checking for Existing User

            const existingUser = await userModel.findOne({email});

            if(existingUser){

                return res.status(200).send({
                    success: true,
                    message: "Already Registered, Please Login"
                });

            }

            //Hashing the password
            const hashedPassword = await hashPassword(password);

            //Registering the New User
            const user = await new userModel({name, email, phone, address, password:hashedPassword});
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
      return res.status(404).send({
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