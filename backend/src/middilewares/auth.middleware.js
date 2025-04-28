import jwt from "jsonwebtoken";

export const authenticateJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message:
          "Authentication required. Bearer token missing or invalid format",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded?.userId) {
        return res.status(403).json({
          message: "Invalid token format",
        });
      }
      req.userId = decoded.userId;
      next();
    } catch (jwtError) {
      return res.status(403).json({
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({
      message: "Authentication failed",
    });
  }
};
