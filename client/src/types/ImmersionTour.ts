import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type ImmmersionTour = {
  id: number;
  name: string;
  price: number;
  description: string;
  icon: IconDefinition;
  features: string[];
};
