import { Request, Response } from 'express';
import Message from '../models/Message';

class MessageController {
  // Send a shoutout
  static async sendMessage(req: Request, res: Response) {
    const { celebrityId, userId, message, mediaType, mediaUrl } = req.body;

    if (!celebrityId || !userId || !mediaType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const shoutout = await Message.create({
        celebrityId,
        userId,
        message,
        mediaType,
        mediaUrl,
      });

      res.status(201).json({
        message: 'Message sent successfully',
        shoutout,
      });
    } catch (error) {
      console.error('Error sending shoutout:', error);
      res.status(500).json({ message: 'Failed to send shoutout' });
    }
  }

  // Retrieve all shoutouts for a user
  static async getMessages(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    try {
      const shoutouts = await Message.findAll({
        where: { userId },
      });

      res.status(200).json(shoutouts);
    } catch (error) {
      console.error('Error retrieving shoutouts:', error);
      res.status(500).json({ message: 'Failed to retrieve shoutouts' });
    }
  }
}

export default MessageController;