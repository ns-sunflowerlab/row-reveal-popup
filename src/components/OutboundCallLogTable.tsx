import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow ,  } from "@/components/ui/table";
import CallBadge from './CallBadge' ;
interface OutboundCallLog {
  _id: string;
  claim_number: string;
  phone: string;
  batch_id: string;
  created_at: string;
  line_status: string;
  call_end_reason?: string;
  call_recording_link?: string;
  call_status: string;
  call_id?: string;
  summary?: string;
  transcript?: string;
  call_seconds?: string;
  total_calls?: string;
 success_calls?: string;
 pending_calls?: string;
 failed_calls?: string;
}

interface OutboundCallLogTableProps {
  logs: OutboundCallLog[];
  onRowClick: (log: OutboundCallLog) => void;
}

const OutboundCallLogTable: React.FC<OutboundCallLogTableProps> = ({ logs, onRowClick }) => {
  return (
    <div className="rounded-md overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary">
          <TableRow className="font-bold">
            <TableHead className="w-44">Batch Id</TableHead>
            <TableHead className="w-52">Date</TableHead>
            <TableHead className="w-48">Phone Number</TableHead>
            <TableHead className="w-44">Claims</TableHead>
            <TableHead className="w-44">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-semibold">
          {logs.map((log) => (
            <TableRow
              key={log.batch_id}
              className="hover:bg-secondary/30 cursor-pointer transition-colors"
              onClick={() => onRowClick(log)}
            >
              <TableCell>{log.batch_id}</TableCell>
              <TableCell>
                {new Date(log.created_at).toLocaleString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}
              </TableCell>
              <TableCell>{log.phone}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {/* <CallBadge color="green">{log.success_calls}</CallBadge> */}
                <CallBadge variant="success">{log.success_calls}</CallBadge>
                <CallBadge variant="fail">{log.failed_calls}</CallBadge>
                <CallBadge variant="silence-timeout">{log.pending_calls}</CallBadge>
                <CallBadge variant="customer-ended">{log.total_calls}</CallBadge>

                  {/* <CallBadge color="red">{log.failed_calls}</CallBadge>
                  <CallBadge color="yellow">{log.pending_calls}</CallBadge>
                  <CallBadge color="blue">{log.total_calls}</CallBadge> */}
                </div>
              </TableCell>
              <TableCell>{log.line_status}</TableCell>
           
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OutboundCallLogTable;