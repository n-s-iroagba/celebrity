import { ClubMembership, ClubMembershipCreationAttributes } from "../models/ClubMembership";
import { Job } from "../models/Job";

export class ClubMembershipService {
  /**
   * Create a new ClubMembership
   */
  async create(data: ClubMembershipCreationAttributes): Promise<ClubMembership> {
    return ClubMembership.create(data);
  }

  /**
   * Get all ClubMemberships
   */
  async findAll(): Promise<ClubMembership[]> {
    return ClubMembership.findAll();
  }

  /**
   * Get a ClubMembership by ID
   */
  async findById(id: number): Promise<ClubMembership | null> {
    return ClubMembership.findByPk(id, {
      include: [{
        association: 'groups',
        through: { attributes: [] } // Exclude join table attributes
      }]
    });
  }

  /**
   * Update a ClubMembership
   */
  async update(
    id: number,
    data: Partial<ClubMembershipCreationAttributes>
  ): Promise<[number, ClubMembership[]]> {
    return ClubMembership.update(data, {
      where: { id },
      returning: true,
    });
  }

  /**
   * Delete a ClubMembership
   */
  async delete(id: number): Promise<number> {
    return ClubMembership.destroy({ where: { id } });
  }

  /**
   * Add ClubMembership to a Group
   */
  async addToGroup(membershipId: number, groupId: number): Promise<void> {
    const membership = await ClubMembership.findByPk(membershipId);
    if (!membership) throw new Error('ClubMembership not found');
    
    const group = await Job.findByPk(groupId);
    if (!group) throw new Error('Job not found');

    await membership.addGroup(group);
  }

  /**
   * Remove ClubMembership from a Group
   */
  async removeFromGroup(membershipId: number, groupId: number): Promise<void> {
    const membership = await ClubMembership.findByPk(membershipId);
    if (!membership) throw new Error('ClubMembership not found');
    
    const group = await Job.findByPk(groupId);
    if (!group) throw new Error('Job not found');

    await membership.removeGroup(group);
  }
}

export const clubMembershipService = new ClubMembershipService();