import { Celebrity } from "../models/Celebrity";

export class CelebrityService {

  static async createCelebrity(celebrityData: Partial<Celebrity>): Promise<Celebrity> {
    const {firstName, surname,bio, stageName,image} =  celebrityData
    if (
        !firstName ||
        !stageName
      ) {
        console.log (firstName,surname,stageName)
        throw new Error("Missing required fields for one or more celebrities");
      }
    return await Celebrity.create({
      firstName, surname:surname||'', stageName,
      image: image || '',
      bio: bio || '',
      isConfirmed: bio === ''? false: true
    });
  }


  static async updateCelebrityAttributes(id: number, updates: Partial<Celebrity>): Promise<Celebrity> {
    const celebrity = await Celebrity.findByPk(id);
    if (!celebrity) throw new Error("Celebrity not found");

    Object.assign(celebrity, updates);
    return await celebrity.save();
  }

  static async getCelebrityById(id: number): Promise<Celebrity | null> {
    return await Celebrity.findByPk(id);
  }


  static async getAllCelebrities(): Promise<Celebrity[]> {
    return await Celebrity.findAll();
  }


  static async deleteCelebrity(id: number): Promise<boolean> {
    const deleted = await Celebrity.destroy({ where: { id } });
    return deleted > 0;
  }
}
