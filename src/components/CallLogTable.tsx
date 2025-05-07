
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CallBadge from './CallBadge';
import { CallLog } from '@/types/calls';

interface CallLogTableProps {
  logs: CallLog[];
  onRowClick: (log: CallLog) => void;
}

const CallLogTable: React.FC<CallLogTableProps> = ({ logs, onRowClick }) => {
  return (
    <div className="rounded-md overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="w-12">
              <input type="checkbox" className="h-4 w-4 rounded border-muted" />
            </TableHead>
            <TableHead className="w-44">Call ID</TableHead>
            <TableHead className="w-44">Assistant</TableHead>
            <TableHead className="w-52">Assistant Phone Number</TableHead>
            <TableHead className="w-52">Customer Phone Number</TableHead>
            <TableHead className="w-48">Ended Reason</TableHead>
            <TableHead className="w-44">Success Evaluation</TableHead>
            <TableHead className="w-44">Start Time</TableHead>
            <TableHead className="w-28">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow 
              key={log.callId}
              className="hover:bg-secondary/30 cursor-pointer transition-colors"
              onClick={() => onRowClick(log)}
            >
              <TableCell>
                <input type="checkbox" className="h-4 w-4 rounded border-muted" />
              </TableCell>
              <TableCell className="font-mono text-xs">
                <div className="flex items-center gap-2">
                  {log.callId.substring(0, 12)}...
                  <button className="text-muted-foreground hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  </button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  {log.assistant}
                </div>
                <div className="text-xs text-muted-foreground font-mono mt-0.5">
                  {log.assistantId.substring(0, 12)}...
                </div>
              </TableCell>
              <TableCell>
                <div>{log.assistantPhone}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Zinniax Number</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-between">
                  <div>{log.customerPhone}</div>
                  <CallBadge variant={log.direction === 'inbound' ? 'inbound' : 'outbound'}>
                    {log.direction === 'inbound' ? 'Inbound' : 'Outbound'}
                  </CallBadge>
                </div>
              </TableCell>
              <TableCell>
                {log.endReason === 'Customer Ended Call' ? (
                  <CallBadge variant="customer-ended">Customer Ended Call</CallBadge>
                ) : log.endReason === 'Twilio Connection Failed' ? (
                  <CallBadge variant="twilio-failed">Twilio Connection Failed</CallBadge>
                ) : (
                  <CallBadge variant="silence-timeout">Silence Timed Out</CallBadge>
                )}
              </TableCell>
              <TableCell>
                {log.success === 'fail' ? (
                  <CallBadge variant="fail">Fail</CallBadge>
                ) : log.success === 'success' ? (
                  <CallBadge variant="success">Success</CallBadge>
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </TableCell>
              <TableCell>
                {log.startTime || <span className="text-muted-foreground">N/A</span>}
              </TableCell>
              <TableCell>
                {log.duration || <span className="text-muted-foreground">N/A</span>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CallLogTable;
