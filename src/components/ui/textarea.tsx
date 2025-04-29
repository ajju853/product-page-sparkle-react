
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  glassmorphism?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, glassmorphism = false, ...props }, ref) => {
    const baseClasses = "flex min-h-[80px] w-full rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";
    
    const standardClasses = "border border-input bg-background px-3 py-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
    
    const glassmorphismClasses = "border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 focus-visible:border-brand-purple/50 focus-visible:ring-1 focus-visible:ring-brand-purple/30";
    
    const darkGlassmorphismClasses = "border border-gray-800 bg-gray-900/50 backdrop-blur-sm px-4 py-3 focus-visible:border-brand-purple/50 focus-visible:ring-1 focus-visible:ring-brand-purple/30";
    
    return (
      <textarea
        className={cn(
          baseClasses,
          glassmorphism ? (props.className?.includes('dark') ? darkGlassmorphismClasses : glassmorphismClasses) : standardClasses,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
