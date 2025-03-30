import { Tour } from "../models/Tour";

export class TourService {

  // static async createTour(price: number, tier: string,   duration: Date, endDate: Date, perks: string[]): Promise<Tour> {
  //   try {
  //     const tourPackage = await Tour.create({
  //       price,
  //       duration,
      
  //       perks,
  //     });
  //     return tourPackage;
  //   } catch (error:any) {
  //     throw new Error(`Failed to create tour package: ${error.message}`);
  //   }
  // }

  // static async getTourById(id: number): Promise<Tour | null> {
  //   try {
  //     return await Tour.findByPk(id);
  //   } catch (error:any) {
  //     throw new Error(`Failed to fetch tour package by id: ${error.message}`);
  //   }
  // }

  // static async getAllTours(): Promise<Tour[]> {
  //   try {
  //     return await Tour.findAll();
  //   } catch (error:any) {
  //     throw new Error(`Failed to fetch all tour packages: ${error.message}`);
  //   }
  // }

  // static async updateTour(id: number, price: number, tier: string,   duration: Date, endDate: Date, perks: string[]): Promise<Tour | null> {
  //   try {
  //     const tourPackage = await Tour.findByPk(id);
  //     if (tourPackage) {
  //       tourPackage.price = price;
  //       tourPackage.tier = tier;
  //       tourPackage   duration =   duration;
  //       tourPackage.endDate = endDate;
  //       tourPackage.perks = perks;
  //       await tourPackage.save();
  //       return tourPackage;
  //     }
  //     return null;
  //   } catch (error:any) {
  //     throw new Error(`Failed to update tour package: ${error.message}`);
  //   }
  // }

  static async deleteTour(id: number): Promise<boolean> {
    try {
      const result = await Tour.destroy({
        where: { id },
      });
      return result > 0;
    } catch (error:any) {
      throw new Error(`Failed to delete tour package: ${error.message}`);
    }
  }
}
