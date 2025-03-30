import Charity from '../models/Charity';
import ClubMembership from '../models/ClubMembership';
import Item from '../models/Item';
import { Payment } from '../models/Payment';
import Souvenir from '../models/Souvenir';
import Ticket from '../models/Ticket';
import { Tour } from '../models/Tour';

class PaymentService {
  // Create a new payment
  async createPayment(fanId: number, amount: number, items: Item[],date:Date ) {
    try {
      const payment = await Payment.create({
        fanId,
        amount,
        items,
        date
     
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
