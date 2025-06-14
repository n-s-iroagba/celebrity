import type React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export const MembershipTierFormSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Tier Name */}
      <div className="space-y-2">
        <Label htmlFor="tierName-skeleton">
          <Skeleton className="h-4 w-20" />
        </Label>
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Monthly Price */}
      <div className="space-y-2">
        <Label htmlFor="monthlyPrice-skeleton">
          <Skeleton className="h-4 w-28" />
        </Label>
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Annual Discount */}
      <div className="space-y-2">
        <Label htmlFor="annualDiscount-skeleton">
          <Skeleton className="h-4 w-36" />
        </Label>
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status-skeleton">
          <Skeleton className="h-4 w-16" />
        </Label>
        <Skeleton className="h-10 w-full" />
      </div>

      <Separator className="my-6" />

      {/* Perks Section */}
      <div>
        <Skeleton className="h-6 w-32 mb-4" /> {/* Perks Title */}
        {/* Skeleton for a couple of perk items */}
        {[1, 2].map((i) => (
          <div key={i} className="space-y-4 border p-4 rounded-md mb-4">
            <div className="space-y-2">
              <Label htmlFor={`perkName-${i}-skeleton`}>
                <Skeleton className="h-4 w-24" />
              </Label>
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`perkDesc-${i}-skeleton`}>
                <Skeleton className="h-4 w-32" />
              </Label>
              <Skeleton className="h-20 w-full" /> {/* Textarea-like skeleton */}
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-9 w-20" /> {/* Remove Perk Button Skeleton */}
            </div>
          </div>
        ))}
        <Skeleton className="h-10 w-32 mt-2" /> {/* Add Perk Button Skeleton */}
      </div>

      <Separator className="my-6" />

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <Skeleton className="h-10 w-24" /> {/* Cancel Button Skeleton */}
        <Skeleton className="h-10 w-32" /> {/* Save Button Skeleton */}
      </div>
    </div>
  )
}
