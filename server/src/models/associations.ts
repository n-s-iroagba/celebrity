import { ClubMembership } from "./ClubMembership";

import { JobClubMembership } from "./JobClubMembership";

import { Charity } from "./Charity";
import { Job } from "./Job";
import JobCharity from "./JobCharity";

export function setupAssociations() {
  // Many-to-Many relationship between ClubMembership and Job
  ClubMembership.belongsToMany(Job, {
    through: JobClubMembership,
    foreignKey: 'clubMembershipId',
    otherKey: 'jobId',
    as: 'groups',
  });

  Job.belongsToMany(ClubMembership, {
    through: JobClubMembership,
    foreignKey: 'jobId',
    otherKey: 'clubMembershipId',
    as: 'memberships',
  });
}
Charity.belongsToMany(Job, {
    through: JobCharity,
    foreignKey: 'charityId',
    otherKey: 'charityGroupId',
    as: 'groups',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Job.belongsToMany(Charity, {
    through: JobCharity,
    foreignKey: 'charityGroupId',
    otherKey: 'charityId',
    as: 'charities',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
