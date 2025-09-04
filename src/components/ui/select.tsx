import * as React from "react"

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Select = ({ children, ...props }: SelectProps) => <div {...props}>{children}</div>
export const SelectContent = ({ children, ...props }: SelectProps) => <div {...props}>{children}</div>
export const SelectItem = ({ children, ...props }: SelectProps) => <div {...props}>{children}</div>
export const SelectTrigger = ({ children, ...props }: SelectProps) => <div {...props}>{children}</div>
export const SelectValue = ({ children, ...props }: SelectProps) => <div {...props}>{children}</div>
