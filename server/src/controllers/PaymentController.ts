import { Request, Response } from 'express';
import { paymentService } from '../services/PaymentService';

class PaymentController {
  // Create a new payment
  async createPayment(req: Request, res: Response) {
    try {
      const { fanId, amount, item, itemId } = req.body;
      const payment = await paymentService.createPayment(fanId, amount, item, itemId);
      res.status(201).json(payment);
    } catch (error:any) {
      console.error(error)
      res.status(500).json({ message: `Error creating payment: ${error.message}` });
    }
  }

  // Get all payments
  async getAllPayments(req: Request, res: Response) {
    try {
      const payments = await paymentService.getAllPayments();
      res.status(200).json(payments);
    } catch (error:any) {
      console.error(error)
      res.status(500).json({ message: `Error fetching payments: ${error.message}` });
    }
  }

  // Get payments by fanId
  async getPaymentsByFanId(req: Request, res: Response) {
    try {
      const fanId = parseInt(req.params.fanId, 10);
      const payments = await paymentService.getPaymentsByFanId(fanId);
      res.status(200).json(payments);
    } catch (error:any) {
      console.error(error)
      res.status(500).json({ message: `Error fetching payments by fanId: ${error.message}` });
    }
  }
}

export const paymentController = new PaymentController();
