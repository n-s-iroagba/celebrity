import { Celebrity } from "../models/Celebrity";

export class CelebrityService {
  // Create a single celebrity
  static async createCelebrity(celebrityData: Partial<Celebrity>): Promise<Celebrity> {
    const {firstName, surname,bio, stageName,galleryImages} =  celebrityData
    if (
        !firstName ||
        !surname ||
        !bio ||
        !stageName
      ) {
        throw new Error("Missing required fields for one or more celebrities");
      }
    return await Celebrity.create({
        firstName, surname, bio, stageName,
        galleryImages: galleryImages||[]
    });
  }

  // Create multiple celebrities
  // Create multiple celebrities
  static async createMultipleCelebrities(
    celebrities: Partial<Celebrity>[]
  ): Promise<Celebrity[]> {
    
let createdCelebrities: Celebrity[] = [];

    for (const celebrity of celebrities) {
        const {firstName, surname,bio, stageName,galleryImages} =  celebrity
      if (
        !firstName ||
        !surname ||
        !bio ||
        !stageName
      ) {
        throw new Error("Missing required fields for one or more celebrities");
      }
      const createdCelebrity = await Celebrity.create({
        firstName, surname, bio, stageName,
        galleryImages: galleryImages||[]
    });
    createdCelebrities.push(createdCelebrity);
    }
    return createdCelebrities

}
    

  // Add gallery images to a celebrity
  static async addGalleryImages(id: number, images: string[]): Promise<Celebrity> {
    const celebrity = await Celebrity.findByPk(id);
    if (!celebrity) throw new Error("Celebrity not found");

    celebrity.galleryImages = [...(celebrity.galleryImages || []), ...images];
    return await celebrity.save();
  }

  // Remove gallery images from a celebrity
  static async removeGalleryImages(id: number, imagesToRemove: string[]): Promise<Celebrity> {
    const celebrity = await Celebrity.findByPk(id);
    if (!celebrity) throw new Error("Celebrity not found");

    celebrity.galleryImages = (celebrity.galleryImages || []).filter(
      (image) => !imagesToRemove.includes(image)
    );
    return await celebrity.save();
  }

  // Update celebrity attributes
  static async updateCelebrityAttributes(id: number, updates: Partial<Celebrity>): Promise<Celebrity> {
    const celebrity = await Celebrity.findByPk(id);
    if (!celebrity) throw new Error("Celebrity not found");

    Object.assign(celebrity, updates);
    return await celebrity.save();
  }

  // View a single celebrity
  static async getCelebrityById(id: number): Promise<Celebrity | null> {
    return await Celebrity.findByPk(id);
  }

  // View multiple celebrities
  static async getAllCelebrities(): Promise<Celebrity[]> {
    return await Celebrity.findAll();
  }

  // Delete a celebrity
  static async deleteCelebrity(id: number): Promise<boolean> {
    const deleted = await Celebrity.destroy({ where: { id } });
    return deleted > 0;
  }
}
