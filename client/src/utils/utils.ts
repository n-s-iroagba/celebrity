import { Fan } from "../types/Fan";
import { User } from "../types/User";

export const getGreeting = (): string => {
    const currentTime = new Date().getHours();
  
    if (currentTime >= 0 && currentTime < 12) {
      return 'Good morning';
    } else if (currentTime >= 12 && currentTime < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

 export const validateForm = (fan:Fan,user:User,setErrors:any,confirmPassword:string): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fan.firstName.trim())
      newErrors.firstName = "First Name is required.";
    if (!fan.surname.trim()) newErrors.surname = "Surname is required.";
    if (!fan.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required.";
    if (!fan.countryOfResidence) newErrors.country = "Country is required.";
    if (!fan.gender) newErrors.gender = "Gender is required.";
    if (!user.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!user.password) {
      newErrors.password = "Password is required.";
    } else if (user.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (user.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
