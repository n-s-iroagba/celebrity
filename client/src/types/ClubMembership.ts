

export interface ClubMembership {
  id: string;
  tier: string;
  features: string[];
  price: number;

}

export type BulkMembership = {
  memberships:ClubMembership[]
}