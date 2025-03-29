import { Job, JobCreationAttributes,  } from "../models/Job";
import { ClubMembership } from "../models/ClubMembership";

export class JobService {
  /**
   * Create a new Job
   */
  async create(data: JobCreationAttributes): Promise<Job> {
    return Job.create(data);
  }

  /**
   * Get all Jobs with their memberships
   */
  async findAll(): Promise<Job[]> {
    return Job.findAll({
      include: [{
        association: 'memberships',
        through: { attributes: [] } // Exclude join table attributes
      }]
    });
  }

  /**
   * Get a Job by ID with its memberships
   */
  async findById(id: number): Promise<Job | null> {
    return Job.findByPk(id, {
      include: [{
        association: 'memberships',
        through: { attributes: [] }
      }]
    });
  }

  /**
   * Update only the name/description of a Job
   */
  async updateDetails(
    id: number,
    data: Partial<Pick<JobCreationAttributes, 'name' | 'description'>>
  ): Promise<[number, Job[]]> {
    return Job.update(data, {
      where: { id },
      returning: true,
    });
  }

  /**
   * Add a ClubMembership to a Group
   */
  async addMembership(groupId: number, membershipId: number): Promise<void> {
    const group = await Job.findByPk(groupId);
    if (!group) throw new Error('Job not found');
    
    const membership = await ClubMembership.findByPk(membershipId);
    if (!membership) throw new Error('ClubMembership not found');

    await group.addMembership(membership);
  }

  /**
   * Remove a ClubMembership from a Group
   */
  async removeMembership(groupId: number, membershipId: number): Promise<void> {
    const group = await Job.findByPk(groupId);
    if (!group) throw new Error('Job not found');
    
    const membership = await ClubMembership.findByPk(membershipId);
    if (!membership) throw new Error('ClubMembership not found');

    await group.removeMembership(membership);
  }

  /**
   * Delete a Job
   */
  async delete(id: number): Promise<number> {
    return Job.destroy({ where: { id } });
  }
}

export const jobService = new JobService();