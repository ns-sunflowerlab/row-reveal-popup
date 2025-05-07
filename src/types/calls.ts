
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
  endReason: EndReason;
  success: SuccessStatus;
  startTime: string | null;
  duration: string | null;
}

export const mockCallLogs: CallLog[] = [
  {
    callId: 'fe8a74b7-860f-4163-9b5d-65c36479c34a',
    assistantId: '6f8f3fff-7262-49e2-b14b-da5c26d5c9e8',
    assistant: 'IONM Scheduler [Dev]',
    assistantPhone: '+1 (844) 748 5913',
    customerPhone: '+1 (732) 824 1474',
    direction: 'inbound',
    endReason: 'Customer Ended Call',
    success: 'fail',
    startTime: 'May 6, 2025, 23:46',
    duration: '22s',
  },
  {
    callId: '6573b9ef-ee69-4b9d-bfc8-65c36479c34a',
    assistantId: '6f8f3fff-7262-49e2-b14b-da5c26d5c9e8',
    assistant: 'IONM Scheduler [Dev]',
    assistantPhone: '+1 (844) 748 5913',
    customerPhone: '+1 (415) 723 4000',
    direction: 'inbound',
    endReason: 'Customer Ended Call',
    success: 'fail',
    startTime: 'May 6, 2025, 21:26',
    duration: '39s',
  },
  {
    callId: '45bf6fbf-0293-4a31-9af2-65c36479c34a',
    assistantId: '972f0db6-90dd-4f03-8794-39923dae012a',
    assistant: 'IONM Scheduler 1.1',
    assistantPhone: '+1 (844) 748 5913',
    customerPhone: '+1 (732) 824 1474',
    direction: 'outbound',
    endReason: 'Twilio Connection Failed',
    success: 'n/a',
    startTime: null,
    duration: null,
  },
  {
    callId: '1aadf1ab-45f2-4e13-86c6-65c36479c34a',
    assistantId: '972f0db6-90dd-4f03-8794-39923dae012a',
    assistant: 'IONM Scheduler 1.1',
    assistantPhone: '+1 (844) 748 5913',
    customerPhone: '+1 (207) 831 1829',
    direction: 'outbound',
    endReason: 'Silence Timed Out',
    success: 'fail',
    startTime: 'May 6, 2025, 21:18',
    duration: '46s',
  },
  {
    callId: '9b48d538-8ad8-4de1-b5c8-65c36479c34a',
    assistantId: '972f0db6-90dd-4f03-8794-39923dae012a',
    assistant: 'IONM Scheduler 1.1',
    assistantPhone: '+1 (844) 748 5913',
    customerPhone: '+1 (732) 824 1474',
    direction: 'outbound',
    endReason: 'Twilio Connection Failed',
    success: 'n/a',
    startTime: null,
    duration: null,
  },
];

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
