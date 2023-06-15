import UserModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import otpGenerator from "otp-generator";

//middleware for verify user

export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method === "GET" ? req.query : req.body;

    //check the user existance
    let exist = await UserModel.findOne({ username }).exec();
    if (!exist) {
      return res.status(404).send({ error: "Username not Found" });
    }
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication error" });
  }
}

export async function register(req, res) {
  try {
    const { username, password, email, profile } = req.body;
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
                profile: profile || "",
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

//GET: localhost:5000/api/user/example123
export async function getUser(req, res) {
  const { username } = req.params;
  try {
    if (!username) {
      return res.status(501).send({ error: "Invalid Username" });
    }
    const user = await UserModel.findOne({ username }).exec();
    if (!user) {
      return res.status(501).send({ error: "User not found" });
    }

    //remove password from user object
    //mongoose return unnecessary data like password and _id so we need to remove it
    const { password, ...rest } = Object.assign({}, user.toJSON());

    return res.status(201).send(rest);
  } catch (error) {
    console.log("Error in getUser controller:", error);
    return res.status(404).send({ error: "Cannot find user data" });
  }
}

//api/updateuser
export async function updateUser(req, res) {
  try {
    // const id = req.query.id;
    const { userId } = req.user;

    if (userId) {
      const body = req.body;

      // update the data
      await UserModel.updateOne({ _id: userId }, body).exec();

      return res.status(201).send({ msg: "User data updated successfully" });
    } else {
      return res.status(401).send({ error: "User Not found.." });
    }
  } catch (error) {
    console.log("Error in updateUser controller:", error);
    return res.status(401).send({ error });
  }
}

export async function generateOTP(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
}

export async function verifyOTP(req, res) {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset OTP value
    req.app.locals.resetSession = true; //set the session for reset password
    return res.status(201).send({ msg: "OTP is valid" });
  }
  return res.status(400).send({ error: "OTP is invalid" });
}

//successfull redirect when OTP is valid
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false; //allow access to this route only once
    return res.status(201).send({ msg: "access granted" });
  }

  return res.status(400).send({ error: "access denied" });
}

export async function resetPassword(req, res) {
  try {
    if(!req.app.locals.resetSession) return res.status(440).send({error: "Session Expired"});
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username }).exec();
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.updateOne(
      { username: user.username },
      { password: hashedPassword }
    );
    return res.status(200).send({ msg: "Password reset successfully" });
  } catch (error) {
    return res.status(500).send({ error });
  }
}
