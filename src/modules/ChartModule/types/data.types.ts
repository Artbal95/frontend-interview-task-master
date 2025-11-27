export interface IVisits {
  "0": number;
  "10002"?: number;
  "10003": number;
  "10001"?: number;
}

export interface IConversions {
  "0": number;
  "10002"?: number;
  "10003": number;
  "10001"?: number;
}

export interface IDaum {
  date: string;
  visits: IVisits;
  conversions: IConversions;
}

export interface IVariation {
  name: string;
  id?: number;
}

export interface IData {
  variations: IVariation[];
  data: IDaum[];
}

export interface IPoints {
  date: Date;
  variationId: string;
  conversionRate: number;
}

export interface IPrePoint {
  date: Date;
  variationId: string;
  visits: number;
  conversions: number;
}

export type TimeType = "week" | "day";
export type LinesType = "all" | "0" | "10001" | "10002" | "10003";

export interface IVariations {
  id?: LinesType;
  name: string;
}
