import { Souvenirs } from "../models/Souvenir";
import { Celebrity } from "../models/Celebrity";

export class SouvenirsService {

  static async createSouvenir(price: number, images: string[], celebrityId: number): Promise<Souvenirs> {
    try {
      const souvenir = await Souvenirs.create({
        price,
        images,
        celebrityId
      });
      return souvenir;
    } catch (error:any) {
      throw new Error(`Failed to create souvenir: ${error.message}`);
    }
  }

  static async getSouvenirById(id: number): Promise<Souvenirs | null> {
    try {
      const souvenir = await Souvenirs.findByPk(id, {
        include: [{ model: Celebrity, attributes: ['id', 'name'] }],
      });
      return souvenir;
    } catch (error:any) {
      throw new Error(`Failed to fetch souvenir by id: ${error.message}`);
    }
  }

  static async getAllSouvenirs(): Promise<Souvenirs[]> {
    try {
      return await Souvenirs.findAll({
        include: [{ model: Celebrity, attributes: ['id', 'name'] }],
      });
    } catch (error:any) {
      throw new Error(`Failed to fetch all souvenirs: ${error.message}`);
    }
  }

  static async updateSouvenir(id: number, price: number, images: string[], celebrityId: number): Promise<Souvenirs | null> {
    try {
      const souvenir = await Souvenirs.findByPk(id);
      if (souvenir) {
        souvenir.price = price;
        souvenir.images = images;
        souvenir.celebrityId = celebrityId;
        await souvenir.save();
        return souvenir;
      }
      return null;
    } catch (error:any) {
      throw new Error(`Failed to update souvenir: ${error.message}`);
    }
  }

  static async deleteSouvenir(id: number): Promise<boolean> {
    try {
      const result = await Souvenirs.destroy({
        where: { id },
      });
      return result > 0;
    } catch (error:any) {
      throw new Error(`Failed to delete souvenir: ${error.message}`);
    }
  }
}
