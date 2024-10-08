import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-base ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          " font-medium bg-primary text-base text-primary-foreground hover:bg-primary/90",
        destructive:
          " font-medium bg-destructive text-base text-destructive-foreground hover:bg-destructive/90",
        outline:
          " font-medium border text-base border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          " font-medium bg-secondary text-base text-secondary-foreground hover:bg-secondary/80",
        ghost:
          " font-medium hover:bg-accent text-base hover:text-accent-foreground",
        link: "text-primary text-base underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        lg: "h-11 rounded-md px-8",
        sm: "h-9 rounded-md px-3",
        xs: "h-8 rounded-md px-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
