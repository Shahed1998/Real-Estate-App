import { IPropertyBase } from './iproperty-base';

export class Property implements IPropertyBase {
  Id!: number | null;
  SellRent!: number | null;
  BHK!: number | null;
  PropertyType!: string;
  FurnishType!: string;
  Name!: string;
  City!: string;
  Price!: number | null;
  Security?: string;
  Maintenance?: string;
  BuiltArea!: number | null;
  CarpetArea?: string;
  Floor?: number;
  TotalFloors?: number;
  Address!: string;
  Landmark?: string;
  ReadyToMove!: string;
  AvailableFrom?: string;
  AOP?: number;
  GatedCommunity?: number;
  MainEntrance?: number;
  Description?: string;
  Image?: string;
  PostedOn?: string;
}
