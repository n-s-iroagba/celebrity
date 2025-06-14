import type React from "react"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils" // Assuming you have a cn utility

interface ErrorMessageDisplayProps {
  message?: string
  className?: string
}

export const ErrorMessageDisplay: React.FC<ErrorMessageDisplayProps> = ({ message, className }) => {
  if (!message) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center text-sm text-red-500 dark:text-red-400 mt-1", // YOUR CHOSEN COLORS HERE
        className,
      )}
      role="alert" // Good for accessibility
    >
      <AlertCircle className="h-4 w-4 mr-1.5 flex-shrink-0" />
      <span>{message}</span>
    </div>
  )
}
