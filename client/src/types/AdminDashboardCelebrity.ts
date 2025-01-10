import { ClubMembership } from "./ClubMembership";
import { Job } from "./Job";
import { News } from "./News";
import { Souvenir } from "./Souvenir";

export interface AdminDashboardCelebrity {
    id: number;
    name: string;
    biography: string;
    images: string[];
    events: Event[];
    jobs: Job[];
    souvenirs: Souvenir[];
    clubMemberships: ClubMembership[];
    news: News[];
  }