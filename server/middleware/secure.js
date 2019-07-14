import jwt from 'jsonwebtoken';

const secure = {
  protect: (req, res, next) => {
   
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).send({
        status: 401,
        error: "Access denied, No token",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.jwtPrivateKey);
      req.user = decoded;
      req.body.token = token;
      next();
    } catch (ex) {
      res.status(400).send({
        status: 400,
        error: "invalid token",
      });
    }
  }
}

export default secure;