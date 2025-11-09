// Reusable button component
import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingText?: string
  variant?: "primary" | "secondary" | "danger"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading = false, loadingText, variant = "primary", children, disabled, ...props }, ref) => {
    return (
      <button ref={ref} className={`food-btn food-btn-${variant}`} disabled={disabled || isLoading} {...props}>
        {isLoading ? (
          <>
            <span className="food-btn-spinner" aria-hidden="true" />
            {loadingText || children}
          </>
        ) : (
          children
        )}
      </button>
    )
  },
)

Button.displayName = "Button"
