import { Celebrity } from "../models/Celebrity";
import { Charity, CharityAttributes, CharityCreationAttributes } from "../models/Charity";


export class CharityService {
  /**
   * Create a new charity
   * @param charityData Data to create charity
   * @returns Created charity
   */
  static async createCharity(charityData: CharityCreationAttributes): Promise<Charity> {
    try {
      const charity = await Charity.create(charityData);
      return charity;
    } catch (error) {
      throw new Error(`Error creating charity: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get all charities
   * @returns Array of all charities with the associated celebrities
   */
  static async getAllCharities(): Promise<Charity[]> {
    try {
      const options: any = {};
   
        options.include = [{
          model: Celebrity,
          as: 'celebrity'
        }];
  
      const charities = await Charity.findAll(options);
      return charities;
    } catch (error) {
      throw new Error(`Error getting all charities: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get charity by ID
   * @param id Charity ID
   * @param includeCelebrities Whether to include associated jobs
   * @returns Charity if found, null otherwise
   */
  static async getCharityById(id: number): Promise<Charity | null> {
    try {
      const options: any = {
        where: { id }
      };
      
        options.include = [{
          model: Celebrity,
          as: 'celebrity'
        }];
  
      const charity = await Charity.findOne(options);
      return charity;
    } catch (error) {
      throw new Error(`Error getting charity by ID: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Update charity by ID
   * @param id Charity ID
   * @param updateData Data to update
   * @returns Updated charity
   */
  static async updateCharity(
    id: number,
    updateData: CharityAttributes
  ): Promise<Charity | null> {
    try {
      const charity = await Charity.findByPk(id);
      if (!charity) {
        return null;
      }

      await charity.update(updateData);
      return charity;
    } catch (error) {
      throw new Error(`Error updating charity: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

}