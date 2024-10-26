import * as React from "react"

import { cn } from "@/lib/utils"
import {UseFormRegister} from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    registerValidate?: UseFormRegister<any>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,error,registerValidate,onChange,value,name,required, ...props }, ref) => {
    return (
        <>
      <input
          {...(registerValidate
              ? registerValidate(name ?? "", {
                  onChange: onChange,
                  required: required
              })
              : {
                  onChange: onChange,
                  value: value,
              })}
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </>
    )
  }
)
Input.displayName = "Input"

export { Input }
