import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Retrive the token from cookies
    const token = req.cookies.token;
    // Check if token is not present
    if (!token) {
      return res.status(401).json({
        message: "User not authicated",
        success: false,
      });
    }
    // verify the token using jwt.verify
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    // If token verification fails, response with an error
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    // Attach the decoded user ID to the request object
    req.id = decode.userId;
    // Proceed to the next middleware or route handles
    next();
  } catch (error) {
    console.log(error);
    // Return a 500 status if an error occurs during token verification
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export default isAuthenticated;
