
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CallBadge from './CallBadge';
import { CallLog } from '@/types/calls';

interface CallLogTableProps {
  logs: CallLog[];
  onRowClick: (log: CallLog) => void;
}
const CallLogTable: React.FC<CallLogTableProps> = ({ logs, onRowClick }) => {
  console.log(logs)

  return (
    <div className="rounded-md overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary">
          <TableRow className="font-bold">
         
            {/* <TableHead className="w-44">Batch ID</TableHead> */}
            <TableHead className="w-44">Customer Name</TableHead>
            <TableHead className="w-52">Customer Phone Number</TableHead>
            <TableHead className="w-48">Label</TableHead>
            {/* <TableHead className="w-44">Success Evaluation</TableHead> */}
            <TableHead className="w-44">Start Time</TableHead>
            <TableHead className="w-28">Duration</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody className='font-semibold'>
          {logs.map((log) => (
            <TableRow 
              key={log.callId}
              className="hover:bg-secondary/30 cursor-pointer transition-colors "
              onClick={() => onRowClick(log)}
            >
         
              {/* <TableCell className="font-mono text-xs">
                <div className="flex items-center gap-2">
                  {log.callId.substring(0, 12)}...
                  <button className="text-muted-foreground hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  </button>
                </div>
              </TableCell> */}
              <TableCell>
                <div className="flex items-center gap-1.5 ">
                  {log.assistantId}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-between">
                  {log.customerPhone}
                  {/* <CallBadge variant={log.direction === 'inbound' ? 'inbound' : 'outbound'}>
                    {log.direction === 'inbound' ? 'Inbound' : 'Outbound'}
                  </CallBadge> */}
                </div>
              </TableCell>
              <TableCell>
              {log.endReason === 'SCHEDULE_SUCCESS' ? (
                <CallBadge variant="success">SCHEDULED SUCCESS</CallBadge>
              ) : log.endReason === 'USER_ASKED_FOR_HUMAN' ? (
                <CallBadge variant="customer-ended">TRANSFERRED</CallBadge>
              ) : log.endReason === 'SCHEDULE_FAIL' ? (
                <CallBadge variant="twilio-failed">SCHEDULE FAIL</CallBadge>
              ) : log.endReason === 'RESCHEDULE_SUCCESS' ? (
                <CallBadge variant="success">RESCHEDULE SUCCESS</CallBadge>
              ) : log.endReason === 'RESCHEDULE_FAIL' ? (
                <CallBadge variant="twilio-failed">RESCHEDULE FAIL</CallBadge>
              ) : log.endReason === 'CANCEL_SUCCESS' ? (
                <CallBadge variant="success">CANCEL SUCCESS</CallBadge>
              ) : log.endReason === 'CANCEL_FAIL' ? (
                <CallBadge variant="twilio-failed">CANCEL FAIL</CallBadge>
              ) : (
                <CallBadge variant="silence-timeout">N/A</CallBadge>
              )}
              </TableCell>
              {/* <TableCell>
                {log.success === 'fail' ? (
                  <CallBadge variant="fail">Fail</CallBadge>
                ) : log.success === 'success' ? (
                  <CallBadge variant="success">Success</CallBadge>
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </TableCell> */}
              <TableCell>
              {log.startTime
                ? (() => {
                    const date = new Date(log.startTime);
                    const formatted = date.toLocaleString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    });
                    return formatted; // e.g., "May 7, 2025, 8:15 PM"
                  })()
                : <span className="text-muted-foreground">N/A</span>}
              </TableCell>
              <TableCell>
              {log.duration
                ? (() => {
                    const totalSeconds = parseFloat(log.duration.replace('s', ''));
                    const minutes = Math.floor(totalSeconds / 60);
                    const seconds = Math.round(totalSeconds % 60);
                    return `${minutes}m ${seconds}s`;
                  })()
                : <span className="text-muted-foreground">N/A</span>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CallLogTable;
