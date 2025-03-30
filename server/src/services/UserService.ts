import { Role } from "../enums/Role";
import { User } from "../models/User";
import { AuthService } from "./AuthService";
import { JwtService } from "./JWTService";


export class UserService {
    static async createUser(role: Role,userData:{email:string,password:string,whatsAppNumber:string}) {
        const { email, password, whatsAppNumber } = userData
        const emailCode = Math.random() * 1000000
        const whatsAppCode = Math.random() * 1000000
        const hashedPassword = await AuthService.hashPassword(password)
        const user = await User.create({
            email: email,
            password: hashedPassword,
            role: role,
            verificationToken: null,
            emailVerificationCode: String(emailCode),
            whatsAppVerificationCode: String(whatsAppCode),
            whatsAppNumber,
            isWhatsAppVerified: false,
            isEmailVerified: false
        });
        const verificationToken = JwtService.generateEmailVerificationToken(user)
        user.verificationToken = verificationToken
        await user.save()
        return user
    }
}