import {
  ClubMembership,
  type ClubMembershipAttributes,
  type ClubMembershipCreationAttributes,
} from "../models/ClubMembership"
import { Celebrity } from "../models/Celebrity"

export class ClubMembershipService {
  /**
   * Create a new club membership
   * @param membershipData Data to create membership. `features` should be PerkDetail[]
   * @returns Created membership
   */
  static async createMembership(membershipData: ClubMembershipCreationAttributes): Promise<ClubMembership> {
    try {
      // Optional: Add validation here if needed, though usually done at controller/request validation layer
      if (membershipData.features && Array.isArray(membershipData.features)) {
        for (const perk of membershipData.features) {
          if (typeof perk.name !== "string" || typeof perk.description !== "string") {
            throw new Error(
              `Invalid perk structure in features. Each perk must have a 'name' and 'description'. Received: ${JSON.stringify(perk)}`,
            )
          }
        }
      } else if (membershipData.features) {
        // Handle cases where features might not be an array, if applicable to your input sources
        throw new Error("'features' must be an array of PerkDetail objects.")
      }

      const membership = await ClubMembership.create(membershipData)
      return membership
    } catch (error) {
      console.error(`Error creating club membership: ${error instanceof Error ? error.message : String(error)}`)
      throw new Error(`Error creating club membership: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Get all club memberships
   * @param includeCelebrity Whether to include associated celebrity
   * @returns Array of all memberships. `features` will be PerkDetail[]
   */
  static async getAllMemberships(includeCelebrity = false): Promise<ClubMembership[]> {
    try {
      const options: any = {}

      if (includeCelebrity) {
        options.include = [
          {
            model: Celebrity,
            as: "celebrity", // Ensure this alias matches your association definition
          },
        ]
      }

      // Sequelize automatically parses the JSON 'features' column into objects
      const memberships = await ClubMembership.findAll(options)
      return memberships
    } catch (error) {
      console.error(`Error getting all club memberships: ${error instanceof Error ? error.message : String(error)}`)
      throw new Error(`Error getting all club memberships: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Get club membership by ID
   * @param id Membership ID
   * @param includeCelebrity Whether to include associated celebrity
   * @returns Membership if found, null otherwise. `features` will be PerkDetail[]
   */
  static async getMembershipById(id: number, includeCelebrity = false): Promise<ClubMembership | null> {
    try {
      const options: any = {
        where: { id },
      }

      if (includeCelebrity) {
        options.include = [
          {
            model: Celebrity,
            as: "celebrity", // Ensure this alias matches your association definition
          },
        ]
      }

      const membership = await ClubMembership.findOne(options)
      return membership
    } catch (error) {
      console.error(`Error getting club membership by ID: ${error instanceof Error ? error.message : String(error)}`)
      throw new Error(`Error getting club membership by ID: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Update club membership by ID
   * @param id Membership ID
   * @param updateData Data to update. If `features` is included, it should be PerkDetail[]
   * @returns Updated membership
   */
  static async updateMembership(
    id: number,
    updateData: Partial<ClubMembershipAttributes>, // This now expects features as PerkDetail[] if provided
  ): Promise<ClubMembership | null> {
    try {
      const membership = await ClubMembership.findByPk(id)
      if (!membership) {
        return null
      }

      // Optional: Add validation for updateData.features similar to createMembership
      if (updateData.features && Array.isArray(updateData.features)) {
        for (const perk of updateData.features) {
          if (typeof perk.name !== "string" || typeof perk.description !== "string") {
            throw new Error(
              `Invalid perk structure in features for update. Each perk must have a 'name' and 'description'. Received: ${JSON.stringify(perk)}`,
            )
          }
        }
      } else if (updateData.features) {
        throw new Error("'features' must be an array of PerkDetail objects for update.")
      }

      await membership.update(updateData)
      return membership.reload() // reload to get the latest data including associations if any
    } catch (error) {
      console.error(`Error updating club membership: ${error instanceof Error ? error.message : String(error)}`)
      throw new Error(`Error updating club membership: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}
