import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
  href?: string
  variant?: 'default' | 'download'
  download?: boolean
  target?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, variant = 'default', download, target, ...props }, ref) => {
    if (href) {
      return (
        <Link 
          href={href}
          target={target}
          download={download}
          className={cn(
            "flex items-center text-sm md:text-lg gap-2 rounded-full px-6 py-3 transform hover:scale-105 transition-transform duration-300 ease-out",
            variant === 'default' && "bg-white hover:bg-gray-200 text-gray-800",
            variant === 'download' && "bg-transparent border border-gray-600 hover:border-gray-400 text-white",
            className
          )}
        >
          {children}
          {variant === 'default' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {variant === 'download' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3V16M12 16L7 11M12 16L17 11M3 17V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </Link>
      )
    }

    return (
      <button
        className={cn(
          "rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, type ButtonProps }
