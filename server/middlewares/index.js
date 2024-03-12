const jwt = require("jsonwebtoken");
const SECRET_KEY = "Shanchezu says meoww";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    //throw new Error("No Token provided");
    res.status(400).json({ message: "No Token provided" });
  }

  const token = authHeader && authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { id, userName } = decoded;
    //console.log(userName);
    req.user = { id, userName };

    next();
  } catch (error) {
    //throw new Error("Not Authorized to access this route");
    res.status(400).json({ message: "Not Authorized to access this route" });
  }
};

module.exports = authMiddleware;
