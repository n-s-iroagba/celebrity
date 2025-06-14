import type { Request, Response } from "express"
import { SubscriptionService } from "../services/SubscriptionService"

export class SubscriptionController {
  private subscriptionService: SubscriptionService

  constructor() {
    this.subscriptionService = new SubscriptionService()
  }

  // ... existing methods ...
  public subscribeToMembership = async (req: Request, res: Response) => {
    try {
      const fanId = (req.user as any).fanId
      if (!fanId) {
        return res.status(400).json({ message: "Fan profile not found for user." })
      }
      const { clubMembershipId, paymentMethod } = req.body
      const receiptFile = req.file

      if (!clubMembershipId || !paymentMethod) {
        return res.status(400).json({ message: "Missing required fields." })
      }
      if (!receiptFile) {
        return res.status(400).json({ message: "Receipt image is required." })
      }

      const subscription = await this.subscriptionService.subscribeToMembership(
        fanId,
        Number.parseInt(clubMembershipId, 10),
        paymentMethod,
        receiptFile.path, // Or however you store/access the URL
      )
      res.status(201).json(subscription)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  public getMySubscriptions = async (req: Request, res: Response) => {
    try {
      const fanId = (req.user as any).fanId
      if (!fanId) {
        return res.status(400).json({ message: "Fan profile not found for user." })
      }
      const subscriptions = await this.subscriptionService.getFanSubscriptions(fanId)
      res.status(200).json(subscriptions)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  /**
   * UPDATED CONTROLLER METHOD
   */
  public checkSubscriptionStatus = async (req: Request, res: Response) => {
    try {
      const fanId = (req.user as any).fanId
      const celebrityId = Number.parseInt(req.params.celebrityId, 10)
      const requiredTierName = req.query.tier as string | undefined // Get tier from query params

      if (!fanId) {
        return res.status(400).json({ message: "Fan profile not found for user." })
      }
      if (isNaN(celebrityId)) {
        return res.status(400).json({ message: "Invalid celebrity ID." })
      }

      const hasActiveSubscription = await this.subscriptionService.checkActiveSubscription(
        fanId,
        celebrityId,
        requiredTierName, // Pass it to the service
      )

      res.status(200).json({ hasActiveSubscription })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
}
