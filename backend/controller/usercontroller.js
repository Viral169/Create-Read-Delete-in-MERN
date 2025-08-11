const userschema = require("../schema/userschema");
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existsemail = await userschema.findOne({ email });
    if (existsemail) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const usersinup = await userschema.create({ name, email, password });
    res.status(200).json({
      message: "User signup succesfully",
      token: await usersinup.generateToken(),
      usersinup,
    });
  } catch (error) {
    res.status(400).json({ message: "signup error", error: error });
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userlogin = await userschema.findOne({ email });
    if (!userlogin) {
      return res.status(500).json({ message: "Invalid Eamil" });
    }
    const comparepassword = await userlogin.comparePassword(password);
    if (comparepassword) {
      return res.status(200).json({
        message: "User Login Successfully",
        token: await userlogin.generateToken(),
        userId: userlogin._id,
        login: userlogin,
      });
    } else {
      return res.status(401).json({ message: "Invalid Password" });
    }
  } catch (e) {
    next(e);
  }
};

const getallUser = async (req, res) => {
  try {
    const alluser = await userschema.find();
    if (!alluser || alluser.length === 0) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json({ alluser });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const deleteuser = await userschema.findByIdAndDelete(id);
  if (!deleteuser) {
    res.status(400).json({ message: "User Not Found" });
  }
  res.status(200).json({ message: "User Deleted Successfully" });
};

module.exports = { signup, login, deleteUser, getallUser };
