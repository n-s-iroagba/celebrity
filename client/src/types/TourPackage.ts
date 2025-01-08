import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type TourPackage = {
  id: number;
  name: string;
  price: number;
  description: string;
  icon: IconProp;
  features: string[];
};
