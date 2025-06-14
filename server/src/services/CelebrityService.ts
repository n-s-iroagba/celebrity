import { Celebrity, type CelebrityAttributes, type CelebrityCreationAttributes } from "../models/Celebrity"
import { User } from "../models/User"
import { Role } from "../enums/Role"
import { Op } from "sequelize"
import { sequelize } from "../config/db"

export interface PublicCelebrityProfile {
  id: number
  stageName: string | null
  profilePictureUrl: string | null
  professions: string[] | null // Assuming professions is an array of strings
  bio: string | null
}

export class CelebrityService {
  /**
   * Create a new celebrity
   * @param celebrityData Data to create celebrity (including image as base64 string)
   * @returns Created celebrity
   */
  static async createUnconfirmedCelebrity(celebrityData: CelebrityCreationAttributes): Promise<Celebrity> {
    try {
      const celebrity = await Celebrity.create({ ...celebrityData, isConfirmed: false })
      return celebrity
    } catch (error) {
      throw new Error(`Error creating celebrity: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Update celebrity by ID
   * @param id Celebrity ID
   * @param updateData Data to update (can include new image as base64 string)
   * @returns Updated celebrity
   */
  static async updateCelebrity(id: number, updateData: Partial<CelebrityAttributes>): Promise<Celebrity | null> {
    try {
      const celebrity = await Celebrity.findByPk(id)
      if (!celebrity) {
        return null
      }

      await celebrity.update(updateData)
      return celebrity
    } catch (error) {
      throw new Error(`Error updating celebrity: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async getAllCelebrities(limit = 10, offset = 0): Promise<{ rows: Celebrity[]; count: number }> {
    return Celebrity.findAndCountAll({
      limit,
      offset,
      include: [User],
      order: [["createdAt", "DESC"]],
    })
  }
  /**
   * Get confirmed celebrities
   * @returns Array of confirmed celebrities
   */
  static async getConfirmedCelebrities(): Promise<Celebrity[]> {
    try {
      const celebrities = await Celebrity.findAll({
        where: { isConfirmed: true },
      })
      return celebrities
    } catch (error) {
      throw new Error(`Error getting confirmed celebrities: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async deleteCelebrity(id: number) {
    try {
      const celebrity = await Celebrity.findByPk(id)
      if (!celebrity) {
        return null
      }
      await celebrity.destroy()
    } catch (error: any) {
      throw new Error(`Error deleting celebrity: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async getPublicCelebrities(
    limit = 20,
    offset = 0,
  ): Promise<{ rows: PublicCelebrityProfile[]; count: number }> {
    try {
      const { rows, count } = await Celebrity.findAndCountAll({
        attributes: ["id", "stageName", "profilePictureUrl", "professions", "bio"], // Select only public fields
        // Add any conditions like 'isPublished: true' if you have such a field
        limit,
        offset,
        order: [["stageName", "ASC"]], // Example ordering
      })

      // Map to the PublicCelebrityProfile interface if necessary (e.g. type casting or transformation)
      const publicProfiles: PublicCelebrityProfile[] = rows.map((celeb) => ({
        id: celeb.id,
        stageName: celeb.stageName,
        profilePictureUrl: celeb.profilePictureUrl,
        professions: celeb.professions,
        bio: celeb.bio,
      }))

      return { rows: publicProfiles, count }
    } catch (error) {
      console.error("Error fetching public celebrities:", error)
      throw new Error(`Error fetching public celebrities: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  // ... other existing methods ...
  static async createCelebrity(
    userData: Partial<User>,
    celebrityData: Partial<CelebrityAttributes>,
  ): Promise<Celebrity> {
    const transaction = await sequelize.transaction()
    try {
      const user = await User.create(
        {
          ...userData,
          role: Role.CELEBRITY,
          isEmailVerified: true, // Or based on your flow
        },
        { transaction },
      )

      const celebrity = await Celebrity.create(
        {
          ...celebrityData,
          userId: user.id,
        },
        { transaction },
      )

      await transaction.commit()
      return celebrity
    } catch (error) {
      await transaction.rollback()
      throw new Error(`Error creating celebrity: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async getCelebrityById(id: number): Promise<Celebrity | null> {
    return Celebrity.findByPk(id, { include: [User] })
  }

  static async findCelebrityByUserId(userId: number): Promise<Celebrity | null> {
    return Celebrity.findOne({ where: { userId } })
  }

  static async searchCelebrities(query: string): Promise<Celebrity[]> {
    return Celebrity.findAll({
      where: {
        [Op.or]: [
          { stageName: { [Op.iLike]: `%${query}%` } },
          { professions: { [Op.contains]: [query] } }, // If professions is an array
          // Add more fields to search if needed
        ],
      },
      include: [User], // Include associated User model if you need user details like email
    })
  }
}
