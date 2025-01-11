import { TourPackage } from "../models/TourPackage";

export class TourPackageService {

  static async createTourPackage(price: number, tier: string, startDate: Date, endDate: Date, perks: string[]): Promise<TourPackage> {
    try {
      const tourPackage = await TourPackage.create({
        price,
        tier,
        startDate,
        endDate,
        perks,
      });
      return tourPackage;
    } catch (error:any) {
      throw new Error(`Failed to create tour package: ${error.message}`);
    }
  }

  static async getTourPackageById(id: number): Promise<TourPackage | null> {
    try {
      return await TourPackage.findByPk(id);
    } catch (error:any) {
      throw new Error(`Failed to fetch tour package by id: ${error.message}`);
    }
  }

  static async getAllTourPackages(): Promise<TourPackage[]> {
    try {
      return await TourPackage.findAll();
    } catch (error:any) {
      throw new Error(`Failed to fetch all tour packages: ${error.message}`);
    }
  }

  static async updateTourPackage(id: number, price: number, tier: string, startDate: Date, endDate: Date, perks: string[]): Promise<TourPackage | null> {
    try {
      const tourPackage = await TourPackage.findByPk(id);
      if (tourPackage) {
        tourPackage.price = price;
        tourPackage.tier = tier;
        tourPackage.startDate = startDate;
        tourPackage.endDate = endDate;
        tourPackage.perks = perks;
        await tourPackage.save();
        return tourPackage;
      }
      return null;
    } catch (error:any) {
      throw new Error(`Failed to update tour package: ${error.message}`);
    }
  }

  static async deleteTourPackage(id: number): Promise<boolean> {
    try {
      const result = await TourPackage.destroy({
        where: { id },
      });
      return result > 0;
    } catch (error:any) {
      throw new Error(`Failed to delete tour package: ${error.message}`);
    }
  }
}
