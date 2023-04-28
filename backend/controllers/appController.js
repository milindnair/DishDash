import UserModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from '../config.js'

export async function register(req, res) {
  try {
    const { username, password, email } = req.body;
    console.log(req.body);

    // check the existing user
    const existUsername = UserModel.findOne({ username })
      .exec()
      .then((user) => {
        if (user) {
          console.log("existUsername rejected:", {
            error: "Please use unique username",
          });
          return Promise.reject({ error: "Please use unique username" });
        }

        console.log("existUsername resolved");
      })
      .catch((error) => {
        console.log("existUsername rejected:", error);
        return Promise.reject(new Error(error));
      });

    const existEmail = UserModel.findOne({ email })
      .exec()
      .then((email) => {
        if (email) {
          console.log("existEmail rejected:", {
            error: "Please use unique Email",
          });
          return Promise.reject({ error: "Please use unique Email" });
        }

        console.log("existEmail resolved");
      })
      .catch((error) => {
        console.log("existEmail rejected:", error);
        return Promise.reject(new Error(error));
      });

    // console.log(existUsername, existEmail);

    Promise.all([existUsername, existEmail])
      .then(() => {
        console.log("All promises resolved");
        console.log("password", password);
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
            //   console.log(hashedPassword);

              const user = new UserModel({
                username,
                password: hashedPassword,
                email,
              });

              // return save result as a response
              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: "User Register Successfully" })
                )
                .catch((error) => res.status(500).send({ error }));
            })
            .catch((error) => {
              return res.status(500).send({
                error: "Enable to hashed password",
              });
            });
        }
      })
      .catch((error) => {
        console.log("One or more promises rejected:", error);
        return res.status(500).send({ error: error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function login(req, res) {
    const { username, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ username }).exec();
      if (!user) {
        return res.status(404).send({ error: "Username not Found" });
      }
  
      const passwordCheck = await bcrypt.compare(password, user.password);
  
      if (!passwordCheck) {
        return res.status(400).send({ error: "Password does not match" });
      }
  
      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
        },
        ENV.JWT_SECRET,
        { expiresIn: "24h" }
      );
  
      return res.status(200).send({
        msg: "Login Successful...!",
        username: user.username,
        token,
      });
    } catch (error) {
      console.log("Error in login controller:", error);
      return res.status(500).send({ error });
    }
  }
  
  

export async function getUser(req, res) {
  res.json("getUser route");
}

export async function updateUser(req, res) {
  res.json("updateUser route");
}

export async function generateOTP(req, res) {
  res.json("generateOTP route");
}

export async function verifyOTP(req, res) {
  res.json("verifyOTP route");
}

//successfull redirect when OTP is valid
export async function createResetSession(req, res) {
  res.json("createResetSession route");
}

export async function resetPassword(req, res) {
  res.json("resetPassword route");
}
