import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground rounded-lg shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-hover)] hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground rounded-lg shadow-[var(--shadow-elegant)] hover:bg-destructive/90",
        outline: "border-2 border-input bg-background/50 backdrop-blur-sm rounded-lg hover:bg-accent/10 hover:border-accent",
        secondary: "bg-secondary text-secondary-foreground rounded-lg shadow-[var(--shadow-elegant)] hover:bg-secondary/80",
        ghost: "rounded-lg hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-accent text-accent-foreground rounded-lg shadow-[var(--shadow-gold)] hover:shadow-xl hover:scale-105 font-semibold",
        gold: "bg-accent text-black/70 rounded-lg shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-hover)] hover:scale-105 font-semibold  border border-black/20",
        whatsapp: "bg-[#00EF59] text-black/70 rounded-lg shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-hover)] hover:scale-105 font-semibold  border border-black/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
