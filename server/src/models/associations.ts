import { ClubMembership } from "./ClubMembership";
import { ClubMembershipGroup } from "./ClubMembershipGroup";
import { ClubMembershipGroupMembership } from "./ClubMembershipGroupMembership";

import { Charity } from "./Charity";
import { CharityGroup } from "./CharityGroup";
import CharityGroupCharity from "./CharityGroupCharity";

export function setupAssociations() {
  // Many-to-Many relationship between ClubMembership and ClubMembershipGroup
  ClubMembership.belongsToMany(ClubMembershipGroup, {
    through: ClubMembershipGroupMembership,
    foreignKey: 'clubMembershipId',
    otherKey: 'clubMembershipGroupId',
    as: 'groups',
  });

  ClubMembershipGroup.belongsToMany(ClubMembership, {
    through: ClubMembershipGroupMembership,
    foreignKey: 'clubMembershipGroupId',
    otherKey: 'clubMembershipId',
    as: 'memberships',
  });
}
Charity.belongsToMany(CharityGroup, {
    through: CharityGroupCharity,
    foreignKey: 'charityId',
    otherKey: 'charityGroupId',
    as: 'groups',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  CharityGroup.belongsToMany(Charity, {
    through: CharityGroupCharity,
    foreignKey: 'charityGroupId',
    otherKey: 'charityId',
    as: 'charities',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
