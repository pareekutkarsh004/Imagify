import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      // Always attach userId to request object
      req.userId = tokenDecode.id;

      // Only attach to body if body exists (avoids GET request issues)
      if (req.method !== 'GET') {
        req.body.userId = tokenDecode.id;
      }

      next();
    } else {
      return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;
