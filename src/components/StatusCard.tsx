
import React from 'react';
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  count: number;
  selected?: boolean;
  onClick?: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, count, selected = false, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "px-6 py-4 rounded-md cursor-pointer transition-colors",
        selected ? "bg-secondary" : "bg-card hover:bg-secondary/60"
      )}
    >
      <div className="font-medium text-muted-foreground">{title}</div>
      <div className="text-2xl font-bold mt-1">{count}</div>
    </div>
  );
};

export default StatusCard;
