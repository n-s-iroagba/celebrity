import { ClubMembership, ClubMembershipAttributes, ClubMembershipCreationAttributes } from "../models/ClubMembership";
import { Celebrity } from "../models/Celebrity";

export class ClubMembershipService {
  /**
   * Create a new club membership
   * @param membershipData Data to create membership
   * @returns Created membership
   */
  static async createMembership(
    membershipData: ClubMembershipCreationAttributes
  ): Promise<ClubMembership> {
    try {
      const membership = await ClubMembership.create(membershipData);
      return membership;
    } catch (error) {
      throw new Error(`Error creating club membership: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get all club memberships
   * @param includeCelebrity Whether to include associated celebrity
   * @returns Array of all memberships
   */
  static async getAllMemberships(
    includeCelebrity: boolean = false
  ): Promise<ClubMembership[]> {
    try {
      const options: any = {};
      
      if (includeCelebrity) {
        options.include = [{
          model: Celebrity,
          as: 'celebrity'
        }];
      }
      
      const memberships = await ClubMembership.findAll(options);
      return memberships;
    } catch (error) {
      throw new Error(`Error getting all club memberships: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get club membership by ID
   * @param id Membership ID
   * @param includeCelebrity Whether to include associated celebrity
   * @returns Membership if found, null otherwise
   */
  static async getMembershipById(
    id: number,
    includeCelebrity: boolean = false
  ): Promise<ClubMembership | null> {
    try {
      const options: any = {
        where: { id }
      };
      
      if (includeCelebrity) {
        options.include = [{
          model: Celebrity,
          as: 'celebrity'
        }];
      }
      
      const membership = await ClubMembership.findOne(options);
      return membership;
    } catch (error) {
      throw new Error(`Error getting club membership by ID: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Update club membership by ID
   * @param id Membership ID
   * @param updateData Data to update
   * @returns Updated membership
   */
  static async updateMembership(
    id: number,
    updateData: Partial<ClubMembershipAttributes>
  ): Promise<ClubMembership | null> {
    try {
      const membership = await ClubMembership.findByPk(id);
      if (!membership) {
        return null;
      }

      await membership.update(updateData);
      return membership;
    } catch (error) {
      throw new Error(`Error updating club membership: ${error instanceof Error ? error.message : String(error)}`);
    }
  }





}