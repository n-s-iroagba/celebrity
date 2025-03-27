import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

  export interface Ticket {
    name: string;
    price: number;
    perks: string[];
    icon: IconDefinition;
    isHighest?: boolean;
  }
  

  