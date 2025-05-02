import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface FilterButtonProps {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  icon,
  label,
  onClick,
  disabled = false,
  active = false,
}) => {
  return (
    <div className={cn(
      "items-center w-full md:w-64 max-w-full border border-[hsl(var(--brand-orange))] rounded-md overflow-hidden",
      active
        ? "bg-[hsl(var(--brand-orange))]/20"
        : "bg-[hsl(var(--brand-darkGreen))]"
    )}>
      <Button
        variant="ghost"
        onClick={onClick}
        disabled={disabled}
        className="gap-2 w-full justify-start font-medium text-[hsl(var(--brand-light))]  h-10 px-3"
      >
        {icon}
        {label}
      </Button>
    </div>
  );
};
