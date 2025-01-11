import { Payment } from '../models/Payment';

class PaymentService {
  // Create a new payment
  async createPayment(fanId: number, amount: number, item: 'Event' | 'TourPackage' | 'Souvenir' | 'Charity' | 'Clubmembership', itemId: number) {
    try {
      const payment = await Payment.create({
        fanId,
        amount,
        item,
        itemId,
      });
      return payment;
    } catch (error:any) {
      throw new Error(`Error creating payment: ${error.message}`);
    }
  }

  // Get all payments
  async getAllPayments() {
    try {
      const payments = await Payment.findAll();
      return payments;
    } catch (error:any) {
      throw new Error(`Error fetching payments: ${error.message}`);
    }
  }

  // Get payments by fanId
  async getPaymentsByFanId(fanId: number) {
    try {
      const payments = await Payment.findAll({
        where: { fanId },
      });
      return payments;
    } catch (error:any) {
      throw new Error(`Error fetching payments by fanId: ${error.message}`);
    }
  }
}

export const paymentService = new PaymentService();
