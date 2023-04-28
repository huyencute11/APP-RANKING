import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers['authorization'];
  
  if (headerToken !== undefined && headerToken.startsWith('Bearer')) {
    const bearerToken = headerToken.slice(7);
    try {
      const tokenValidate = jwt.verify(bearerToken, process.env.SECRET_KEY || 'hihi');
      console.log('tokenValidate', tokenValidate);
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
    
  } else {
    res.status(401).json({ message: 'Authorization token is missing or invalid' });
  }
}
