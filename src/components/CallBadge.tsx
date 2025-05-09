import { cn } from '@/lib/utils';
import React from 'react';

type CallBadgeVariant = 'fail' | 'success' | 'inbound' | 'outbound' | 'customer-ended' | 'twilio-failed' | 'silence-timeout';

interface CallBadgeProps {
  variant: CallBadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const CallBadge: React.FC<CallBadgeProps> = ({ variant, children, className }) => {
  const getBgColor = () => {
    switch (variant) {
      case 'fail':
        return 'bg-slate-200 text-red-500 border-red-500';
      case 'success':
        return 'bg-slate-200 text-green-500 border-green-500';
      case 'inbound':
        return 'bg-slate-200 text-inbound border-inbound';
      case 'outbound':
        return 'bg-slate-200 text-outbound border-outbound';
      case 'customer-ended':
        return 'bg-slate-200 text-cyan-500 border-cyan-500';
      case 'twilio-failed':
        return 'bg-slate-200 text-red-500 border-red-500';
      case 'silence-timeout':
        return 'bg-slate-200 text-orange-500 border-orange-500';
      default:
        return 'bg-slate-200 text-gray-500 border-gray-500';
    }
  };

  return <span className={cn('px-3 py-0.5 text-xs rounded-md border', getBgColor(), className)}>{children}</span>;
};

export default CallBadge;
