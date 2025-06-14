import type { Request, Response, NextFunction } from "express"
import { JwtService, type AuthTokenPayload } from "../services/JwtService"

// Extend Express Request type to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenPayload
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided or malformed token." })
  }

  const token = authHeader.split(" ")[1]
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing." })
  }

  try {
    const decoded = JwtService.verifyLoginToken(token)
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid token." })
    }
    req.user = decoded // Attach decoded user payload to request object
    next()
  } catch (error) {
    console.error("Auth middleware error:", error)
    return res.status(401).json({ message: "Unauthorized: Invalid token." })
  }
}
