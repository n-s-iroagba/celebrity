import type React from "react"
import { CheckCircle2 } from "lucide-react" // Using CheckCircle2 for a slightly different look
import { cn } from "@/lib/utils" // Assuming you have a cn utility

interface SuccessMessageDisplayProps {
  message?: string
  className?: string
}

export const SuccessMessageDisplay: React.FC<SuccessMessageDisplayProps> = ({ message, className }) => {
  if (!message) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center text-sm text-green-600 dark:text-green-500 mt-1 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 rounded-md",
        className,
      )}
      role="status" // "status" is often more appropriate for success messages than "alert"
    >
      <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0 text-green-500 dark:text-green-400" />
      <span>{message}</span>
    </div>
  )
}
