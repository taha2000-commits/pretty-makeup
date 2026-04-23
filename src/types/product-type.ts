import type { MakeupArea } from "./enums";

export interface ProductType {
  id: number;
  name: string;
  categories: string[];
  image: string;
  area: MakeupArea;
}
