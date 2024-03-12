const jwt = require("jsonwebtoken");

const SECRET_KEY = "Shanchezu says meoww";

const login = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    throw new Error("Please provide userName and password");
  }

  try {
    const id = new Date().getDate();
    const token = jwt.sign({ userName, id }, SECRET_KEY, { expiresIn: "30d" });

    res.status(200).json({ message: "Token created", token });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const dashboard = async (req, res) => {
    //console.log(req.user);
  res.status(200).json({
    message: `Hello, ${req.user.userName}`,
    secret: "Here's a secret! My Kitty name is Shanchez",
  });
};

module.exports = { login, dashboard };
