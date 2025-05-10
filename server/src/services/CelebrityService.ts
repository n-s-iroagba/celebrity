import { Celebrity, CelebrityAttributes, CelebrityCreationAttributes } from "../models/Celebrity";


export class CelebrityService {
  /**
   * Create a new celebrity
   * @param celebrityData Data to create celebrity (including image as base64 string)
   * @returns Created celebrity
   */
  static async createUnconfirmedCelebrity(celebrityData: CelebrityCreationAttributes): Promise<Celebrity> {
    try {
      const celebrity = await Celebrity.create({...celebrityData, isConfirmed:false});
      return celebrity;
    } catch (error) {
      throw new Error(`Error creating celebrity: ${error instanceof Error ? error.message : String(error)}`);
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