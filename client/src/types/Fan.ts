
export type Fan = {
    id?:string,
    firstName: string;
    surname: string;
    dateOfBirth: Date | null;
    countryOfResidence: string;
    gender: string;
    email: string;
    occupation:string;
    whatsappNumber: string;
    password: string;
    confirmPassword?: string;
    profilePicture?:string;
  };