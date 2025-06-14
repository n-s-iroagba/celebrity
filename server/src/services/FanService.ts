import { Role } from "../enums/Role"
import { Fan, type FanCreationAttributes, type FanAttributes, Gender } from "../models/Fan"
import { User } from "../models/User"
import { MailService } from "./MailService"
import { UserService } from "./UserService"
// Removed MailService, MessageService, UserService imports as they are not directly used here for now

export class FanService {
  static ChatService: any
  static MessageService: any

  static async createFan(
    fanData: Partial<Fan>,
    userData: Partial<User>,
  ): Promise<{ token: string | null; fanId: number }> {
    const { firstName, surname, countryOfResidence, dateOfBirth, gender, occupation } = fanData
    const { email, password, whatsAppNumber } = userData
    if (
      !firstName ||
      !surname ||
      !email ||
      !password ||
      !gender ||
      !whatsAppNumber ||
      !countryOfResidence ||
      !dateOfBirth ||
      !occupation
    ) {
      throw new Error("Missing user fields  required in createFan Service function")
    }
    try {
      const user = await UserService.createUser(
        Role.FAN,
        userData as { email: string; password: string; whatsAppNumber: string },
      )

      const fan = await Fan.create({
        firstName,
        surname,
        countryOfResidence,
        dateOfBirth,
        userId: user.id,
        gender,
        occupation,
      })

      await MailService.sendVerificationEmail(user)
      return { token: user.verificationToken, fanId: fan.id }
    } catch (e: any) {
      console.error(e)
      throw new Error("Error creating fan in createFan Service function")
    }
  }

  static async createFanProfile(
    userId: number,
    fanData: Pick<FanCreationAttributes, "firstName" | "surname">,
  ): Promise<Fan> {
    if (!userId || !fanData.firstName || !fanData.surname) {
      throw new Error("Missing required fields for fan profile creation.")
    }
    try {
      const fan = await Fan.create({
        userId,
        firstName: fanData.firstName,
        surname: fanData.surname,
        // Other fields like country, DOB, gender will be null initially
      })
      // Link Fan profile to User
      await User.update({ fanId: fan.id }, { where: { id: userId } })
      return fan
    } catch (e: any) {
      console.error("Error creating fan profile in FanService:", e)
      if (e.name === "SequelizeUniqueConstraintError") {
        throw new Error("Fan profile already exists for this user or data conflict.")
      }
      throw new Error("Error creating fan profile.")
    }
  }

  static async getFanByUserId(userId: number): Promise<Fan | null> {
    return await Fan.findOne({ where: { userId } })
  }

  static async getFanById(id: number): Promise<Fan | null> {
    return await Fan.findByPk(id)
  }

  static async updateFanProfile(
    fanId: number,
    updates: Partial<
      Pick<
        FanAttributes,
        "countryOfResidence" | "dateOfBirth" | "gender" | "occupation" | "profilePicture" | "firstName" | "surname"
      >
    >,
  ): Promise<Fan> {
    const fan = await Fan.findByPk(fanId)
    if (!fan) {
      throw new Error("Fan profile not found.")
    }

    // Validate gender if provided
    if (updates.gender && !Object.values(Gender).includes(updates.gender as Gender)) {
      throw new Error("Invalid gender value.")
    }
    // Add more specific validations for country, dateOfBirth if needed

    await fan.update(updates)
    return fan
  }

  // Removed getAllFans, deleteFan as they are not part of this specific flow's core
}
