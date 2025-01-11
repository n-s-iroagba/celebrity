import { News, NewsAttributes } from "../models/News";
import { Op } from "sequelize";

export class NewsService {

  // Create a new News entry
  static async createNews(data: Omit<NewsAttributes, 'id'>,): Promise<News> {
    const {title,content,celebrityId} =data
    try {
      const news = await News.create( {
          title, content, celebrityId,
      });
      return news;
    } catch (error:any) {
      throw new Error(`Error creating news: ${error.message}`);
    }
  }

  // Get all News entries
  static async getAllNews(): Promise<News[]> {
    try {
      return await News.findAll();
    } catch (error:any) {
      throw new Error(`Error fetching news: ${error.message}`);
    }
  }

  // Get a News entry by ID
  static async getNewsById(id: number): Promise<News | null> {
    try {
      return await News.findByPk(id);
    } catch (error:any) {
      throw new Error(`Error fetching news by id: ${error.message}`);
    }
  }

  // Get News entries by celebrityId
  static async getNewsByCelebrityId(celebrityId: number): Promise<News[]> {
    try {
      return await News.findAll({
        where: {
          celebrityId,
        }
      });
    } catch (error:any) {
      throw new Error(`Error fetching news by celebrity ID: ${error.message}`);
    }
  }

  // Update a News entry
  static async updateNews(id: number, data: Partial<NewsAttributes>): Promise<News | null> {
    try {
      const news = await News.findByPk(id);
      if (!news) {
        throw new Error('News not found');
      }

      return await news.update(data);
    } catch (error:any) {
      throw new Error(`Error updating news: ${error.message}`);
    }
  }

  // Delete a News entry
  static async deleteNews(id: number): Promise<boolean> {
    try {
      const news = await News.findByPk(id);
      if (!news) {
        throw new Error('News not found');
      }

      await news.destroy();
      return true;
    } catch (error:any) {
      throw new Error(`Error deleting news: ${error.message}`);
    }
  }
}
