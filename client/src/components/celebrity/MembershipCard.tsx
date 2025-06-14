"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Sparkles } from "lucide-react"
import type { IClubMembership, PerkDetail } from "@/types/ClubMembership" // Ensure PerkDetail is imported
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip" // Import Tooltip components

interface MembershipCardProps {
  membership: IClubMembership
  onSubscribeClick: () => void
  isPopular?: boolean // Optional: to highlight a specific plan
}

export const MembershipCard: React.FC<MembershipCardProps> = ({ membership, onSubscribeClick, isPopular = false }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD", // Or your desired currency
    }).format(price)
  }

  const getDurationText = (days: number) => {
    if (days >= 365) return `/ year`
    if (days >= 30) return `/ month`
    return `/ ${days} days`
  }

  return (
    <Card className={`flex flex-col ${isPopular ? "border-2 border-primary shadow-lg relative" : ""}`}>
      {isPopular && (
        <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-full shadow-md flex items-center">
          <Sparkles className="w-3 h-3 mr-1" /> Popular
        </div>
      )}
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">{membership.name}</CardTitle>
        <CardDescription className="text-3xl font-extrabold text-primary">
          {formatPrice(membership.price)}
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {getDurationText(membership.durationDays)}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">What's included:</h4>
        <TooltipProvider delayDuration={300}>
          {" "}
          {/* Provider for all tooltips in this card */}
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {membership.perks && membership.perks.length > 0 ? (
              membership.perks.map((perk: PerkDetail, index: number) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <li className="flex items-start cursor-default">
                      {" "}
                      {/* Added cursor-default for better UX */}
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{perk.name}</span> {/* Display short name */}
                    </li>
                  </TooltipTrigger>
                  {perk.description &&
                    perk.description.trim() !== "" && ( // Only show tooltip if description exists
                      <TooltipContent
                        side="top"
                        align="start"
                        className="max-w-xs bg-gray-800 text-white p-2 rounded shadow-lg text-xs"
                      >
                        <p>{perk.description}</p> {/* Display long description in tooltip */}
                      </TooltipContent>
                    )}
                </Tooltip>
              ))
            ) : (
              <li className="text-gray-500 italic">No specific perks listed.</li>
            )}
          </ul>
        </TooltipProvider>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onSubscribeClick}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          aria-label={`Subscribe to ${membership.name} for ${formatPrice(membership.price)}`}
        >
          Subscribe Now
        </Button>
      </CardFooter>
    </Card>
  )
}
