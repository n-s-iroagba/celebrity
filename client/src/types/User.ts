import { Role } from "./Role";

export type User = {
  readonly id?: number | null;
  email: string;
  password: string;
  role?: Role;
  emailVerificationCode?: string | null;
  verificationToken?: string | null;
  passwordResetToken?: string | null;
  whatsAppNumber: string;
  whatsAppVerificationCode?: string | null; // Optional field
  isWhatsAppVerified?: boolean|null;
  isEmailVerified?: boolean|null;
};
