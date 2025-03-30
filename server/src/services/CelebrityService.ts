import { Celebrity, CelebrityAttributes, CelebrityCreationAttributes } from "../models/Celebrity";
import { Job } from "../models/Job";

export class CelebrityService {
  /**
   * Create a new celebrity
   * @param celebrityData Data to create celebrity (including image as base64 string)
   * @returns Created celebrity
   */
  static async createCelebrity(celebrityData: CelebrityCreationAttributes): Promise<Celebrity> {
    try {
      const celebrity = await Celebrity.create(celebrityData);
      return celebrity;
    } catch (error) {
      throw new Error(`Error creating celebrity: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get all celebrities
   * @param includeChats Whether to include associated chats
   * @returns Array of all celebrities
   */
  static async getAllCelebrities(includeChats: boolean = false): Promise<Celebrity[]> {
    try {
      const options: any = {};
      if (includeChats) {
        options.include = [{
          model: Job,
          as: 'jobs'
        }];
      }
      
      const celebrities = await Celebrity.findAll(options);
      return celebrities;
    } catch (error) {
      throw new Error(`Error getting all celebrities: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get celebrity by ID
   * @param id Celebrity ID
   * @param includeChats Whether to include associated chats
   * @returns Celebrity if found, null otherwise
   */
  static async getCelebrityById(id: number, includeChats: boolean = false): Promise<Celebrity | null> {
    try {
      const options: any = {
        where: { id }
      };
      
      if (includeChats) {
        options.include = [{
          model: Job,
          as: 'jobs'
        }];
      }
      
      const celebrity = await Celebrity.findOne(options);
      return celebrity;
    } catch (error) {
      throw new Error(`Error getting celebrity by ID: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Update celebrity by ID
   * @param id Celebrity ID
   * @param updateData Data to update (can include new image as base64 string)
   * @returns Updated celebrity
   */
  static async updateCelebrity(
    id: number,
    updateData: Partial<CelebrityAttributes>
  ): Promise<Celebrity | null> {
    try {
      const celebrity = await Celebrity.findByPk(id);
      if (!celebrity) {
        return null;
      }

      await celebrity.update(updateData);
      return celebrity;
    } catch (error) {
      throw new Error(`Error updating celebrity: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Update celebrity image by ID
   * @param id Celebrity ID
   * @param image Base64 encoded image string
   * @returns Updated celebrity
   */
  static async updateCelebrityImage(id: number, image: string): Promise<Celebrity | null> {
    try {
      const celebrity = await Celebrity.findByPk(id);
      if (!celebrity) {
        return null;
      }

      await celebrity.update({ image });
      return celebrity;
    } catch (error) {
      throw new Error(`Error updating celebrity image: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get confirmed celebrities
   * @returns Array of confirmed celebrities
   */
  static async getConfirmedCelebrities(): Promise<Celebrity[]> {
    try {
      const celebrities = await Celebrity.findAll({
        where: { isConfirmed: true }
      });
      return celebrities;
    } catch (error) {
      throw new Error(`Error getting confirmed celebrities: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  static async deleteCelebrity(id:number){
    try{
      const celebrity = await Celebrity.findByPk(id);
      if(!celebrity){
        return null;
      }
      await celebrity.destroy();
    }catch(error:any){
      throw new Error(`Error deleting celebrity: ${error instanceof Error ? error.message : String(error)
      }`);
    }

  }
}