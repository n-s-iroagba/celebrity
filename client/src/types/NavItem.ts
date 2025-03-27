import { ReactNode } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface NavItem {
  title: string;
  icon: IconProp;
  component: ReactNode;
}
