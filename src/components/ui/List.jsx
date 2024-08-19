import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const List = forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
    {...props}
  />
));

List.displayName = "List";

const ListItem = forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn(className)} {...props} />
));

ListItem.displayName = "ListItem";

export { List, ListItem };
