import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserAttributes } from '../models/User';
import { Role } from '../enums/Role';
 // Assuming UserAttributes contains user data type

interface AuthenticatedRequest extends Request {
  user?: UserAttributes;  // Assuming you have a UserAttributes type for the user
}

const JWT_SECRET = 'your_jwt_secret';  // Use your secret key here

const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { id: number, role: string };  // Decoding the token
};

const getTokenFromHeader = (req: Request): string | null => {
  const token = req.headers['authorization']?.split(' ')[1];  // Extracting the token from Authorization header
  return token || null;
};

export const adminMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = verifyToken(token);
    const userId = decoded.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    if (user.role !== (Role.ADMIN|| Role.SUPER_ADMIN)) {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export const superadminMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = verifyToken(token);
    const userId = decoded.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    if (user.role !== Role.SUPER_ADMIN) {
      return res.status(403).json({ message: 'Forbidden: Superadmins only' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export const fanMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = verifyToken(token);
    const userId = decoded.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    if (user.role !== Role.FAN) {
      return res.status(403).json({ message: 'Forbidden: Fans only' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
