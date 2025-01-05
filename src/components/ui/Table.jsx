import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Table = forwardRef(({ className, ...props }, ref) => (
  <div className="my-6 w-full overflow-y-auto">
    <table ref={ref} className={cn("w-full", className)} {...props} />
  </div>
));

Table.displayName = "Table";

const TableHeader = forwardRef(({ className, ...props }, ref) => (
  <thead>
    <tr
      ref={ref}
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  </thead>
));

TableHeader.displayName = "TableHeader";

const TableBody = forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("", className)} {...props} />
));

TableBody.displayName = "TableBody";

const TableRow = forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("m-0 border-t p-0 even:bg-muted", className)}
    {...props}
  />
));

TableRow.displayName = "TableRow";

const TableTitle = forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
      className,
    )}
    {...props}
  />
));

TableTitle.displayName = "TableTitle";
const TableData = = forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
      className,
    )}
    {...props}
  />
));

TableData.displayName = "TableData";

export { Table, TableHeader, TableTitle, TableData, TableBody, TableRow };
