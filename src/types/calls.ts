
export type CallDirection = 'inbound' | 'outbound';
export type EndReason = 'Customer Ended Call' | 'Twilio Connection Failed' | 'Silence Timed Out';
export type SuccessStatus = 'success' | 'fail' | 'n/a';

export interface CallLog {
  callId: string;
  assistantId: string;
  assistant: string;
  assistantPhone: string;
  customerPhone: string;
  direction: CallDirection;
  endReason: string;
  success: SuccessStatus;
  startTime: string | null;
  duration: string | null;
  transcript?: string; // Add transcript field
  messages?: { sender: string; content: string }[]; // Add messages field
  recording?: string;
  summary?: string[]; // Add logs field
  totalCalls?: string;
}


// Summary statistics for the call logs
export interface CallStats {
  all: number;
  transferred: number;
  successful: number;
  failed: number;
}

export const getCallStats = (logs: CallLog[]): CallStats => {
  const all = logs.length;
  const successful = logs.filter(log => log.success === 'success').length;
  const failed = logs.filter(log => log.success === 'fail').length;
  // Just a demo value since we don't have transferred in our model
  const transferred = 3;

  return {
    all,
    transferred,
    successful,
    failed,
  };
};
