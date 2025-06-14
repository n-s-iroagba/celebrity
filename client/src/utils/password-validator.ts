export interface PasswordValidationDetail {
  key: keyof Omit<PasswordValidationResult, "allValid" | "message">
  label: string
  regex?: RegExp // Optional regex for direct testing if needed, primarily for reference
  testFn: (password: string) => boolean
}

export interface PasswordValidationResult {
  minLength: boolean
  hasUpperCase: boolean
  hasLowerCase: boolean
  hasNumber: boolean
  hasSpecialChar: boolean
  allValid: boolean
  message?: string // Overall message if not all valid
}

export const passwordCriteria: PasswordValidationDetail[] = [
  { key: "minLength", label: "At least 8 characters", testFn: (p) => p.length >= 8 },
  { key: "hasUpperCase", label: "At least one uppercase letter (A-Z)", testFn: (p) => /[A-Z]/.test(p) },
  { key: "hasLowerCase", label: "At least one lowercase letter (a-z)", testFn: (p) => /[a-z]/.test(p) },
  { key: "hasNumber", label: "At least one number (0-9)", testFn: (p) => /[0-9]/.test(p) },
  {
    key: "hasSpecialChar",
    label: "At least one special character (e.g., !@#$%^&*)",
    testFn: (p) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(p),
  },
]

export const initialPasswordValidationResult: PasswordValidationResult = {
  minLength: false,
  hasUpperCase: false,
  hasLowerCase: false,
  hasNumber: false,
  hasSpecialChar: false,
  allValid: false,
}

export const validatePassword = (password: string): PasswordValidationResult => {
  if (!password) return initialPasswordValidationResult

  const result: PasswordValidationResult = { ...initialPasswordValidationResult }
  let allValid = true

  for (const criterion of passwordCriteria) {
    const isValid = criterion.testFn(password)
    result[criterion.key] = isValid
    if (!isValid) {
      allValid = false
    }
  }
  result.allValid = allValid
  if (!allValid) {
    // Find first unmet criterion for a generic message, or keep it undefined
    // For more specific messages, the UI can iterate through criteria.
    // result.message = "Password does not meet all criteria.";
  }
  return result
}
