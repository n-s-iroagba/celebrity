import express from "express"
import { AuthController } from "../controllers/AuthController"
import passport from "passport"

const router = express.Router()

// router.post('/register', AuthController.register); // This was for a generic register
router.post("/register/fan", AuthController.registerFan) // Assuming this is the correct one
// router.post('/register/celebrity', AuthController.registerCelebrity); // If you have this

router.post("/login", AuthController.login)
// router.post('/logout', AuthController.logout); // Logout usually needs auth middleware
// router.get('/me', AuthController.getMe); // getMe usually needs auth middleware

router.post("/verify-email/resend", AuthController.resendVerificationEmail)
router.get("/verify-email/:token", AuthController.verifyEmailLink) // For link-based verification

router.post("/forgot-password", AuthController.forgotPassword) // This is the one we need
router.post("/reset-password/:token", AuthController.resetPassword)

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google_oauth_failed`,
  }),
  AuthController.googleAuthCallback,
)

export default router
