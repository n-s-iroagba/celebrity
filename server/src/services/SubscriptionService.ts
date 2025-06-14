import { Op } from "sequelize"
import { Subscription, Celebrity, ClubMembership, User } from "../models" // Assuming models are in one index
import { Payment } from "../models/Payment"

export class SubscriptionService {
  // ... existing subscribeToMembership method ...
  public async subscribeToMembership(
    fanId: number,
    clubMembershipId: number,
    paymentMethod: string,
    receiptUrl: string,
  ): Promise<Subscription> {
    const membership = await ClubMembership.findByPk(clubMembershipId)
    if (!membership) {
      throw new Error("Club membership not found")
    }

    const expiresAt = new Date()
    if (membership.duration === "monthly") {
      expiresAt.setMonth(expiresAt.getMonth() + 1)
    } else if (membership.duration === "yearly") {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1)
    }

    const subscription = await Subscription.create({
      fanId,
      clubMembershipId,
      celebrityId: membership.celebrityId,
      status: "pending", // Starts as pending until payment is approved
      expiresAt,
    })

    // Create a corresponding payment record
    await Payment.create({
      fanId,
      amount: membership.price,
      status: "pending",
      paymentMethod,
      receiptUrl,
      relatedId: subscription.id,
      paymentType: "subscription",
    })

    return subscription
  }

  public async getFanSubscriptions(fanId: number) {
    return Subscription.findAll({
      where: { fanId },
      include: [
        {
          model: ClubMembership,
          attributes: ["name", "price", "duration"],
        },
        {
          model: Celebrity,
          attributes: ["stageName"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["profilePictureUrl"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    })
  }

  /**
   * UPDATED METHOD
   * Checks if a fan has an active subscription for a specific celebrity,
   * optionally requiring a specific tier name.
   * "Active" means status is 'active' and the subscription has not expired.
   */
  public async checkActiveSubscription(
    fanId: number,
    celebrityId: number,
    requiredTierName?: string, // Optional tier name
  ): Promise<boolean> {
    const whereClause: any = {
      fanId,
      celebrityId,
      status: "active",
      expiresAt: {
        [Op.gt]: new Date(),
      },
    }

    const includeClause: any[] = []

    if (requiredTierName) {
      includeClause.push({
        model: ClubMembership,
        attributes: [], // We don't need to return ClubMembership fields, just use for filtering
        where: {
          name: requiredTierName,
        },
        required: true, // Makes it an INNER JOIN
      })
    }

    const subscription = await Subscription.findOne({
      where: whereClause,
      include: includeClause.length > 0 ? includeClause : undefined,
    })

    return !!subscription
  }
}
