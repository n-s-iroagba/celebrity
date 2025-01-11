import { ClubMembership } from "../models/ClubMembership";
import { ClubMembershipTier } from "../enums/ClubMembershipTier";

export class ClubMembershipService {
  // Create a new ClubMembership
  static async createClubMembership(data: Partial<ClubMembership>): Promise<ClubMembership> {
    const { tier, celebrityId, fanId, JobId } = data;

    if (!tier || !celebrityId) {
      throw new Error("Tier and celebrityId are required");
    }

    return await ClubMembership.create({ tier, celebrityId, fanId, JobId } as ClubMembership);
  }

  // Get a ClubMembership by ID
  static async getClubMembershipById(id: number): Promise<ClubMembership | null> {
    return await ClubMembership.findByPk(id, {
      include: ["fan", "celebrity", "job"], // Ensure related entities are fetched
    });
  }

  // Get all ClubMemberships (optionally filter by celebrityId)
  static async getAllClubMemberships(celebrityId?: number): Promise<ClubMembership[]> {
    const whereClause = celebrityId ? { where: { celebrityId } } : {};
    return await ClubMembership.findAll({
      ...whereClause,
      include: ["fan", "celebrity", "job"],
    });
  }

  // Update a ClubMembership
  static async updateClubMembership(id: number, updates: Partial<ClubMembership>): Promise<ClubMembership> {
    const membership = await ClubMembership.findByPk(id);
    if (!membership) throw new Error("ClubMembership not found");

    Object.assign(membership, updates);
    return await membership.save();
  }

  // Delete a ClubMembership
  static async deleteClubMembership(id: number): Promise<boolean> {
    const deleted = await ClubMembership.destroy({ where: { id } });
    return deleted > 0;
  }
}
