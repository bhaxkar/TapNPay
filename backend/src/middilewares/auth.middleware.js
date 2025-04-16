import jwt from "jsonwebtoken";

export const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message:
        "Authentication required. Bearer token missing or invalid format",
    });
  }
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded?._id;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
