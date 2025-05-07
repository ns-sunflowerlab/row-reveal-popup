
import React from 'react';
import { cn } from "@/lib/utils";

type CallBadgeVariant = 
  | "fail" 
  | "success" 
  | "inbound" 
  | "outbound" 
  | "customer-ended" 
  | "twilio-failed" 
  | "silence-timeout";

interface CallBadgeProps {
  variant: CallBadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const CallBadge: React.FC<CallBadgeProps> = ({ variant, children, className }) => {
  const getBgColor = () => {
    switch (variant) {
      case "fail":
        return "bg-red-600/20 text-red-400 border-red-600/30";
      case "success":
        return "bg-green-600/20 text-green-400 border-green-600/30";
      case "inbound":
        return "bg-inbound/20 text-inbound border-inbound/30";
      case "outbound":
        return "bg-outbound/20 text-outbound border-outbound/30";
      case "customer-ended":
        return "bg-cyan-600/20 text-cyan-400 border-cyan-600/30";
      case "twilio-failed":
        return "bg-red-600/20 text-red-400 border-red-600/30";
      case "silence-timeout":
        return "bg-orange-600/20 text-orange-400 border-orange-600/30";
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/30";
    }
  };

  return (
    <span className={cn(
      "px-3 py-0.5 text-xs rounded-md border",
      getBgColor(),
      className
    )}>
      {children}
    </span>
  );
};

export default CallBadge;
