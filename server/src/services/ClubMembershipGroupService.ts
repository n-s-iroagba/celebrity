import { ClubMembershipGroup, ClubMembershipGroupCreationAttributes } from "../models/ClubMembershipGroup";
import { ClubMembership } from "../models/ClubMembership";

export class ClubMembershipGroupService {
  /**
   * Create a new ClubMembershipGroup
   */
  async create(data: ClubMembershipGroupCreationAttributes): Promise<ClubMembershipGroup> {
    return ClubMembershipGroup.create(data);
  }

  /**
   * Get all ClubMembershipGroups with their memberships
   */
  async findAll(): Promise<ClubMembershipGroup[]> {
    return ClubMembershipGroup.findAll({
      include: [{
        association: 'memberships',
        through: { attributes: [] } // Exclude join table attributes
      }]
    });
  }

  /**
   * Get a ClubMembershipGroup by ID with its memberships
   */
  async findById(id: number): Promise<ClubMembershipGroup | null> {
    return ClubMembershipGroup.findByPk(id, {
      include: [{
        association: 'memberships',
        through: { attributes: [] }
      }]
    });
  }

  /**
   * Update only the name/description of a ClubMembershipGroup
   */
  async updateDetails(
    id: number,
    data: Partial<Pick<ClubMembershipGroupCreationAttributes, 'name' | 'description'>>
  ): Promise<[number, ClubMembershipGroup[]]> {
    return ClubMembershipGroup.update(data, {
      where: { id },
      returning: true,
    });
  }

  /**
   * Add a ClubMembership to a Group
   */
  async addMembership(groupId: number, membershipId: number): Promise<void> {
    const group = await ClubMembershipGroup.findByPk(groupId);
    if (!group) throw new Error('ClubMembershipGroup not found');
    
    const membership = await ClubMembership.findByPk(membershipId);
    if (!membership) throw new Error('ClubMembership not found');

    await group.addMembership(membership);
  }

  /**
   * Remove a ClubMembership from a Group
   */
  async removeMembership(groupId: number, membershipId: number): Promise<void> {
    const group = await ClubMembershipGroup.findByPk(groupId);
    if (!group) throw new Error('ClubMembershipGroup not found');
    
    const membership = await ClubMembership.findByPk(membershipId);
    if (!membership) throw new Error('ClubMembership not found');

    await group.removeMembership(membership);
  }

  /**
   * Delete a ClubMembershipGroup
   */
  async delete(id: number): Promise<number> {
    return ClubMembershipGroup.destroy({ where: { id } });
  }
}

export const clubMembershipGroupService = new ClubMembershipGroupService();