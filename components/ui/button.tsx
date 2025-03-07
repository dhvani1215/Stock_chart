import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef<React.HTMLAttributes<HTMLButtonElement>, React.HTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-secondary/50",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = "Button"

const Card = React.forwardRef<React.HTMLAttributes<HTMLDivElement>, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} ref={ref} {...props}>
        {children}
      </div>
    )
  },
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<React.HTMLAttributes<HTMLDivElement>, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col space-y-1.5 p-6", className)} ref={ref} {...props}>
        {children}
      </div>
    )
  },
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  React.HTMLAttributes<HTMLParagraphElement>,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p className={cn("text-lg font-semibold leading-none tracking-tight", className)} ref={ref} {...props}>
      {children}
    </p>
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  React.HTMLAttributes<HTMLParagraphElement>,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} ref={ref} {...props}>
      {children}
    </p>
  )
})
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<React.HTMLAttributes<HTMLDivElement>, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn("p-6 pt-0", className)} ref={ref} {...props}>
        {children}
      </div>
    )
  },
)
CardContent.displayName = "CardContent"

export { Button, Card, CardHeader, CardTitle, CardDescription, CardContent }

