import { Request, Response } from 'express';
import Shoutout from '../models/Shoutout';

class ShoutoutController {
  // Send a shoutout
  static async sendShoutout(req: Request, res: Response) {
    const { celebrityId, userId, message, mediaType, mediaUrl } = req.body;

    if (!celebrityId || !userId || !mediaType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const shoutout = await Shoutout.create({
        celebrityId,
        userId,
        message,
        mediaType,
        mediaUrl,
      });

      res.status(201).json({
        message: 'Shoutout sent successfully',
        shoutout,
      });
    } catch (error) {
      console.error('Error sending shoutout:', error);
      res.status(500).json({ message: 'Failed to send shoutout' });
    }
  }

  // Retrieve all shoutouts for a user
  static async getShoutouts(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    try {
      const shoutouts = await Shoutout.findAll({
        where: { userId },
      });

      res.status(200).json(shoutouts);
    } catch (error) {
      console.error('Error retrieving shoutouts:', error);
      res.status(500).json({ message: 'Failed to retrieve shoutouts' });
    }
  }
}

export default ShoutoutController;