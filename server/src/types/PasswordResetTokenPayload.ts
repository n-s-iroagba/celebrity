export type PasswordResetTokenPayload = {
  userId: number
  email: string
  // Standard JWT claims like iat, exp will be added automatically by jwt.sign
}
